import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import MobileNavigation from './mobile-navigation';

afterEach(cleanup);
it('only exposes sector links when expanded and closes the navigation on selection', () => {
  render(
    <MobileNavigation
      navItems={[
        {
          label: 'Industries',
          children: [{ label: 'Destinations', href: '/destinations' }],
        },
        { label: 'Features', href: '/features' },
      ]}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Toggle mobile menu' }));
  const toggle = screen.getByRole('button', { name: 'Industries' });
  expect(screen.queryByRole('link', { name: 'Destinations' })).toBeNull();
  expect(toggle.getAttribute('aria-expanded')).toBe('false');
  fireEvent.click(toggle);
  const link = screen.getByRole('link', { name: 'Destinations' });
  expect(link.getAttribute('href')).toBe('/destinations');
  expect(toggle.getAttribute('aria-expanded')).toBe('true');
  fireEvent.click(toggle);
  expect(screen.queryByRole('link', { name: 'Destinations' })).toBeNull();
  fireEvent.click(toggle);
  fireEvent.click(screen.getByRole('link', { name: 'Destinations' }));
  expect(screen.queryByRole('dialog')).toBeNull();
});
