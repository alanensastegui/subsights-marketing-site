import { ImageResponse } from 'next/og';

export const alt =
  'Subsights: managed website AI for destinations, lenders and publishers';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function SocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#080916',
          color: '#ffffff',
          padding: '64px 76px',
          borderTop: '12px solid #0069ff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, color: '#aeb9ff' }}>
          subsights
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-3px',
            maxWidth: 980,
          }}
        >
          Good questions deserve a useful answer.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', fontSize: 29, color: '#c6cbdf' }}>
            Managed website AI. Personal setup. Ongoing care.
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#aeb9ff' }}>
            Destinations · Private lenders · Publishers
          </div>
        </div>
      </div>
    ),
    size
  );
}
