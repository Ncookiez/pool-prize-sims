
// Chain Type:
export type Chain = 'eth' | 'poly' | 'avax' | 'op';

// Prize Count Type:
export type PrizeCount = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192;

// Prize Distribution Type:
export type PrizeDistribution = Record<PrizeCount, number | undefined>;

// API Balances Response Type:
export type APIResponse = Balances & { page: number, hasNextPage: boolean };

/* ========================================================================================================================================================================= */

// Balances Interface:
export interface Balances {
  lastQueriedBlock: number
  timestamp: number | undefined
  data: BalanceData[]
}

// Balance Data Interface:
export interface BalanceData {
  wallet: string
  balance: number
}