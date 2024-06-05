// react/src/services/$swipe.ts

type SwipeEvent = {
  start?: (coords: { x: number; y: number }, event: Event) => void;
  move?: (coords: { x: number; y: number }, event: Event) => void;
  end?: (coords: { x: number; y: number }, event: Event) => void;
  cancel?: (event: Event) => void;
};

type SwipeType = 'mouse' | 'touch';

const swipeEvents = {
  mouse: { start: 'mousedown', move: 'mousemove', end: 'mouseup' },
  touch: { start: 'touchstart', move: 'touchmove', end: 'touchend', cancel: 'touchcancel' },
};

const getCoordinates = (event: any): { x: number; y: number } => {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return { x: e.clientX, y: e.clientY };
};

const getEventName = (types: SwipeType[], eventName: keyof typeof swipeEvents.mouse): string => {
  return types.map(type => swipeEvents[type][eventName]).join(' ');
};

export const bindSwipe = (element: HTMLElement, events: SwipeEvent, types: SwipeType[] = ['mouse', 'touch']): void => {
  let startCoords: { x: number; y: number } | null = null;
  let active = false;
  let totalX = 0;
  let totalY = 0;

  const startHandler = (event: Event) => {
    startCoords = getCoordinates(event);
    active = true;
    totalX = 0;
    totalY = 0;
    events.start && events.start(startCoords, event);
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
    events.end && events.end(getCoordinates(event), event);
  };

  const cancelHandler = (event: Event) => {
    active = false;
    events.cancel && events.cancel(event);
  };

  element.addEventListener(getEventName(types, 'start'), startHandler);
  element.addEventListener(getEventName(types, 'move'), moveHandler);
  element.addEventListener(getEventName(types, 'end'), endHandler);
  if (types.includes('touch')) {
    element.addEventListener(getEventName(types, 'cancel'), cancelHandler);
  }
};