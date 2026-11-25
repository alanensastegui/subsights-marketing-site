import { afterEach, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AssistantFrame } from './assistant-frame';

afterEach(cleanup);

it('expands the same chat to full screen and closes with the button or Escape', () => {
  render(<AssistantFrame slug="demo" label="Demo Chamber" widgetUrl="https://widget.subsights.com/?view=inline" panel="rounded-2xl" />);
  const frame = document.querySelector('iframe')!;

  fireEvent.click(screen.getByRole('button', { name: 'Expand chat to full screen' }));
  const dialog = screen.getByRole('dialog');
  // The same iframe node stays mounted, so the conversation is not reloaded.
  expect(dialog.querySelector('iframe')).toBe(frame);
  expect(document.body.style.overflow).toBe('hidden');
  expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close' }));

  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(document.body.style.overflow).toBe('');
  expect(document.querySelector('iframe')).toBe(frame);

  fireEvent.click(screen.getByRole('button', { name: 'Expand chat to full screen' }));
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Expand chat to full screen' }));
});

// J5/O1–O22: the installed assistant's Save answer must reach an actual file.
it('permits answer downloads while keeping top-level navigation sandboxed', () => {
  render(<AssistantFrame slug="demo" label="Demo Chamber" widgetUrl="https://widget.subsights.com/?view=inline" panel="rounded-2xl" />);
  const permissions = document.querySelector('iframe')!.getAttribute('sandbox')!.split(/\s+/);
  expect(permissions).toContain('allow-downloads');
  expect(permissions).not.toContain('allow-top-navigation');
  expect(permissions).not.toContain('allow-top-navigation-by-user-activation');
});
