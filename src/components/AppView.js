import { useRef, useState, useEffect } from "react";
import StatusBar from "./StatusBar";
import { useCallback } from "react";

const AppView = ({ app, closeApp }) => {
  const startY = useRef(null);
  const startTime = useRef(null);

  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [isClosing, setIsClosing] = useState(false);

  const THRESHOLD_PERCENT = 0.25; // 25% of screen
  const FLICK_VELOCITY = 0.6; // fast swipe detection

  const handleStart = (e) => {
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    startY.current = y;
    startTime.current = Date.now();
    setIsDragging(true);
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = currentY - startY.current;

    // Only allow upward drag
    if (delta < 0) {
      setTranslateY(delta);
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;

    const dragDistance = Math.abs(translateY);
    const dragTime = Date.now() - startTime.current;
    const velocity = dragDistance / dragTime;

    const screenHeight = window.innerHeight;
    const requiredDistance = screenHeight * THRESHOLD_PERCENT;

    if (dragDistance > requiredDistance || velocity > FLICK_VELOCITY) {
      closeApp();
    } else {
      setTranslateY(0);
    }

    setIsDragging(false);
  };

  const animateClose = useCallback(() => {
    setIsClosing(true);
    setTranslateY(-window.innerHeight);

    setTimeout(() => {
      closeApp();
    }, 300);
  }, [closeApp]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        animateClose();
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "w") {
        e.preventDefault();
        animateClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [animateClose]);

  return (
    <div
      className="app-view"
      style={{
        transform: `
    translateY(${translateY}px)
    scale(${isClosing ? 0.96 : 1})
  `,
        transition: isDragging
          ? "none"
          : "transform 0.3s cubic-bezier(.25,.8,.25,1)",
      }}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
    >
      <StatusBar />

      <iframe src={app.url} title={app.name} className="app-iframe" />

      <div className="home-bar" />
    </div>
  );
};

export default AppView;
