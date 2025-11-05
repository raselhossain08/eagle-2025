import { useAuth } from "@/context/authContext";
import { useMemo } from "react";

interface MentorshipSubscription {
  productType: string;
  status: string;
  subscriptionEndDate: string;
}

export function useMentorshipAccess() {
  const { profile } = useAuth();

  const mentorshipAccess = useMemo(() => {
    if (!profile?.contracts) {
      return {
        hasAnyMentorshipAccess: false,
        hasEagleUltimate: false,
        hasInvestmentAdvising: false,
        hasTradingTutor: false,
        activeMentorshipSubscriptions: [],
      };
    }

    const now = new Date();
    const activeMentorshipSubscriptions = profile.contracts.filter(
      (contract: MentorshipSubscription) =>
        [
          "eagle-ultimate",
          "investment-advising",
          "trading-tutor",
          "mentorship-package",
        ].includes(contract.productType) &&
        contract.status === "completed" &&
        new Date(contract.subscriptionEndDate) > now
    );

    const hasEagleUltimate = activeMentorshipSubscriptions.some(
      (sub: MentorshipSubscription) => sub.productType === "eagle-ultimate"
    );

    const hasInvestmentAdvising = activeMentorshipSubscriptions.some(
      (sub: MentorshipSubscription) => sub.productType === "investment-advising"
    );

    const hasTradingTutor = activeMentorshipSubscriptions.some(
      (sub: MentorshipSubscription) => sub.productType === "trading-tutor"
    );

    const hasAnyMentorshipAccess = activeMentorshipSubscriptions.length > 0;

    return {
      hasAnyMentorshipAccess,
      hasEagleUltimate,
      hasInvestmentAdvising,
      hasTradingTutor,
      activeMentorshipSubscriptions,
    };
  }, [profile]);

  return mentorshipAccess;
}
