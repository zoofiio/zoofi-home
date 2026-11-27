import { useQuery } from '@tanstack/react-query';
import { ArrowIcon } from './ArrowIcon';

export async function fetchLiquidity(): Promise<number> {
  const response = await fetch('https://api.llama.fi/tvl/zoo-finance', {
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error('Protocol data is unavailable');
  const value: unknown = await response.json();
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new Error('Invalid protocol value');
  }
  return value;
}

export function LiquidityMetric() {
  const query = useQuery({
    queryKey: ['zoo', 'homepage', 'defillama-tvl'],
    queryFn: fetchLiquidity,
    staleTime: 5 * 60_000,
    gcTime: 60 * 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const parts = query.data?.toLocaleString('en-US', {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).split('.');

  return (
    <div className="zoo-metric-value" aria-live="polite" aria-busy={query.isFetching}>
      <strong data-testid="landing-liquidity">
        {parts ? <>${parts[0]}<span>.{parts[1]}</span></> : query.isPending ? 'Loading…' : 'Unavailable'}
      </strong>
      <div className="zoo-data-source">
        <span className="zoo-source-dot" />
        {query.data !== undefined && <span>
          {query.isError ? 'Last available · ' : 'Retrieved · '}
          {new Date(query.dataUpdatedAt).toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
          })}
        </span>}
        {query.isError && query.data === undefined && <span>Could not load protocol data.</span>}
        <a href="https://defillama.com/protocol/zoo-finance" target="_blank" rel="noopener noreferrer">DefiLlama <ArrowIcon /></a>
        <button type="button" disabled={query.isFetching} onClick={() => void query.refetch()}>
          {query.isFetching ? 'Updating…' : query.isError ? 'Retry' : 'Refresh'}
        </button>
      </div>
    </div>
  );
}
