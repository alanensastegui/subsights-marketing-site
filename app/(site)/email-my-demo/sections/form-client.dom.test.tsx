import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('industry=publishers'),
}));
import DemoRequestForm from './form-client';

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('website inquiry form', () => {
  it('preserves industry context and keeps a failed request available to retry', async () => {
    const delivery = vi
      .fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: true });
    vi.stubGlobal('fetch', delivery);
    render(<DemoRequestForm />);
    expect(
      (screen.getByLabelText('Industry (optional)') as HTMLSelectElement).value
    ).toBe('publishers');
    fireEvent.change(screen.getByLabelText('First name *'), {
      target: { value: 'Example' },
    });
    fireEvent.change(screen.getByLabelText('Last name *'), {
      target: { value: 'Visitor' },
    });
    fireEvent.change(screen.getByLabelText('Work email *'), {
      target: { value: 'visitor@example.test' },
    });
    fireEvent.change(
      screen.getByLabelText('A question your visitors ask (optional)'),
      { target: { value: 'Which program fits?' } }
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Send my website question' })
    );
    await waitFor(() =>
      expect(screen.getByRole('alert').textContent).toContain(
        "couldn't deliver"
      )
    );
    expect(screen.queryByText('Your request is in.')).toBeNull();
    expect(
      (screen.getByLabelText('Work email *') as HTMLInputElement).value
    ).toBe('visitor@example.test');
    fireEvent.click(
      screen.getByRole('button', { name: 'Send my website question' })
    );
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toContain(
        'Your request is in.'
      )
    );
    expect(JSON.parse(delivery.mock.calls[1][1].body).industry).toBe(
      'publishers'
    );
    expect(JSON.parse(delivery.mock.calls[1][1].body).customerQuestion).toBe(
      'Which program fits?'
    );
  });
});
