"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, PenTool, FileText } from "lucide-react";

// Types for the contract data
export interface ContractData {
  name: string;
  date: Date | undefined;
  signature: string;
}

interface ContractSigningFormProps {
  onSave: (data: ContractData) => void;
  triggerButtonText?: string;
  dialogTitle?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ContractSigningForm({
  onSave,
  triggerButtonText = "Sign Contract",
  dialogTitle = "Sign Contract",
  isOpen,
  onOpenChange,
}: ContractSigningFormProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [tempData, setTempData] = useState({
    name: "",
    date: undefined as Date | undefined,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Use controlled or internal state
  const dialogOpen = isOpen !== undefined ? isOpen : internalOpen;
  const setDialogOpen = onOpenChange || setInternalOpen;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    }
  }, [dialogOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const signatureData = canvas.toDataURL();
      return signatureData;
    }
    return "";
  };

  const handleSaveContract = () => {
    const signature = saveSignature();
    const contractData: ContractData = {
      name: tempData.name,
      date: tempData.date,
      signature: signature,
    };
    onSave(contractData);
    setDialogOpen(false);
    // Reset form
    setTempData({
      name: "",
      date: undefined,
    });
    clearSignature();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          {triggerButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              placeholder="Enter your full name"
              value={tempData.name}
              onChange={(e) =>
                setTempData({ ...tempData, name: e.target.value })
              }
            />
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {tempData.date ? formatDate(tempData.date) : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={tempData.date}
                  onSelect={(date) => setTempData({ ...tempData, date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Signature Canvas */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Digital Signature</label>
            <div className="border border-gray-300 rounded-md p-4 bg-white">
              <canvas
                ref={canvasRef}
                width={400}
                height={120}
                className="border border-gray-200 cursor-crosshair w-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ touchAction: "none" }}
              />
              <div className="flex justify-between items-center mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                >
                  <PenTool className="w-3 h-3 mr-1" />
                  Clear
                </Button>
                <span className="text-xs text-gray-500">
                  Click and drag to sign
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSaveContract}
            disabled={!tempData.name || !tempData.date}
            className="w-full"
          >
            Save Contract
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
