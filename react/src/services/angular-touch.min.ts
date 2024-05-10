type SwipeEvent = {
    x: number;
    y: number;
};

type SwipeConfig = {
    start?: (point: SwipeEvent, event: MouseEvent | TouchEvent) => void;
    move?: (point: SwipeEvent, event: MouseEvent | TouchEvent) => void;
    end?: (point: SwipeEvent, event: MouseEvent | TouchEvent) => void;
    cancel?: (event: MouseEvent | TouchEvent) => void;
};

class SwipeService {
    private static eventTypes = {
        mouse: { start: "mousedown", move: "mousemove", end: "mouseup" },
        touch: { start: "touchstart", move: "touchmove", end: "touchend", cancel: "touchcancel" }
    };

    static bind(element: HTMLElement, handlers: SwipeConfig, eventKinds: Array<"mouse" | "touch"> = ["mouse", "touch"]) {
        let startEvent: SwipeEvent | null = null;
        let isSwiping = false;
        let totalX = 0;
        let totalY = 0;
        let lastEvent: SwipeEvent;

        const getEventPoint = (event: MouseEvent | TouchEvent): SwipeEvent => {
            const point = 'touches' in event ? event.touches[0] : event;
            return { x: point.clientX, y: point.clientY };
        };

        const handleStart = (event: MouseEvent | TouchEvent) => {
            startEvent = getEventPoint(event);
            isSwiping = true;
            totalX = totalY = 0;
            lastEvent = startEvent;
            handlers.start?.(startEvent, event);
        };

        const handleMove = (event: MouseEvent | TouchEvent) => {
            if (!isSwiping || !startEvent) return;
            const currentEvent = getEventPoint(event);
            totalX += Math.abs(currentEvent.x - lastEvent.x);
            totalY += Math.abs(currentEvent.y - lastEvent.y);
            lastEvent = currentEvent;

            if (totalX > 10 || totalY > 10) {
                if (totalY > totalX) {
                    isSwiping = false;
                    handlers.cancel?.(event);
                } else {
                    event.preventDefault();
                    handlers.move?.(currentEvent, event);
                }
            }
        };

        const handleEnd = (event: MouseEvent | TouchEvent) => {
            if (isSwiping && startEvent) {
                handlers.end?.(getEventPoint(event), event);
            }
            isSwiping = false;
        };

        const handleCancel = (event: MouseEvent | TouchEvent) => {
            isSwiping = false;
            handlers.cancel?.(event);
        };

        eventKinds.forEach(kind => {
            const eventType = SwipeService.eventTypes[kind];
            element.addEventListener(eventType.start, handleStart);
            if (eventType.cancel) element.addEventListener(eventType.cancel, handleCancel);
            element.addEventListener(eventType.move, handleMove);
            element.addEventListener(eventType.end, handleEnd);
        });
    }
}

export default SwipeService;