// example.ts

// Define an interface for a User
interface User {
    id: number;
    name: string;
    email: string;
}

// Create a function to get user details
function getUserDetails(userId: number): User {

    // Simulate fetching user details from a database or API
    const usersDatabase: User[] = [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
        { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" }
    ];

    const user = usersDatabase.find(user => user.id === userId);

    if (!user) {
        throw new Error(`User with ID ${userId} not found`);
    }

    return user;
}
    return {
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com"
    };
}

// Create a function to display user details
function displayUserDetails(user: User): void {
    console.log(`User ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
}

// Example usage
const user = getUserDetails(1);
displayUserDetails(user);