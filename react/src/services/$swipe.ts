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

const touchEvents = {
  start: "touchstart",
  move: "touchmove",
  end: "touchend",
  cancel: "touchcancel",
};

const mouseEvents = {
  start: "mousedown",
  move: "mousemove",
  end: "mouseup",
};

const getPoint = (event: any): Point => {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return { x: e.clientX, y: e.clientY };
};

const getEvents = (types: string[], eventType: keyof typeof touchEvents) => {
  return types.map(type => (type === "mouse" ? mouseEvents[eventType] : touchEvents[eventType])).join(" ");
};

const bindSwipe = (element: HTMLElement, handlers: SwipeHandlers, types: string[] = ["mouse", "touch"]) => {
  let startPoint: Point | null = null;
  let isSwiping = false;
  let deltaX = 0;
  let deltaY = 0;

  const onStart = (event: Event) => {
    startPoint = getPoint(event);
    isSwiping = true;
    deltaX = 0;
    deltaY = 0;
    handlers.start && handlers.start(startPoint, event);
  };

  const onMove = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    const point = getPoint(event);
    deltaX += Math.abs(point.x - startPoint.x);
    deltaY += Math.abs(point.y - startPoint.y);
    startPoint = point;
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

  const onEnd = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    isSwiping = false;
    handlers.end && handlers.end(getPoint(event), event);
  };

  const onCancel = (event: Event) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  element.addEventListener(getEvents(types, "start"), onStart);
  element.addEventListener(getEvents(types, "move"), onMove);
  element.addEventListener(getEvents(types, "end"), onEnd);
  element.addEventListener(getEvents(types, "cancel"), onCancel);

  return () => {
    element.removeEventListener(getEvents(types, "start"), onStart);
    element.removeEventListener(getEvents(types, "move"), onMove);
    element.removeEventListener(getEvents(types, "end"), onEnd);
    element.removeEventListener(getEvents(types, "cancel"), onCancel);
  };
};

export { bindSwipe, Point, SwipeHandlers };