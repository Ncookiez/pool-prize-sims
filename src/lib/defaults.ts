
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
    1: 1524,
    2: null,
    4: null,
    8: null,
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
    1: 500,
    2: null,
    4: null,
    8: null,
    16: null,
    32: null,
    64: null,
    128: null,
    256: null,
    512: null,
    1024: null,
    2048: 0.5,
    4096: null,
    8192: null
  },
  avax: {
    1: 500,
    2: null,
    4: null,
    8: null,
    16: null,
    32: null,
    64: null,
    128: null,
    256: null,
    512: 2,
    1024: null,
    2048: null,
    4096: null,
    8192: null
  },
  op: {
    1: 500,
    2: null,
    4: null,
    8: null,
    16: null,
    32: null,
    64: null,
    128: null,
    256: null,
    512: 2,
    1024: null,
    2048: null,
    4096: null,
    8192: null
  }
}