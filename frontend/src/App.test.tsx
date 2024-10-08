import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
  render(<p>{"TEST"}</p>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
