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

const getPoint = (event: any): Point => {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

const getEvents = (types: string[], phase: string): string => {
  const events: string[] = [];
  types.forEach((type) => {
    const event = type === "mouse" ? mouseEvents[phase] : touchEvents[phase];
    if (event) {
      events.push(event);
    }
  });
  return events.join(" ");
};

export const bindSwipe = (
  element: HTMLElement,
  handlers: SwipeHandlers,
  types: string[] = ["mouse", "touch"]
): void => {
  let startPoint: Point | null = null;
  let isSwiping = false;
  let deltaX = 0;
  let deltaY = 0;

  const startHandler = (event: Event) => {
    startPoint = getPoint(event);
    isSwiping = true;
    deltaX = 0;
    deltaY = 0;
    handlers.start && handlers.start(startPoint, event);
  };

  const moveHandler = (event: Event) => {
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

  const endHandler = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    isSwiping = false;
    handlers.end && handlers.end(getPoint(event), event);
  };

  const cancelHandler = (event: Event) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  const startEvents = getEvents(types, "start");
  const moveEvents = getEvents(types, "move");
  const endEvents = getEvents(types, "end");
  const cancelEvents = getEvents(types, "cancel");

  element.addEventListener(startEvents, startHandler);
  element.addEventListener(moveEvents, moveHandler);
  element.addEventListener(endEvents, endHandler);
  if (cancelEvents) {
    element.addEventListener(cancelEvents, cancelHandler);
  }
};
