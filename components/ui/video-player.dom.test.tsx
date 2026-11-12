import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import VideoPlayer from './video-player';

let observe: IntersectionObserverCallback;
const play = vi.fn();
beforeEach(() => {
  play.mockReset().mockResolvedValue(undefined);
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb: IntersectionObserverCallback) {
        observe = cb;
      }
      observe() {}
      disconnect() {}
    }
  );
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(play);
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  window.matchMedia = vi.fn().mockReturnValue({ matches: false });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
it('defers video source loading until visible playback intent and keeps an offscreen source unloaded', async () => {
  render(
    <VideoPlayer src="/features/example.mp4" autoPlay autoplayThreshold={0.9} />
  );
  const video = document.querySelector('video')!;
  expect(video.getAttribute('src')).toBeNull();
  expect(video.preload).toBe('none');
  act(() =>
    observe(
      [
        { isIntersecting: false, intersectionRatio: 0 },
      ] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    )
  );
  expect(video.getAttribute('src')).toBeNull();
  act(() =>
    observe(
      [
        { isIntersecting: true, intersectionRatio: 0.95 },
      ] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    )
  );
  expect(video.getAttribute('src')).toBe('/features/example.mp4');
  await act(async () =>
    observe(
      [
        { isIntersecting: true, intersectionRatio: 0.95 },
      ] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    )
  );
  expect(play).toHaveBeenCalled();
  // Only actual playback confirms the Pause state.
  expect(screen.getByRole('button', { name: 'Play video' })).toBeTruthy();
  fireEvent.play(video);
  expect(screen.getByRole('button', { name: 'Pause video' })).toBeTruthy();
});
it('retains a retryable Play control on rejected manual playback', async () => {
  play.mockRejectedValueOnce(new Error('Unsupported media'));
  render(<VideoPlayer src="/features/example.mp4" />);
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
  );
  expect(screen.getByRole('status')).toBeTruthy();
  expect(screen.queryByRole('button', { name: 'Pause video' })).toBeNull();
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
  );
  expect(play).toHaveBeenCalledTimes(2);
});
it('starts deliberate hover playback when its deferred source first attaches', async () => {
  const { container } = render(
    <VideoPlayer src="/features/example.mp4" hoverToPlay />
  );
  await act(async () => fireEvent.mouseEnter(container.firstElementChild!));
  expect(document.querySelector('video')!.getAttribute('src')).toBe(
    '/features/example.mp4'
  );
  expect(play).toHaveBeenCalledTimes(1);
});
it('ignores an old playback rejection after replacing the source', async () => {
  let rejectOld!: (error: Error) => void;
  play.mockImplementationOnce(
    () => new Promise((_, reject) => { rejectOld = reject; })
  );
  const { rerender } = render(<VideoPlayer src="/features/first.mp4" />);
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
  );
  rerender(<VideoPlayer src="/features/second.mp4" />);
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
  );
  fireEvent.play(document.querySelector('video')!);
  await act(async () => rejectOld(new Error('Old source stopped')));
  expect(screen.queryByRole('status')).toBeNull();
  expect(screen.getByRole('button', { name: 'Pause video' })).toBeTruthy();
});
it('honors reduced motion without preventing deliberate playback', async () => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: true });
  render(<VideoPlayer src="/features/example.mp4" autoPlay />);
  act(() =>
    observe(
      [
        { isIntersecting: true, intersectionRatio: 1 },
      ] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    )
  );
  expect(document.querySelector('video')!.getAttribute('src')).toBeNull();
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
  );
  expect(play).toHaveBeenCalledTimes(1);
});
it('preserves a manual pause across viewport changes and defers a replacement source', async () => {
  const { rerender } = render(
    <VideoPlayer src="/features/first.mp4" autoPlay />
  );
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))
  );
  const video = document.querySelector('video')!;
  fireEvent.play(video);
  fireEvent.click(screen.getByRole('button', { name: 'Pause video' }));
  fireEvent.pause(video);
  const attempts = play.mock.calls.length;
  act(() =>
    observe(
      [
        { isIntersecting: false, intersectionRatio: 0 },
      ] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    )
  );
  act(() =>
    observe(
      [
        { isIntersecting: true, intersectionRatio: 1 },
      ] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    )
  );
  expect(play).toHaveBeenCalledTimes(attempts);
  rerender(<VideoPlayer src="/features/second.mp4" autoPlay />);
  expect(video.getAttribute('src')).toBeNull();
  expect(screen.getByRole('button', { name: 'Play video' })).toBeTruthy();
});
