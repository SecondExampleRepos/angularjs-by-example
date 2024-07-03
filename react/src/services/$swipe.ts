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

function getEvents(types: string[], phase: string): string {
  return types.map(type => (type === "mouse" ? mouseEvents[phase] : touchEvents[phase])).join(" ");
}

export const $swipe = {
  bind(element: HTMLElement, handlers: SwipeHandlers, types: string[] = ["mouse", "touch"]) {
    let startPoint: Point | null = null;
    let isSwiping = false;
    let totalX = 0;
    let totalY = 0;

    const startHandler = (event: Event) => {
      startPoint = getPoint(event);
      isSwiping = true;
      totalX = 0;
      totalY = 0;
      handlers.start && handlers.start(startPoint, event);
    };

    const moveHandler = (event: Event) => {
      if (!isSwiping || !startPoint) return;

      const point = getPoint(event);
      totalX += Math.abs(point.x - startPoint.x);
      totalY += Math.abs(point.y - startPoint.y);
      startPoint = point;

      if (totalX < 10 && totalY < 10) return;

      if (totalY > totalX) {
        isSwiping = false;
        handlers.cancel && handlers.cancel(event);
      } else {
        event.preventDefault();
        handlers.move && handlers.move(point, event);
      }
    };

    const endHandler = (event: Event) => {
      if (!isSwiping) return;

      isSwiping = false;
      handlers.end && handlers.end(getPoint(event), event);
    };

    const cancelHandler = (event: Event) => {
      isSwiping = false;
      handlers.cancel && handlers.cancel(event);
    };

    element.addEventListener(getEvents(types, "start"), startHandler);
    element.addEventListener(getEvents(types, "move"), moveHandler);
    element.addEventListener(getEvents(types, "end"), endHandler);
    if (types.includes("touch")) {
      element.addEventListener(touchEvents.cancel, cancelHandler);
    }
  },
};
