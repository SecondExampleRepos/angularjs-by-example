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

const eventMap = {
  mouse: { start: "mousedown", move: "mousemove", end: "mouseup" },
  touch: { start: "touchstart", move: "touchmove", end: "touchend", cancel: "touchcancel" },
};

const getSwipeEvent = (event: any): SwipeEvent => {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return { x: e.clientX, y: e.clientY };
};

const getEventNames = (types: string[], phase: string): string => {
  return types.map(type => eventMap[type][phase]).join(" ");
};

const bindSwipe = (element: HTMLElement, handlers: SwipeHandlers, types: string[] = ["mouse", "touch"]) => {
  let startEvent: SwipeEvent | null = null;
  let isSwiping = false;
  let deltaX = 0;
  let deltaY = 0;

  const onStart = (event: Event) => {
    startEvent = getSwipeEvent(event);
    isSwiping = true;
    deltaX = 0;
    deltaY = 0;
    handlers.start && handlers.start(startEvent, event);
  };

  const onMove = (event: Event) => {
    if (!isSwiping || !startEvent) return;
    const currentEvent = getSwipeEvent(event);
    deltaX += Math.abs(currentEvent.x - startEvent.x);
    deltaY += Math.abs(currentEvent.y - startEvent.y);
    startEvent = currentEvent;
    if (deltaX > 10 || deltaY > 10) {
      if (deltaY > deltaX) {
        isSwiping = false;
        handlers.cancel && handlers.cancel(event);
      } else {
        event.preventDefault();
        handlers.move && handlers.move(currentEvent, event);
      }
    }
  };

  const onEnd = (event: Event) => {
    if (!isSwiping || !startEvent) return;
    isSwiping = false;
    handlers.end && handlers.end(getSwipeEvent(event), event);
  };

  const onCancel = (event: Event) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  element.addEventListener(getEventNames(types, "start"), onStart);
  element.addEventListener(getEventNames(types, "move"), onMove);
  element.addEventListener(getEventNames(types, "end"), onEnd);
  if (types.includes("touch")) {
    element.addEventListener(getEventNames(types, "cancel"), onCancel);
  }
};

export { bindSwipe, SwipeHandlers, SwipeEvent };