"use client";
import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import { toPng } from "html-to-image";

// Define the type for the ref
type QRCodeRef = HTMLDivElement | null;

const QrCodeGenerator: React.FC = () => {
  const [qrCode, setQrCode] = useState<string>("");
  const [input, setInput] = useState<string>("");
 
  const qrRef = useRef<QRCodeRef>(null);

  const handleQrCodeGenerator = () => {
    setQrCode(input);
    setInput("");
  };

  const handleDownload = async () => {
    if (qrRef.current) {
      // Set the size to fit within the container
      const dataUrl = await toPng(qrRef.current, {
        canvasWidth: qrRef.current.clientWidth,
        canvasHeight: qrRef.current.clientHeight,
        backgroundColor: "#fff",
      });
      saveAs(dataUrl, "qr-code.png");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          QR Code Generator
        </h1>
        <div className="flex flex-col sm:flex-row items-center p-4 gap-4">
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            name="qr-code"
            placeholder="Enter your link"
            className="border-2 rounded-md p-2 w-full sm:w-auto"
            value={input}
          />
          <button
            disabled={!input.trim()}
            onClick={handleQrCodeGenerator}
            className="p-2 bg-slate-500 rounded-md cursor-pointer hover:bg-slate-600 hover:text-white transition-colors w-full sm:w-auto"
          >
            Generate
          </button>
          <button
            onClick={handleDownload}
            disabled={!qrCode}
            className="p-2 bg-green-500 rounded-md cursor-pointer hover:bg-green-600 hover:text-white transition-colors w-full sm:w-auto"
          >
            Download QR Code
          </button>
        </div>
        {qrCode && (
          <div
            ref={qrRef}
            className="py-6 px-6 bg-white border rounded-md flex justify-center"
          >
            <QRCode
              value={qrCode}
              className="w-full h-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]"
              bgColor="#fff"
            />
          </div>
        )}
      </div>
      <footer className="mt-8 text-center text-gray-600">
        <p>
          Developed by{" "}
          <a
            href="https://github.com/mdforhadsarker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Forhad
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default QrCodeGenerator;
