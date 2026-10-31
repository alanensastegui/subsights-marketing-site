export type DemoPreview = {
  sample: 'analytics' | 'report' | 'notification' | 'improvement';
  cadence: 'daily' | 'weekly' | 'monthly';
  staff_alerts: boolean | null;
};
export type PreviewChange = Partial<DemoPreview> & {
  sample: DemoPreview['sample'];
};

const samples: Record<string, DemoPreview['sample']> = {
  'team-preview': 'analytics',
  'sample-report': 'report',
  'sample-notification': 'notification',
  'sample-improvement': 'improvement',
};

export function readPreviewHash(hash: string): PreviewChange | null {
  const [anchor, query] = hash.replace(/^#/, '').split('?');
  const sample = Object.prototype.hasOwnProperty.call(samples, anchor)
    ? samples[anchor]
    : undefined;
  if (!sample) return null;
  const params = new URLSearchParams(query);
  const change: PreviewChange = { sample };
  const cadence = params.get('cadence');
  if (cadence === 'daily' || cadence === 'weekly' || cadence === 'monthly')
    change.cadence = cadence;
  const alerts = params.get('staff-alerts');
  if (alerts === 'on' || alerts === 'off')
    change.staff_alerts = alerts === 'on';
  return change;
}

export function previewHash(preview: DemoPreview): string {
  const anchor = Object.entries(samples).find(
    ([, sample]) => sample === preview.sample
  )![0];
  const params = new URLSearchParams({ cadence: preview.cadence });
  if (preview.staff_alerts !== null)
    params.set('staff-alerts', preview.staff_alerts ? 'on' : 'off');
  return '#' + anchor + '?' + params.toString();
}

export function readPreviewMessage(
  data: unknown,
  slug: string
): PreviewChange | null {
  if (!data || typeof data !== 'object') return null;
  const message = data as Record<string, unknown>;
  if (message.type !== 'subsights:demo-preview' || message.version !== 1)
    return null;
  if (!message.preview || typeof message.preview !== 'object') return null;
  const value = message.preview as Record<string, unknown>;
  if (
    value.demo_slug !== slug ||
    !Object.values(samples).includes(value.sample as DemoPreview['sample'])
  )
    return null;
  if (
    value.cadence !== undefined &&
    !['daily', 'weekly', 'monthly'].includes(value.cadence as string)
  )
    return null;
  if (
    value.staff_alerts !== undefined &&
    typeof value.staff_alerts !== 'boolean'
  )
    return null;
  return {
    sample: value.sample as DemoPreview['sample'],
    ...(value.cadence === undefined
      ? {}
      : { cadence: value.cadence as DemoPreview['cadence'] }),
    ...(value.staff_alerts === undefined
      ? {}
      : { staff_alerts: value.staff_alerts as boolean }),
  };
}
