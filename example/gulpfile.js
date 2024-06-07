// Import necessary modules
import express, { Request, Response } from 'express';

// Create an instance of express
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Define another route with a parameter
app.get('/user/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
import { getUserById } from './database'; // Assuming there's a database module with this function

const user = getUserById(userId);
if (user) {
  res.json(user);
} else {
  res.status(404).send('User not found');
}
  res.send(`User ID: ${userId}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});