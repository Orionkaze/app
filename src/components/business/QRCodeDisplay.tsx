"use client";

import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "../ui/Button";

interface QRCodeDisplayProps {
  businessId: string;
}

export function QRCodeDisplay({ businessId }: QRCodeDisplayProps) {
  // Using generic mock url representing a live redirection structure
  const scanUrl = `https://loyalty.app/visit?b=${businessId}`;
  const svgRef = useRef<SVGSVGElement>(null);

  const downloadQR = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white"; // Require solid framing
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QR-Code-${businessId}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
           <div style={{ 
             padding: "24px", 
             backgroundColor: "#FFF", 
             borderRadius: "16px",
             boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
             display: "inline-block"
           }}>
             <QRCodeSVG 
               value={scanUrl} 
               size={240}
               level={"H"}
               includeMargin={false}
               fgColor={"#000000"} // Best scannability
               bgColor={"#FFFFFF"} 
               ref={svgRef}
             />
           </div>
           
           <div style={{ textAlign: "center", color: "var(--color-text-secondary)", fontSize: "14px" }}>
              <p style={{ marginBottom: "16px" }}>Customers scan this to earn visits.</p>
              <Button onClick={downloadQR} size="small" variant="primary">
                 Download PNG
              </Button>
           </div>
        </div>
  );
}
