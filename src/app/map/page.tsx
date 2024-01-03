"use client";

import DialogButton from "@/components/DialogButton";
import React, { useEffect, useRef, useState } from "react";

const Map = () => {
  const imageUrl = "/images/adjusted_last.png";
  const canvasRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

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

  const drawImage = (image: any) => {
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
    const image = new Image();
    image.src = imageUrl; // 이미지 URL을 설정하세요
    image.onload = () => drawImage(image);
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

  // 오른쪽 클릭 이벤트를 막는 핸들러 함수
  const handleContextMenu = (e: any) => {
    // 기본 동작 방지
    e.preventDefault();
  };

  return (
    <div className="w-full pt-16">
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
          onContextMenu={handleContextMenu}
        >
          {Array.from({ length: 300 }).map((_, i) => {
            return (
              <>
                <DialogButton index={i}>
                  <div
                    className="border border-white border-r border-b h-[204px] hover:bg-slate-400 hover:bg-opacity-25"
                    onClick={() => {}}
                  >
                    {i}
                  </div>
                </DialogButton>
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
