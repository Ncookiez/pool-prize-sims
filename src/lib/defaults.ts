
// Type Imports:
import type { Chain, PrizeDistribution } from '$lib/types';

/* ========================================================================================================================================================================= */

// Default TVL:
export const defaultTVL: number = 40_000_000;

// Default Yield Rate:
export const defaultRate: number = 0.5;

// Default Chain:
export const defaultChain: Chain = 'eth';

/* ========================================================================================================================================================================= */

// Default Distributions:
export const defaultDistributions: Record<Chain, PrizeDistribution> = {
  eth: {
    1: 200,
    2: null,
    4: null,
    8: 164,
    16: null,
    32: null,
    64: null,
    128: null,
    256: null,
    512: null,
    1024: null,
    2048: null,
    4096: null,
    8192: null
  },
  poly: {
    1: 200,
    2: 20,
    4: 20,
    8: 1,
    16: null,
    32: 1,
    64: null,
    128: 1,
    256: null,
    512: 1,
    1024: 0.5,
    2048: null,
    4096: null,
    8192: null
  },
  avax: {
    1: 200,
    2: null,
    4: 50,
    8: 5,
    16: 5,
    32: 5,
    64: 5,
    128: null,
    256: 2,
    512: null,
    1024: null,
    2048: null,
    4096: null,
    8192: null
  },
  op: {
    1: 200,
    2: null,
    4: 50,
    8: 5,
    16: 5,
    32: 5,
    64: 5,
    128: null,
    256: 2,
    512: null,
    1024: null,
    2048: null,
    4096: null,
    8192: null
  }
}