import { useRef, useState } from "react";
import StatusBar from "./StatusBar";

const AppView = ({ app, closeApp }) => {
  const startY = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  const handleStart = (e) => {
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleMove = (e) => {
    if (startY.current === null) return;

    const currentY = e.touches ? e.touches[0].clientY : e.clientY;

    const delta = currentY - startY.current;

    // only allow upward swipe
    if (delta < 0) {
      setTranslateY(delta);
    }
  };

  const handleEnd = () => {
    if (translateY < -120) {
      closeApp(); // swipe threshold
    } else {
      setTranslateY(0); // snap back
    }

    startY.current = null;
  };

  return (
    <div
      className="app-view"
      style={{ transform: `translateY(${translateY}px)` }}
    >
        <StatusBar />
      <iframe src={app.url} title={app.name} className="app-iframe" />
      <div
        className="home-bar"
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
      />
    </div>
  );
};

export default AppView;
