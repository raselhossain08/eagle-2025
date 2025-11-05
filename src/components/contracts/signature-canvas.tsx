"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, Pen } from "lucide-react";

interface SignatureCanvasProps {
  onSignatureChange: (signature: string) => void;
  width?: number;
  height?: number;
  className?: string;
}

export default function SignatureCanvas({
  onSignatureChange,
  width = 800,
  height = 200,
  className = "",
}: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get the container width and use it for responsive sizing
    const container = canvas.parentElement;
    const containerWidth = container?.clientWidth || width;
    const actualWidth = Math.min(containerWidth - 16, width); // 16px for padding

    // Set canvas size
    canvas.width = actualWidth;
    canvas.height = height;

    // Set drawing styles
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Fill with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, actualWidth, height);

    // Restore signature if it exists
    if (signatureData && !isEmpty) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, actualWidth, height);
      };
      img.src = signatureData;
    }

    // Handle window resize for responsiveness
    const handleResize = () => {
      const newContainer = canvas.parentElement;
      const newContainerWidth = newContainer?.clientWidth || width;
      const newActualWidth = Math.min(newContainerWidth - 16, width);
      
      if (newActualWidth !== canvas.width) {
        // Save current signature before resize
        let currentSignature = null;
        if (!isEmpty && canvas.width > 0 && canvas.height > 0) {
          currentSignature = canvas.toDataURL("image/png");
          setSignatureData(currentSignature);
        }

        canvas.width = newActualWidth;
        canvas.height = height;
        
        // Reset drawing styles after resize
        const newCtx = canvas.getContext("2d");
        if (newCtx) {
          newCtx.strokeStyle = "#000000";
          newCtx.lineWidth = 2;
          newCtx.lineCap = "round";
          newCtx.lineJoin = "round";
          newCtx.fillStyle = "#ffffff";
          newCtx.fillRect(0, 0, newActualWidth, height);

          // Restore signature after resize
          if (currentSignature && !isEmpty) {
            const img = new Image();
            img.onload = () => {
              newCtx.drawImage(img, 0, 0, newActualWidth, height);
            };
            img.src = currentSignature;
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height, onSignatureChange, signatureData, isEmpty]);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setIsEmpty(false);

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      // Touch event
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      // Touch event
      e.preventDefault();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    // Convert canvas to data URL and notify parent
    const canvas = canvasRef.current;
    if (canvas && !isEmpty) {
      const dataURL = canvas.toDataURL("image/png");
      setSignatureData(dataURL);
      onSignatureChange(dataURL);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    setSignatureData(null);
    onSignatureChange("");
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Pen className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white">Draw your signature below</span>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-white">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="cursor-crosshair touch-none"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-xs text-gray-500">
            Click and drag to sign, or use touch on mobile devices
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearSignature}
            className="flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
