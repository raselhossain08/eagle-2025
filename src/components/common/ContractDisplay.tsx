"use client";
import React from "react";
import { ContractData } from "./ContractSigningForm";

interface ContractDisplayProps {
  contractData: ContractData | null;
  placeholderText?: {
    name?: string;
    date?: string;
    signature?: string;
  };
}

export default function ContractDisplay({
  contractData,
  placeholderText = {
    name: "[Client Name]",
    date: "[Date]",
    signature: "[Signature]",
  },
}: ContractDisplayProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Display Signed Information */}
      {contractData?.name ? (
        <div className="space-y-3 pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-md">
          <div className="flex items-center gap-2">
            <span className="font-medium">Name:</span>
            <span className="border-b border-gray-500 min-w-64 pb-1">
              {contractData.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Date:</span>
            <span className="border-b border-gray-500 min-w-64 pb-1">
              {contractData.date ? formatDate(contractData.date) : ""}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium">Signature:</span>
            {contractData.signature && (
              <img
                src={contractData.signature}
                alt="Client Signature"
                className="border border-gray-300 bg-white p-2 rounded max-w-sm h-20 object-contain"
              />
            )}
          </div>
        </div>
      ) : (
        /* Placeholder when not signed */
        <div className="space-y-3 text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-medium">Name:</span>
            <span className="border-b border-gray-300 w-64 pb-1">
              {placeholderText.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Date:</span>
            <span className="border-b border-gray-300 w-64 pb-1">
              {placeholderText.date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Signature:</span>
            <span className="border-b border-gray-300 w-64 pb-1">
              {placeholderText.signature}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
