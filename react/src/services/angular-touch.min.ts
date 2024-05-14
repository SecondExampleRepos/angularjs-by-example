type SwipeEvent = {
  x: number;
  y: number;
};

type SwipeConfig = {
  start?: (event: SwipeEvent, originalEvent: Event) => void;
  move?: (event: SwipeEvent, originalEvent: Event) => void;
  end?: (event: SwipeEvent, originalEvent: Event) => void;
  cancel?: (event: Event) => void;
};

class SwipeService {
  private static getEventCoordinates(event: TouchEvent | MouseEvent): SwipeEvent {
    const touchEvent = event as TouchEvent;
    const mouseEvent = event as MouseEvent;
    const point = touchEvent.touches && touchEvent.touches.length ? touchEvent.touches[0] : mouseEvent;
    return {
      x: point.clientX,
      y: point.clientY,
    };
  }

  private static bindEvents(element: HTMLElement, config: SwipeConfig, eventTypes: string[]) {
    let startCoords: SwipeEvent | undefined;
    let isSwiping = false;
    let totalX = 0;
    let totalY = 0;
    let lastPoint: SwipeEvent;

    const startHandler = (event: Event) => {
      startCoords = SwipeService.getEventCoordinates(event as TouchEvent | MouseEvent);
      isSwiping = true;
      totalX = totalY = 0;
      lastPoint = startCoords;
      config.start?.(startCoords, event);
    };

    const moveHandler = (event: Event) => {
      if (!isSwiping || !startCoords) return;
      const currentPoint = SwipeService.getEventCoordinates(event as TouchEvent | MouseEvent);
      totalX += Math.abs(currentPoint.x - lastPoint.x);
      totalY += Math.abs(currentPoint.y - lastPoint.y);
      lastPoint = currentPoint;
      if (totalX > 10 || totalY > 10) {
        if (totalY > totalX) {
          isSwiping = false;
          config.cancel?.(event);
        } else {
          event.preventDefault();
          config.move?.(currentPoint, event);
        }
      }
    };

    const endHandler = (event: Event) => {
      if (!isSwiping) return;
      isSwiping = false;
      const endCoords = SwipeService.getEventCoordinates(event as TouchEvent | MouseEvent);
      config.end?.(endCoords, event);
    };

    const cancelHandler = (event: Event) => {
      isSwiping = false;
      config.cancel?.(event);
    };

    eventTypes.forEach(type => {
      switch (type) {
        case 'start':
          element.addEventListener('mousedown', startHandler);
          element.addEventListener('touchstart', startHandler);
          break;
        case 'move':
          element.addEventListener('mousemove', moveHandler);
          element.addEventListener('touchmove', moveHandler);
          break;
        case 'end':
          element.addEventListener('mouseup', endHandler);
          element.addEventListener('touchend', endHandler);
          break;
        case 'cancel':
          element.addEventListener('touchcancel', cancelHandler);
          break;
      }
    });
  }

  public static enableSwipe(element: HTMLElement, config: SwipeConfig) {
    SwipeService.bindEvents(element, config, ['start', 'move', 'end', 'cancel']);
  }
}

export default SwipeService;