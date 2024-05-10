type SwipeEvent = {
  x: number;
  y: number;
};

type SwipeConfig = {
  start?: (coords: SwipeEvent, event: MouseEvent | TouchEvent) => void;
  move?: (coords: SwipeEvent, event: MouseEvent | TouchEvent) => void;
  end?: (coords: SwipeEvent, event: MouseEvent | TouchEvent) => void;
  cancel?: (event: MouseEvent | TouchEvent) => void;
};

class SwipeService {
  private static getCoordinates(event: MouseEvent | TouchEvent): SwipeEvent {
    const touchEvent = event as TouchEvent;
    const mouseEvent = event as MouseEvent;
    const point = touchEvent.touches && touchEvent.touches.length ? touchEvent.touches[0] : mouseEvent;
    return {
      x: point.clientX,
      y: point.clientY,
    };
  }

  private static bindEvents(element: HTMLElement, config: SwipeConfig, eventTypes: string[]) {
    const startEvents = eventTypes.map(type => `${type}start`).join(' ');
    const moveEvents = eventTypes.map(type => `${type}move`).join(' ');
    const endEvents = eventTypes.map(type => `${type}end`).join(' ');
    const cancelEvents = eventTypes.map(type => `${type}cancel`).join(' ');

    element.addEventListener(startEvents, (event: MouseEvent | TouchEvent) => {
      const coords = SwipeService.getCoordinates(event);
      config.start?.(coords, event);
    });

    if (cancelEvents) {
      element.addEventListener(cancelEvents, (event: MouseEvent | TouchEvent) => {
        config.cancel?.(event);
      });
    }

    element.addEventListener(moveEvents, (event: MouseEvent | TouchEvent) => {
      const coords = SwipeService.getCoordinates(event);
      config.move?.(coords, event);
    });

    element.addEventListener(endEvents, (event: MouseEvent | TouchEvent) => {
      const coords = SwipeService.getCoordinates(event);
      config.end?.(coords, event);
    });
  }

  public static enableSwipe(element: HTMLElement, config: SwipeConfig, useMouse: boolean = false) {
    const eventTypes = ['touch'];
    if (useMouse) {
      eventTypes.push('mouse');
    }
    SwipeService.bindEvents(element, config, eventTypes);
  }
}

export default SwipeService;