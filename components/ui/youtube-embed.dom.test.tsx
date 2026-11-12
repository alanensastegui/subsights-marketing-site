import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { YoutubeEmbed } from './youtube-embed';
vi.mock('next/image', () => ({
  default: () => <span aria-hidden="true" />,
}));
afterEach(cleanup);
it('starts the named video on explicit play and moves focus to the player', () => {
  render(<YoutubeEmbed videoId="example" title="Website setup walkthrough" />);
  const frame = document.querySelector('iframe')!;
  expect(frame.getAttribute('src')).toBeNull();
  fireEvent.click(
    screen.getByRole('button', { name: 'Play Website setup walkthrough' })
  );
  expect(frame.getAttribute('src')).toContain('/embed/example?');
  expect(document.activeElement).toBe(frame);
});
