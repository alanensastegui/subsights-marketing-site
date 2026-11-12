import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import Carousel from './carousel';
afterEach(cleanup);
it('keeps inactive controls out of the focus path and restores useful focus after advancement', () => {
  const items = [
    { id: 'one', content: <button>First playback</button> },
    { id: 'two', content: <button>Second playback</button> },
  ];
  const { rerender } = render(
    <Carousel items={items} currentIndex={0} onIndexChange={vi.fn()} />
  );
  const first = screen.getByRole('button', { name: 'First playback' });
  first.focus();
  expect(document.activeElement).toBe(first);
  rerender(<Carousel items={items} currentIndex={1} onIndexChange={vi.fn()} />);
  expect(first.closest('[inert]')).toBeTruthy();
  expect(document.activeElement).toBe(
    screen.getByRole('button', { name: 'Second playback' })
  );
});
