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

        const getEventType = (kinds: Array<"mouse" | "touch">, phase: "start" | "move" | "end" | "cancel") => {
            return kinds.map(kind => SwipeService.eventTypes[kind][phase]).join(" ");
        };

        const parseEvent = (event: any): SwipeEvent => {
            const touches = event.touches && event.touches.length ? event.touches : [event];
            const changedTouches = event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : event;
            const realEvent = changedTouches.originalEvent || changedTouches;
            return { x: realEvent.clientX, y: realEvent.clientY };
        };

        element.addEventListener(getEventType(eventKinds, "start"), (event: Event) => {
            lastEvent = parseEvent(event);
            isSwiping = true;
            totalX = totalY = 0;
            handlers.start?.(lastEvent, event);
        });

        if (handlers.cancel) {
            element.addEventListener(getEventType(eventKinds, "cancel"), (event: Event) => {
                isSwiping = false;
                handlers.cancel(event);
            });
        }

        element.addEventListener(getEventType(eventKinds, "move"), (event: Event) => {
            if (!isSwiping) return;
            const currentEvent = parseEvent(event);
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
        });

        element.addEventListener(getEventType(eventKinds, "end"), (event: Event) => {
            if (isSwiping) {
                isSwiping = false;
                handlers.end?.(parseEvent(event), event);
            }
        });
    }
}

export default SwipeService;