// react/src/services/$swipe.ts

type SwipeEvent = {
  start?: (coords: { x: number; y: number }, event: Event) => void;
  move?: (coords: { x: number; y: number }, event: Event) => void;
  end?: (coords: { x: number; y: number }, event: Event) => void;
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

const getCoordinates = (event: any) => {
  const touches = event.touches && event.touches.length ? event.touches : [event];
  const e = event.changedTouches && event.changedTouches[0] || event.originalEvent && event.originalEvent.changedTouches && event.originalEvent.changedTouches[0] || touches[0].originalEvent || touches[0];
  return { x: e.clientX, y: e.clientY };
};

const getEvents = (types: string[], eventName: string) => {
  const events: string[] = [];
  types.forEach(type => {
    const event = (type === 'mouse' ? mouseEvents : touchEvents)[eventName];
    if (event) events.push(event);
  });
  return events.join(" ");
};

const bindSwipe = (element: HTMLElement, eventHandlers: SwipeEvent, types: string[] = ["mouse", "touch"]) => {
  let startCoords: { x: number; y: number } | null = null;
  let active = false;
  let totalX = 0;
  let totalY = 0;
  let lastCoords: { x: number; y: number } | null = null;

  const startHandler = (event: Event) => {
    startCoords = getCoordinates(event);
    active = true;
    totalX = 0;
    totalY = 0;
    lastCoords = startCoords;
    eventHandlers.start && eventHandlers.start(startCoords, event);
  };

  const moveHandler = (event: Event) => {
    if (!active || !startCoords) return;
    const coords = getCoordinates(event);
    totalX += Math.abs(coords.x - lastCoords!.x);
    totalY += Math.abs(coords.y - lastCoords!.y);
    lastCoords = coords;
    if (totalX > 10 || totalY > 10) {
      if (totalY > totalX) {
        active = false;
        eventHandlers.cancel && eventHandlers.cancel(event);
      } else {
        event.preventDefault();
        eventHandlers.move && eventHandlers.move(coords, event);
      }
    }
  };

  const endHandler = (event: Event) => {
    if (!active || !startCoords) return;
    active = false;
    const coords = getCoordinates(event);
    eventHandlers.end && eventHandlers.end(coords, event);
  };

  const cancelHandler = (event: Event) => {
    active = false;
    eventHandlers.cancel && eventHandlers.cancel(event);
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

  return () => {
    element.removeEventListener(startEvents, startHandler);
    element.removeEventListener(moveEvents, moveHandler);
    element.removeEventListener(endEvents, endHandler);
    if (cancelEvents) {
      element.removeEventListener(cancelEvents, cancelHandler);
    }
  };
};

export default bindSwipe;