// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ZooLanding from './ZooLanding';
import { fetchLiquidity } from './LiquidityMetric';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('Zoo homepage integration', () => {
  function mount() {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    client.setQueryData(['zoo', 'homepage', 'defillama-tvl'], 12345.67);
    return render(<QueryClientProvider client={client}><ZooLanding /></QueryClientProvider>);
  }

  it('connects the approved homepage to the local app, products and docs', () => {
    const view = mount();
    const app = 'https://app.zoofi.io';
    expect(view.getAllByRole('link', { name: /Launch App/i }).every(
      link => link.getAttribute('href') === app && !link.hasAttribute('target'),
    )).toBe(true);
    const products = within(view.container.querySelector<HTMLElement>('#products')!);
    const links = products.getAllByRole('link');
    expect(links).toEqual([products.getByRole('link', { name: 'Explore Vaults' })]);
    expect(links[0].getAttribute('href')).toBe(app);
    expect(links[0].closest('.zoo-product-foot')).not.toBeNull();
    expect(view.getByRole('link', { name: /Read Docs/ }).getAttribute('href')).toBe('https://docs.zoofi.io');
    expect(view.getByTestId('landing-liquidity').textContent).toBe('$12,345.67');
    expect(view.container.querySelector('[src*="__mockup"]')).toBeNull();
  });

  it('draws arrows as decorative SVGs instead of platform-dependent emoji', () => {
    const view = mount();
    expect(view.container.textContent).not.toMatch(/[↗→↓↑]/u);
    for (const link of view.getAllByRole('link', { name: /Launch App|Read Docs|Explore Vaults|DefiLlama|Back to top/i })) {
      const arrow = link.querySelector('svg.zoo-arrow-icon');
      expect(arrow).not.toBeNull();
      expect(arrow?.getAttribute('aria-hidden')).toBe('true');
      expect(arrow?.getAttribute('focusable')).toBe('false');
    }
    expect(view.container.querySelector('.zoo-art-output svg.zoo-arrow-icon')).not.toBeNull();
  });

  it('uses the future-value narrative without implying guaranteed liquidity', () => {
    const view = mount();
    expect(view.getByRole('heading', { level: 1 }).textContent).toBe('A market forfuture value.');
    expect(view.getByRole('heading', { name: 'Protocol Value (TVL)' })).toBeTruthy();
    expect(view.getByRole('heading', { name: 'Token Allocations' })).toBeTruthy();
    expect(view.container.textContent).not.toMatch(/\b(?:unlock\w*|locked|locking)\b/i);
    expect(view.container.textContent).toContain('Trade where markets are available');
    expect(view.container.textContent).not.toContain('Provider TVL estimate;');
  });

  it('loops the original Zoo animations with static posters and no extra disclaimer', () => {
    const view = mount();
    const videos = view.container.querySelectorAll<HTMLVideoElement>('video.zoo-step-image');
    expect(Array.from(videos, video => video.getAttribute('src'))).toEqual(
      ['define', 'tokenize', 'trade', 'redeem'].map(step => `${import.meta.env.BASE_URL}images/zoo-brand/process-${step}.mp4`),
    );
    for (const video of videos) {
      expect(video.autoplay && video.loop && video.muted && video.playsInline).toBe(true);
      expect(video.getAttribute('poster')).toBe(video.getAttribute('src')?.replace('.mp4', '.webp'));
    }
    expect(view.container.textContent).not.toContain('Markets, redemption rights and timing depend');
    expect(view.container.querySelector('.zoo-step-glyph')).toBeNull();
  });

  it('opens and dismisses mobile navigation with Escape', () => {
    const view = mount();
    fireEvent.click(view.getByRole('button', { name: 'Open navigation menu' }));
    expect(view.getByRole('button', { name: 'Close navigation menu' }).getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(view.getByRole('button', { name: 'Open navigation menu' }).getAttribute('aria-expanded')).toBe('false');
  });

  it('shows the original backers with names and no playback button', () => {
    const view = mount();
    const row = view.getByRole('region', { name: 'Investor and backer logos' });
    const backers = within(row).getAllByRole('listitem');
    expect(backers).toHaveLength(17);
    expect(backers[0].textContent).toBe('BINANCE');
    expect(backers[16].textContent).toBe('Dorahacks');
    expect(row.querySelectorAll('[aria-hidden="true"] li')).toHaveLength(17);
    expect(row.classList.contains('is-paused')).toBe(false);
    expect(view.queryByRole('button', { name: 'Pause' })).toBeNull();
    expect(view.queryByRole('button', { name: 'Play' })).toBeNull();
  });

  it('places ZSTOCK alongside the other three products without an unverified vault link', () => {
    const view = mount();
    const stockCard = view.getByRole('article', { name: 'ZSTOCK' });
    expect(within(stockCard.parentElement!).getAllByRole('article').map(card => card.getAttribute('aria-labelledby'))).toEqual([
      'product-lnt', 'product-lvt', 'product-lar', 'product-zstock',
    ]);
    const zstock = within(stockCard);
    expect(zstock.getByRole('heading', { name: 'ZSTOCK' })).toBeTruthy();
    expect(zstock.queryByText('Launch details pending')).toBeNull();
    for (const [index, card] of within(stockCard.parentElement!).getAllByRole('article').entries()) {
      expect(card.querySelector('.zoo-product-top')?.textContent).toBe(['LNT', 'LVT', 'LAR', 'ZSTOCK'][index]);
      expect(card.querySelector('.zoo-product-symbol')).toBeNull();
      expect(card.querySelector('.zoo-product-title > span')).toBeNull();
      expect(card.querySelector('.zoo-product-emblem svg')).not.toBeNull();
    }
    expect(zstock.getByText('Onchain tokens for shares that will be delivered later or cannot yet be resold.')).toBeTruthy();
    expect(zstock.queryByText(/planned vANT Vault/i)).toBeNull();
    expect(zstock.queryByRole('link')).toBeNull();
  });
});

describe('protocol metric data validation', () => {
  it.each([0, 22204470.02])('accepts the real numeric response %s', async value => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => value }));
    expect(await fetchLiquidity()).toBe(value);
  });

  it.each([-1, '123', null, { tvl: 123 }])('rejects invalid data instead of inventing a total', async value => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => value }));
    await expect(fetchLiquidity()).rejects.toThrow('Invalid protocol value');
  });

  it('surfaces source outages', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    await expect(fetchLiquidity()).rejects.toThrow('Protocol data is unavailable');
  });
});
