'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export function FloatingShareButton() {
  const [status, setStatus] = useState<
    'idle' | 'sharing' | 'copied' | 'manual'
  >('idle');
  const [shareUrl, setShareUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useEffect(() => {
    if (status === 'manual') {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [status]);

  const handleShare = async () => {
    const url = window.location.href;
    setShareUrl(url);
    setStatus('sharing');

    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
        setStatus('idle');
        return;
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          'name' in error &&
          error.name === 'AbortError'
        ) {
          setStatus('idle');
          return;
        }
        // A denied share sheet can still fall back to copying the link.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
    } catch {
      setStatus('manual');
    }
  };

  return (
    <div className="shrink-0 border-b bg-background px-4 py-3">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
        <Button onClick={handleShare} disabled={status === 'sharing'}>
          {status === 'sharing' ? 'Sharing…' : 'Share'}
        </Button>
        <span role="status" className="text-sm">
          {status === 'copied'
            ? 'Link copied.'
            : status === 'manual'
              ? 'Select and copy this link.'
              : ''}
        </span>
        {status === 'manual' && (
          <div className="w-full">
            <label htmlFor={inputId} className="mb-1 block text-sm">
              Demo link
            </label>
            <input
              ref={inputRef}
              id={inputId}
              readOnly
              value={shareUrl}
              onFocus={(event) => event.currentTarget.select()}
              className="w-full rounded-md border bg-background px-3 py-2 text-base"
            />
          </div>
        )}
      </div>
    </div>
  );
}
