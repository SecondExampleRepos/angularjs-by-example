// react/src/services/$swipe.ts

type SwipeEvent = {
  start?: (coords: { x: number; y: number }, event: Event) => void;
  move?: (coords: { x: number; y: number }, event: Event) => void;
  end?: (coords: { x: number; y: number }, event: Event) => void;
  cancel?: (event: Event) => void;
};

const getCoordinates = (event: TouchEvent | MouseEvent): { x: number; y: number } => {
  const touches = (event as TouchEvent).touches && (event as TouchEvent).touches.length
    ? (event as TouchEvent).touches
    : [event];
  const changedTouches = (event as TouchEvent).changedTouches && (event as TouchEvent).changedTouches[0]
    || (event as any).originalEvent && (event as any).originalEvent.changedTouches && (event as any).originalEvent.changedTouches[0]
    || touches[0].originalEvent
    || touches[0];
  return { x: changedTouches.clientX, y: changedTouches.clientY };
};

const getEventName = (types: string[], eventName: string): string => {
  const events: { [key: string]: { [key: string]: string } } = {
    mouse: { start: "mousedown", move: "mousemove", end: "mouseup" },
    touch: { start: "touchstart", move: "touchmove", end: "touchend", cancel: "touchcancel" }
  };
  return types.map(type => events[type][eventName]).join(" ");
};

const bindSwipeEvents = (element: HTMLElement, events: SwipeEvent, types: string[] = ["mouse", "touch"]) => {
  let startCoords: { x: number; y: number } | null = null;
  let lastCoords: { x: number; y: number } | null = null;
  let totalX = 0;
  let totalY = 0;
  let active = false;

  const startHandler = (event: Event) => {
    startCoords = getCoordinates(event as TouchEvent | MouseEvent);
    lastCoords = startCoords;
    totalX = 0;
    totalY = 0;
    active = true;
    events.start && events.start(startCoords, event);
  };

  const moveHandler = (event: Event) => {
    if (!active || !startCoords) return;
    const coords = getCoordinates(event as TouchEvent | MouseEvent);
    totalX += Math.abs(coords.x - lastCoords!.x);
    totalY += Math.abs(coords.y - lastCoords!.y);
    lastCoords = coords;
    if (totalX > 10 || totalY > 10) {
      if (totalY > totalX) {
        active = false;
        events.cancel && events.cancel(event);
      } else {
        event.preventDefault();
        events.move && events.move(coords, event);
      }
    }
  };

  const endHandler = (event: Event) => {
    if (!active || !startCoords) return;
    active = false;
    events.end && events.end(getCoordinates(event as TouchEvent | MouseEvent), event);
  };

  const cancelHandler = (event: Event) => {
    active = false;
    events.cancel && events.cancel(event);
  };

  element.addEventListener(getEventName(types, "start"), startHandler);
  element.addEventListener(getEventName(types, "move"), moveHandler);
  element.addEventListener(getEventName(types, "end"), endHandler);
  if (getEventName(types, "cancel")) {
    element.addEventListener(getEventName(types, "cancel"), cancelHandler);
  }
};

export { bindSwipeEvents };