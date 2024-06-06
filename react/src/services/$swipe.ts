// react/src/services/$swipe.ts

type SwipeEvent = {
  x: number;
  y: number;
};

type SwipeHandlers = {
  start?: (event: SwipeEvent, originalEvent: Event) => void;
  move?: (event: SwipeEvent, originalEvent: Event) => void;
  end?: (event: SwipeEvent, originalEvent: Event) => void;
  cancel?: (originalEvent: Event) => void;
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

const getCoordinates = (event: any): SwipeEvent => {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

const getEventNames = (types: string[], phase: string): string => {
  return types.map(type => (type === "mouse" ? mouseEvents[phase] : touchEvents[phase])).join(" ");
};

const bindSwipe = (element: HTMLElement, handlers: SwipeHandlers, types: string[] = ["mouse", "touch"]) => {
  let startCoords: SwipeEvent | null = null;
  let active = false;
  let totalX = 0;
  let totalY = 0;

  const startHandler = (event: Event) => {
    startCoords = getCoordinates(event);
    active = true;
    totalX = 0;
    totalY = 0;
    handlers.start && handlers.start(startCoords, event);
  };

  const moveHandler = (event: Event) => {
    if (!active || !startCoords) return;
    const coords = getCoordinates(event);
    totalX += Math.abs(coords.x - startCoords.x);
    totalY += Math.abs(coords.y - startCoords.y);
    startCoords = coords;
    if (totalX > 10 || totalY > 10) {
      if (totalY > totalX) {
        active = false;
        handlers.cancel && handlers.cancel(event);
      } else {
        event.preventDefault();
        handlers.move && handlers.move(coords, event);
      }
    }
  };

  const endHandler = (event: Event) => {
    if (!active || !startCoords) return;
    active = false;
    handlers.end && handlers.end(getCoordinates(event), event);
  };

  const cancelHandler = (event: Event) => {
    active = false;
    handlers.cancel && handlers.cancel(event);
  };

  element.addEventListener(getEventNames(types, "start"), startHandler);
  element.addEventListener(getEventNames(types, "move"), moveHandler);
  element.addEventListener(getEventNames(types, "end"), endHandler);
  if (types.includes("touch")) {
    element.addEventListener(touchEvents.cancel, cancelHandler);
  }
};

export { bindSwipe, SwipeEvent, SwipeHandlers };