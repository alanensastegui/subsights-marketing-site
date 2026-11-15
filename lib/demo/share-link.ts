export function shareKey(hash: string): string {
  const fragment = hash.replace(/^#/, '');
  return new URLSearchParams(fragment.includes('?') ? fragment.slice(fragment.indexOf('?') + 1) : fragment).get('key') || '';
}
export function withShareKey(hash: string, key: string): string {
  if (!key) return hash;
  const [anchor, query = ''] = hash.replace(/^#/, '').split('?');
  const params = new URLSearchParams(query);
  params.set('key', key);
  return '#' + (anchor || 'share') + '?' + params.toString();
}
export function canonicalShareUrl(href: string): string {
  const url = new URL(href);
  const key = shareKey(url.hash);
  if (key) { url.search = ''; url.hash = withShareKey('#share', key); }
  return url.href;
}
