// README.ts

/**
 * This is an example TypeScript file created based on the name of the file `README.md`.
 * It demonstrates basic TypeScript syntax and functionality.
 */

// Example interface
interface User {
    id: number;
    name: string;
    email: string;
}

// Example function to create a new user
function createUser(id: number, name: string, email: string): User {
    return { id, name, email };
}

// Example function to display user information
function displayUser(user: User): void {
    console.log(`User ID: ${user.id}`);
    console.log(`User Name: ${user.name}`);
    console.log(`User Email: ${user.email}`);
}

// Example usage
const newUser = createUser(1, "John Doe", "john.doe@example.com");
displayUser(newUser);
