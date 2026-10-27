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
    await waitFor(() =>
      expect(screen.getByRole('alert')).toBe(document.activeElement)
    );
    expect(
      (screen.getByLabelText('Work email *') as HTMLInputElement).value
    ).toBe('visitor@example.test');
    fireEvent.click(
      screen.getByRole('button', { name: 'Send my website question' })
    );
    await waitFor(() =>
      expect(
        screen.getByRole('status', { name: 'Your request is in.' }).textContent
      ).toContain('Your request is in.')
    );
    expect(JSON.parse(delivery.mock.calls[1][1].body).industry).toBe(
      'publishers'
    );
    expect(JSON.parse(delivery.mock.calls[1][1].body).customerQuestion).toBe(
      'Which program fits?'
    );
  });

  it('focuses a network failure and preserves the visitor question for retry', async () => {
    const delivery = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    vi.stubGlobal('fetch', delivery);
    render(<DemoRequestForm />);
    for (const [label, value] of [
      ['First name *', 'Example'],
      ['Last name *', 'Visitor'],
      ['Work email *', 'visitor@example.test'],
      ['A question your visitors ask (optional)', 'Can I compare the programs?'],
    ]) {
      fireEvent.change(screen.getByLabelText(label), { target: { value } });
    }
    fireEvent.click(
      screen.getByRole('button', { name: 'Send my website question' })
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toBe(document.activeElement)
    );
    expect(
      (screen.getByLabelText('A question your visitors ask (optional)') as HTMLTextAreaElement).value
    ).toBe('Can I compare the programs?');
    expect(
      screen.getByRole('button', { name: 'Send my website question' }).hasAttribute('disabled')
    ).toBe(false);
    expect(delivery).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('explains missing fields and focuses the first one without submitting', async () => {
    const delivery = vi.fn();
    vi.stubGlobal('fetch', delivery);
    render(<DemoRequestForm />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Send my website question' })
    );
    expect(screen.getByText('Enter your email')).toBeTruthy();
    expect(screen.getByRole('alert').textContent).toContain(
      'highlighted fields'
    );
    await waitFor(() =>
      expect(screen.getByLabelText('First name *')).toBe(document.activeElement)
    );
    expect(delivery).not.toHaveBeenCalled();
    const previousAlert = screen.getByRole('alert');
    fireEvent.click(
      screen.getByRole('button', { name: 'Send my website question' })
    );
    expect(screen.getByRole('alert')).not.toBe(previousAlert);
    expect(screen.getByRole('alert').textContent).toContain('highlighted fields');
    await waitFor(() =>
      expect(screen.getByLabelText('First name *')).toBe(document.activeElement)
    );
    expect(delivery).not.toHaveBeenCalled();
  });

  it('blocks spaces in a website address and lets the visitor correct it', async () => {
    const delivery = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', delivery);
    render(<DemoRequestForm />);
    for (const [label, value] of [
      ['First name *', 'Example'],
      ['Last name *', 'Visitor'],
      ['Work email *', 'visitor@example.test'],
    ]) {
      fireEvent.change(screen.getByLabelText(label), { target: { value } });
    }
    const website = screen.getByLabelText('Website (optional)');
    fireEvent.change(website, { target: { value: 'exa mple.com' } });
    fireEvent.click(
      screen.getByRole('button', { name: 'Send my website question' })
    );
    expect(website.getAttribute('aria-invalid')).toBe('true');
    await waitFor(() => expect(website).toBe(document.activeElement));
    expect(delivery).not.toHaveBeenCalled();
    fireEvent.change(website, { target: { value: 'example.test' } });
    fireEvent.click(
      screen.getByRole('button', { name: 'Send my website question' })
    );
    await waitFor(() =>
      expect(screen.getByRole('status')).toBe(document.activeElement)
    );
    expect(JSON.parse(delivery.mock.calls[0][1].body).website).toBe(
      'https://example.test'
    );
  });

  it('shows a server field error next to the input and preserves the request for correction', async () => {
    const delivery = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          ok: false,
          errors: {
            errors: [],
            properties: { website: { errors: ['Check this website address'] } },
          },
        }),
      })
      .mockResolvedValueOnce({ ok: true });
    vi.stubGlobal('fetch', delivery);
    render(<DemoRequestForm />);
    for (const [label, value] of [
      ['First name *', 'Example'],
      ['Last name *', 'Visitor'],
      ['Work email *', 'visitor@example.test'],
      ['Website (optional)', 'example.test'],
    ]) {
      fireEvent.change(screen.getByLabelText(label), { target: { value } });
    }
    fireEvent.click(
      screen.getByRole('button', { name: 'Send my website question' })
    );
    await waitFor(() =>
      expect(screen.getByText('Check this website address')).toBeTruthy()
    );
    const website = screen.getByLabelText('Website (optional)');
    expect(website.getAttribute('aria-describedby')).toBe('website-error');
    await waitFor(() => expect(website).toBe(document.activeElement));
    expect(
      (screen.getByLabelText('Work email *') as HTMLInputElement).value
    ).toBe('visitor@example.test');
    fireEvent.change(website, { target: { value: 'corrected.example.test' } });
    fireEvent.click(
      screen.getByRole('button', { name: 'Send my website question' })
    );
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toContain(
        'Your request is in.'
      )
    );
    expect(JSON.parse(delivery.mock.calls[1][1].body).website).toBe(
      'https://corrected.example.test'
    );
  });
});
