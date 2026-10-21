import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { FloatingShareButton } from './floating-share-button';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('demo sharing', () => {
  it('selects the actual URL for manual copying when sharing and clipboard access are denied', async () => {
    vi.stubGlobal('navigator', {
      share: vi
        .fn()
        .mockRejectedValue(new DOMException('Denied', 'NotAllowedError')),
      clipboard: {
        writeText: vi
          .fn()
          .mockRejectedValue(new DOMException('Denied', 'NotAllowedError')),
      },
    });
    render(<FloatingShareButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    const input = (await screen.findByRole('textbox', {
      name: 'Demo link',
    })) as HTMLInputElement;
    expect(input.value).toBe(window.location.href);
    await waitFor(() => expect(document.activeElement).toBe(input));
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
    expect(screen.getByRole('status').textContent).toBe(
      'Select and copy this link.'
    );
  });

  it('also offers manual copying when neither browser API exists', async () => {
    vi.stubGlobal('navigator', {});
    render(<FloatingShareButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    expect((await screen.findByRole('textbox')).getAttribute('value')).toBe(
      window.location.href
    );
  });

  it('reports a successful copy and treats a cancelled share as cancellation', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    render(<FloatingShareButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toBe('Link copied.')
    );
    expect(writeText).toHaveBeenCalledWith(window.location.href);
    cleanup();

    writeText.mockClear();
    vi.stubGlobal('navigator', {
      share: vi
        .fn()
        .mockRejectedValue(new DOMException('Cancelled', 'AbortError')),
      clipboard: { writeText },
    });
    render(<FloatingShareButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Share' })).toBeTruthy()
    );
    expect(writeText).not.toHaveBeenCalled();
    expect(screen.queryByRole('textbox')).toBeNull();
  });
});
