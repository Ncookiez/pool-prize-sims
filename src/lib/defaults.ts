
// Type Imports:
import type { Chain, PrizeDistribution } from '$lib/types';

/* ========================================================================================================================================================================= */

// Default TVL:
export const defaultTVL: number = 50_000_000;

// Default Yield Rate:
export const defaultRate: number = 2;

// Default Chain:
export const defaultChain: Chain = 'eth';

/* ========================================================================================================================================================================= */

// Default Distributions:
export const defaultDistributions: Record<Chain, PrizeDistribution> = {
  eth: {
    1: 1000,
    2: undefined,
    4: undefined,
    8: 400,
    16: undefined,
    32: undefined,
    64: undefined,
    128: undefined,
    256: undefined,
    512: undefined,
    1024: undefined,
    2048: undefined,
    4096: undefined,
    8192: undefined
  },
  poly: {
    1: 1000,
    2: undefined,
    4: 8,
    8: undefined,
    16: undefined,
    32: 5,
    64: 5,
    128: 5,
    256: undefined,
    512: undefined,
    1024: undefined,
    2048: 1,
    4096: undefined,
    8192: undefined
  },
  avax: {
    1: 1000,
    2: undefined,
    4: undefined,
    8: undefined,
    16: undefined,
    32: 20,
    64: undefined,
    128: undefined,
    256: undefined,
    512: 5,
    1024: undefined,
    2048: undefined,
    4096: undefined,
    8192: undefined
  },
  op: {
    1: 1000,
    2: undefined,
    4: undefined,
    8: undefined,
    16: undefined,
    32: 20,
    64: undefined,
    128: undefined,
    256: undefined,
    512: 5,
    1024: undefined,
    2048: undefined,
    4096: undefined,
    8192: undefined
  }
}