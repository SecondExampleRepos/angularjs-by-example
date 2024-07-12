// README.ts

/**
 * This is an example TypeScript file created based on the name of the file: README.md
 * The purpose of this file is to demonstrate basic TypeScript functionality.
 */

// Function to greet the user
function greetUser(name: string): string {
    return `Hello, ${name}! Welcome to the TypeScript example.`;
}

// Example usage of the greetUser function
const userName: string = "John Doe";
console.log(greetUser(userName));

// Function to add two numbers
function addNumbers(a: number, b: number): number {
    return a + b;
}

// Example usage of the addNumbers function
const num1: number = 5;
const num2: number = 10;
console.log(`The sum of ${num1} and ${num2} is ${addNumbers(num1, num2)}.`);
