// README.ts

/**
 * This is an example TypeScript file created based on the name of the file `README.md`.
 * It includes a simple class with a method to demonstrate basic TypeScript functionality.
 */

class Example {
    private message: string;

    constructor(message: string) {
        this.message = message;
    }

    public printMessage(): void {
        console.log(this.message);
    }
}

// Example usage:
const example = new Example("Hello, this is an example TypeScript file based on README.md");
example.printMessage();
