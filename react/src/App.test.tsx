// /var/folders/tp/_k968y_x13z2b_bhm39165fm0000gn/T/second-repos/jobs/job_7400/react/src/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
