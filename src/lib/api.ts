
// Type Imports:
import type { Chain, BalanceData, APIResponse } from '$lib/types';

// Initializations:
const apiURL = 'https://pooltogether-stats.web.app';
const pageSize = 20000;

/* ========================================================================================================================================================================= */

// Function to fetch balances data:
export const fetchBalances = async (chain: Chain) => {

  // Initializations:
  const balances: BalanceData[] = [];
  let hasNextPage = false;
  let currentPage = 0;

  // Fetching Balances:
  try {
    do {
      const apiResponse: APIResponse = await fetch(`${apiURL}/${chain}/balances?page=${currentPage++}&pageSize=${pageSize}`).then(response => response.json());
      balances.push(...apiResponse.data);
      hasNextPage = apiResponse.hasNextPage;
    } while(hasNextPage);
  } catch {
    throw new Error(`Error querying ${chain.toUpperCase()} balances.`);
  }

  return balances.filter(player => player.balance > 0);
}