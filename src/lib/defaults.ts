
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
    2: null,
    4: null,
    8: 400,
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
    1: 1000,
    2: null,
    4: 8,
    8: null,
    16: null,
    32: 5,
    64: 5,
    128: 5,
    256: null,
    512: null,
    1024: null,
    2048: 1,
    4096: null,
    8192: null
  },
  avax: {
    1: 1000,
    2: null,
    4: null,
    8: null,
    16: null,
    32: 20,
    64: null,
    128: null,
    256: null,
    512: 5,
    1024: null,
    2048: null,
    4096: null,
    8192: null
  },
  op: {
    1: 1000,
    2: null,
    4: null,
    8: null,
    16: null,
    32: 20,
    64: null,
    128: null,
    256: null,
    512: 5,
    1024: null,
    2048: null,
    4096: null,
    8192: null
  }
}