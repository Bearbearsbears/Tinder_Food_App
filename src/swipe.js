import { useRef } from "react";

export default function useSwipe(onSwipeLeft, onSwipeRight) {
  const startX = useRef(0);
  const endX = useRef(0);
  //observes whether or not the user has touched screen and/or finished touching screen
  //horizontal axis

  // Touch swipe for mobile
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    endX.current = e.changedTouches[0].clientX;
    checkDirection();
  };

  // Mouse swipe for desktop
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    endX.current = e.clientX;
    checkDirection();
  };

  const checkDirection = () => { //compare horizontal distance to determine if user swiped left or right
    const diff = endX.current - startX.current;
    console.log("swipe diff:", diff);

    const THRESHOLD = 20;

    if (diff <= -THRESHOLD) {
      console.log("Swiped left");
      onSwipeLeft?.();
    } else if (diff >= THRESHOLD) {
      console.log("Swiped right");
      onSwipeRight?.();
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };
}
