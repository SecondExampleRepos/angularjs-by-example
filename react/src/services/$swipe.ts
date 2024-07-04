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

function getPoint(event: any): Point {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return {
    x: e.clientX,
    y: e.clientY,
  };
}

function getEvents(types: string[], eventType: string): string {
  return types.map(type => (type === "mouse" ? mouseEvents : touchEvents)[eventType]).join(" ");
}

export function bindSwipe(element: HTMLElement, handlers: SwipeHandlers, types: string[] = ["mouse", "touch"]) {
  let startPoint: Point | null = null;
  let isSwiping = false;
  let totalX = 0;
  let totalY = 0;
  let lastPoint: Point | null = null;

  element.addEventListener(getEvents(types, "start"), (event) => {
    startPoint = getPoint(event);
    isSwiping = true;
    totalX = 0;
    totalY = 0;
    lastPoint = startPoint;
    handlers.start && handlers.start(startPoint, event);
  });

  const cancelEvent = getEvents(types, "cancel");
  if (cancelEvent) {
    element.addEventListener(cancelEvent, (event) => {
      isSwiping = false;
      handlers.cancel && handlers.cancel(event);
    });
  }

  element.addEventListener(getEvents(types, "move"), (event) => {
    if (isSwiping && startPoint) {
      const currentPoint = getPoint(event);
      totalX += Math.abs(currentPoint.x - lastPoint!.x);
      totalY += Math.abs(currentPoint.y - lastPoint!.y);
      lastPoint = currentPoint;

      if (totalX > 10 || totalY > 10) {
        if (totalY > totalX) {
          isSwiping = false;
          handlers.cancel && handlers.cancel(event);
        } else {
          event.preventDefault();
          handlers.move && handlers.move(currentPoint, event);
        }
      }
    }
  });

  element.addEventListener(getEvents(types, "end"), (event) => {
    if (isSwiping && startPoint) {
      isSwiping = false;
      handlers.end && handlers.end(getPoint(event), event);
    }
  });
}
