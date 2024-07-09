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

const getEventCoordinates = (event: any): SwipeEvent => {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

const getEventNames = (types: string[], phase: string): string => {
  const events = types.map((type) => {
    if (type === "mouse") {
      return mouseEvents[phase];
    } else if (type === "touch") {
      return touchEvents[phase];
    }
    return "";
  });
  return events.join(" ");
};

const bindSwipeEvents = (
  element: HTMLElement,
  handlers: SwipeHandlers,
  types: string[] = ["mouse", "touch"]
) => {
  let startCoords: SwipeEvent | null = null;
  let lastCoords: SwipeEvent | null = null;
  let active = false;

  const startHandler = (event: Event) => {
    startCoords = getEventCoordinates(event);
    lastCoords = startCoords;
    active = true;
    handlers.start && handlers.start(startCoords, event);
  };

  const moveHandler = (event: Event) => {
    if (!active || !startCoords) return;
    const coords = getEventCoordinates(event);
    const deltaX = Math.abs(coords.x - lastCoords!.x);
    const deltaY = Math.abs(coords.y - lastCoords!.y);
    lastCoords = coords;

    if (deltaX < 10 && deltaY < 10) return;

    if (deltaY > deltaX) {
      active = false;
      handlers.cancel && handlers.cancel(event);
    } else {
      event.preventDefault();
      handlers.move && handlers.move(coords, event);
    }
  };

  const endHandler = (event: Event) => {
    if (!active || !startCoords) return;
    active = false;
    const coords = getEventCoordinates(event);
    handlers.end && handlers.end(coords, event);
  };

  const cancelHandler = (event: Event) => {
    active = false;
    handlers.cancel && handlers.cancel(event);
  };

  element.addEventListener(getEventNames(types, "start"), startHandler);
  element.addEventListener(getEventNames(types, "move"), moveHandler);
  element.addEventListener(getEventNames(types, "end"), endHandler);
  if (types.includes("touch")) {
    element.addEventListener(getEventNames(types, "cancel"), cancelHandler);
  }

  return () => {
    element.removeEventListener(getEventNames(types, "start"), startHandler);
    element.removeEventListener(getEventNames(types, "move"), moveHandler);
    element.removeEventListener(getEventNames(types, "end"), endHandler);
    if (types.includes("touch")) {
      element.removeEventListener(getEventNames(types, "cancel"), cancelHandler);
    }
  };
};

export { bindSwipeEvents, SwipeHandlers, SwipeEvent };
