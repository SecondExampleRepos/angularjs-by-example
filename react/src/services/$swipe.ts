// react/src/services/$swipe.ts

type Point = {
  x: number;
  y: number;
};

type SwipeHandlers = {
  start?: (point: Point, event: Event) => void;
  move?: (point: Point, event: Event) => void;
  end?: (point: Point, event: Event) => void;
  cancel?: (event: Event) => void;
};

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

const getPoint = (event: Event): Point => {
  const e = (event as TouchEvent).touches && (event as TouchEvent).touches.length
    ? (event as TouchEvent).touches[0]
    : (event as MouseEvent);
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

const getEvents = (types: string[], phase: keyof typeof mouseEvents | keyof typeof touchEvents): string => {
  const events: string[] = [];
  types.forEach((type) => {
    const event = type === "mouse" ? mouseEvents[phase] : touchEvents[phase];
    if (event) {
      events.push(event);
    }
  });
  return events.join(" ");
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
    if (!isSwiping) return;
    isSwiping = false;
    const point = getPoint(event);
    handlers.end && handlers.end(point, event);
  };

  const handleCancel = (event: Event) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  const startEvents = getEvents(types, "start");
  const moveEvents = getEvents(types, "move");
  const endEvents = getEvents(types, "end");
  const cancelEvents = getEvents(types, "cancel");

  element.addEventListener(startEvents, handleStart);
  element.addEventListener(moveEvents, handleMove);
  element.addEventListener(endEvents, handleEnd);
  if (cancelEvents) {
    element.addEventListener(cancelEvents, handleCancel);
  }

  return () => {
    element.removeEventListener(startEvents, handleStart);
    element.removeEventListener(moveEvents, handleMove);
    element.removeEventListener(endEvents, handleEnd);
    if (cancelEvents) {
      element.removeEventListener(cancelEvents, handleCancel);
    }
  };
};

export default bindSwipe;