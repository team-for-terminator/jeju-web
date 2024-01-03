"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";

const Map = () => {
  const imageUrl = "/images/adjusted_last.png";
  const canvasRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const image = new Image();

  const boxRef: any = useRef(null);
  const overlayRef: any = useRef(null);

  const scrollHorizontally = (distance: number) => {
    if (boxRef.current) {
      boxRef.current.scrollLeft += distance;
    }
  };

  const scrollVertically = (distance: number) => {
    if (boxRef.current) {
      boxRef.current.scrollTop += distance;
    }
  };

  const drawImage = () => {
    const canvas: any = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = image.width;
      canvas.height = image.height;

      overlayRef.width = image.width;
      overlayRef.height = image.height;

      ctx.drawImage(image, offsetX, offsetY);
    }
  };

  useEffect(() => {
    image.src = imageUrl; // 이미지 URL을 설정하세요
    image.onload = () => drawImage();
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setStartX(e.clientX);
      setStartY(e.clientY);
      // const newOffsetX = offsetX + dx;
      // const newOffsetY = offsetY + dy;
      // setOffsetX(newOffsetX);
      // setOffsetY(newOffsetY);
      // drawImage();

      scrollHorizontally(-dx);
      scrollVertically(-dy);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full">
      <div
        className="m-auto max-w-[1000px] max-h-[600px] overflow-auto scrollbar relative"
        ref={boxRef}
      >
        <div
          className="absolute w-[5977px] h-[2040px] grid grid-cols-30 w-100 h-100 border border-white"
          ref={overlayRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseUp}
        >
          {Array.from({ length: 300 }).map((_) => {
            return (
              <>
                <div className="border border-white border-r border-b h-[204px] hover:bg-slate-400 hover:bg-opacity-25"></div>
              </>
            );
          })}
        </div>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Map;
