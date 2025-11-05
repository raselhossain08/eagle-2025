import { useState } from 'react';
import { 
  updateSubscription, 
  scheduleDowngrade, 
  cancelDowngrade,
  SubscriptionType,
  UpdateSubscriptionResponse,
  ScheduleDowngradeResponse,
  CancelDowngradeResponse
} from '@/lib/services/api/subscription';
import { toast } from '@/hooks/use-toast';

interface UseSubscriptionActionsReturn {
  updateUserSubscription: (subscription: SubscriptionType) => Promise<UpdateSubscriptionResponse | null>;
  scheduleSubscriptionDowngrade: (targetSubscription: SubscriptionType, effectiveDate?: string) => Promise<ScheduleDowngradeResponse | null>;
  cancelScheduledDowngrade: () => Promise<CancelDowngradeResponse | null>;
  isLoading: boolean;
}

export const useSubscriptionActions = (): UseSubscriptionActionsReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const updateUserSubscription = async (subscription: SubscriptionType): Promise<UpdateSubscriptionResponse | null> => {
    setIsLoading(true);
    try {
      const response = await updateSubscription(subscription);
      
      toast({
        title: "Success!",
        description: response.message || "Subscription updated successfully!",
      });
      
      return response;
    } catch (error) {
      console.error("Update subscription error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update subscription';
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const scheduleSubscriptionDowngrade = async (
    targetSubscription: SubscriptionType, 
    effectiveDate?: string
  ): Promise<ScheduleDowngradeResponse | null> => {
    setIsLoading(true);
    try {
      const response = await scheduleDowngrade(targetSubscription, effectiveDate);
      
      toast({
        title: "Downgrade Scheduled",
        description: response.message || "Your subscription downgrade has been scheduled successfully.",
        duration: 5000,
      });
      
      return response;
    } catch (error) {
      console.error("Schedule downgrade error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to schedule downgrade';
      
      toast({
        variant: "destructive",
        title: "Downgrade Failed",
        description: errorMessage,
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelScheduledDowngrade = async (): Promise<CancelDowngradeResponse | null> => {
    setIsLoading(true);
    try {
      const response = await cancelDowngrade();
      
      toast({
        title: "Downgrade Cancelled",
        description: response.message || "Your scheduled downgrade has been cancelled successfully.",
      });
      
      return response;
    } catch (error) {
      console.error("Cancel downgrade error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to cancel downgrade';
      
      toast({
        variant: "destructive",
        title: "Cancel Failed",
        description: errorMessage,
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUserSubscription,
    scheduleSubscriptionDowngrade,
    cancelScheduledDowngrade,
    isLoading
  };
};