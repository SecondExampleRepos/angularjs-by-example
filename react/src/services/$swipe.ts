// react/src/services/$swipe.ts

interface Point {
  x: number;
  y: number;
}

interface SwipeHandlers {
  start?: (point: Point, event: Event) => void;
  move?: (point: Point, event: Event) => void;
  end?: (point: Point, event: Event) => void;
  cancel?: (event: Event) => void;
}

const mouseEvents = {
  start: "mousedown",
  move: "mousemove",
  end: "mouseup",
};

const touchEvents = {
  start: "touchstart",
  move: "touchmove",
  end: "touchend",
  cancel: "touchcancel",
};

const getPoint = (event: any): Point => {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

const getEvents = (types: string[], phase: keyof typeof mouseEvents | keyof typeof touchEvents): string => {
  return types.map(type => (type === "mouse" ? mouseEvents[phase] : touchEvents[phase])).join(" ");
};

const bindSwipe = (element: HTMLElement, handlers: SwipeHandlers, types: string[] = ["mouse", "touch"]) => {
  let startPoint: Point | null = null;
  let isSwiping = false;
  let totalX = 0;
  let totalY = 0;

  const handleStart = (event: Event) => {
    startPoint = getPoint(event);
    isSwiping = true;
    totalX = 0;
    totalY = 0;
    handlers.start && handlers.start(startPoint, event);
  };

  const handleMove = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    const point = getPoint(event);
    totalX += Math.abs(point.x - startPoint.x);
    totalY += Math.abs(point.y - startPoint.y);
    startPoint = point;
    if (totalX > 10 || totalY > 10) {
      if (totalY > totalX) {
        isSwiping = false;
        handlers.cancel && handlers.cancel(event);
      } else {
        event.preventDefault();
        handlers.move && handlers.move(point, event);
      }
    }
  };

  const handleEnd = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    isSwiping = false;
    handlers.end && handlers.end(getPoint(event), event);
  };

  const handleCancel = (event: Event) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  element.addEventListener(getEvents(types, "start"), handleStart);
  element.addEventListener(getEvents(types, "move"), handleMove);
  element.addEventListener(getEvents(types, "end"), handleEnd);
  if (types.includes("touch")) {
    element.addEventListener(touchEvents.cancel, handleCancel);
  }

  return () => {
    element.removeEventListener(getEvents(types, "start"), handleStart);
    element.removeEventListener(getEvents(types, "move"), handleMove);
    element.removeEventListener(getEvents(types, "end"), handleEnd);
    if (types.includes("touch")) {
      element.removeEventListener(touchEvents.cancel, handleCancel);
    }
  };
};

export { bindSwipe, Point, SwipeHandlers };