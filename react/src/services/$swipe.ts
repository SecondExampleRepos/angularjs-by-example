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

const getPoint = (event: any): Point => {
  const touches = event.touches && event.touches.length ? event.touches : [event];
  const touch = event.changedTouches && event.changedTouches[0] || event.originalEvent && event.originalEvent.changedTouches && event.originalEvent.changedTouches[0] || touches[0].originalEvent || touches[0];
  return { x: touch.clientX, y: touch.clientY };
};

const getEventName = (types: string[], eventName: string): string => {
  const events = {
    mouse: { start: "mousedown", move: "mousemove", end: "mouseup" },
    touch: { start: "touchstart", move: "touchmove", end: "touchend", cancel: "touchcancel" }
  };
  return types.map(type => events[type][eventName]).join(" ");
};

const bindSwipe = (element: HTMLElement, handlers: SwipeHandlers, types: string[] = ["mouse", "touch"]) => {
  let startPoint: Point | null = null;
  let isSwiping = false;
  let deltaX = 0;
  let deltaY = 0;
  let lastPoint: Point | null = null;

  const startHandler = (event: Event) => {
    startPoint = getPoint(event);
    isSwiping = true;
    deltaX = 0;
    deltaY = 0;
    lastPoint = startPoint;
    handlers.start && handlers.start(startPoint, event);
  };

  const moveHandler = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    const point = getPoint(event);
    deltaX += Math.abs(point.x - lastPoint!.x);
    deltaY += Math.abs(point.y - lastPoint!.y);
    lastPoint = point;
    if (deltaX > 10 || deltaY > 10) {
      if (deltaY > deltaX) {
        isSwiping = false;
        handlers.cancel && handlers.cancel(event);
      } else {
        event.preventDefault();
        handlers.move && handlers.move(point, event);
      }
    }
  };

  const endHandler = (event: Event) => {
    if (isSwiping && startPoint) {
      isSwiping = false;
      handlers.end && handlers.end(getPoint(event), event);
    }
  };

  const cancelHandler = (event: Event) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  element.addEventListener(getEventName(types, "start"), startHandler);
  element.addEventListener(getEventName(types, "move"), moveHandler);
  element.addEventListener(getEventName(types, "end"), endHandler);
  if (types.includes("touch")) {
    element.addEventListener(getEventName(types, "cancel"), cancelHandler);
  }

  return () => {
    element.removeEventListener(getEventName(types, "start"), startHandler);
    element.removeEventListener(getEventName(types, "move"), moveHandler);
    element.removeEventListener(getEventName(types, "end"), endHandler);
    if (types.includes("touch")) {
      element.removeEventListener(getEventName(types, "cancel"), cancelHandler);
    }
  };
};

export { bindSwipe, Point, SwipeHandlers };