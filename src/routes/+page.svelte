<script lang="ts">

	// Imports:
	import { onMount } from 'svelte';
	import { defaultTVL, defaultRate, defaultChain, defaultDistributions } from '$lib/defaults';
	import * as api from '$lib/api';

	// Type Imports:
	import type { Chain, PrizeCount, PrizeDistribution, BalanceData } from '$lib/types';

	// Initializations:
	const balances: Record<Chain, BalanceData[]> = { eth: [], poly: [], avax: [], op: [] };
	let distributions = defaultDistributions;
	let tvl = defaultTVL;
	let rate = defaultRate;
	let chainSelected = defaultChain;
	let balancesFetched: boolean = false;

	// Basic Info:
	const chains = Object.keys(distributions) as Chain[];
	const prizeCounts = Object.keys(distributions[chains[0]]).map(key => parseInt(key)) as PrizeCount[];

	// Reactive Chain Distribution Totals:
	$: chainTotalPrizeAmount = prizeCounts.map(countKey => countKey * (distributions[chainSelected][countKey] ?? 0)).reduce((a, b) => a + b, 0);
	$: chainTotalPrizeCount = prizeCounts.map(countKey => distributions[chainSelected][countKey] ? (countKey as number) : 0).reduce((a, b) => a + b, 0);

	// Reactive Results:
	$: apr = (rate / 100 / 365) * tvl;
	$: claimable = balancesFetched ? calcExpectedClaimable(distributions) : 0;
	$: dropped = chainTotalPrizeAmount - claimable;
	$: subsidy = claimable - apr;
	$: sustainableTVL = claimable / (rate / 100 / 365);

	// Function to calculate expected claimable prize value:
	const calcExpectedClaimable = (distributions: Record<Chain, PrizeDistribution>) => {

		// Initializations:
		const maxPrizes = 1;
		let claimable = 0;

		// Calculating Claimable Prizes By Chain:
		chains.forEach(chain => {
			const dailyPrizeCount = prizeCounts.map(countKey => countKey * (distributions[chain][countKey] ?? 0)).reduce((a, b) => a + b, 0);
			balances[chain].forEach(player => {
				let cumulativeMaxPrizes = 0;
				const dailyWinProbability = (1 / (tvl / dailyPrizeCount)) * player.balance;
				prizeCounts.forEach(countKey => {
					const prize = distributions[chain][countKey];
					if(prize && prize > 0) {
						const expectedWins = Math.min(((countKey / dailyPrizeCount) * dailyWinProbability), maxPrizes - cumulativeMaxPrizes);
						claimable += expectedWins * prize;
						if(cumulativeMaxPrizes < maxPrizes) {
							cumulativeMaxPrizes = Math.min(cumulativeMaxPrizes + expectedWins, maxPrizes);
						}
					}
				});
			});
		});

		return claimable;
	}

	// Function to import distribution:
	const importDistribution = async () => {
		try {
			const content = await navigator.clipboard.readText();
			const parsedContent = JSON.parse(content);
			if(parsedContent.eth && parsedContent.poly && parsedContent.avax && parsedContent.op) {
				distributions = parsedContent;
			}
		} catch {
			console.error('Attempted to import invalid prize distribution.');
		}
	}

	// Function to export distribution:
	const exportDistribution = () => {
		navigator.clipboard.writeText(JSON.stringify(distributions));
	}

	onMount(async () => {
		let promises = chains.map(chain => (async () => {
			balances[chain] = await api.fetchBalances(chain);
		})());
		await Promise.all(promises);
		balancesFetched = true;
	});
	
</script>

<!-- #################################################################################################### -->

<!-- SvelteKit Dynamic Header -->
<svelte:head>
	<title>Prize Simulations</title>
	<meta name="description" content="Simulate different prize distributions for PoolTogether V4!" />
</svelte:head>

<!-- Header -->
<section id="header">
	<img src="/images/pooltogether-logo.svg" alt="PoolTogether">
	<h1>Prize Simulations</h1>
</section>

<!-- Distribution Inputs -->
<section id="distInputs">
	<h2>You must chooseth thy distribution!</h2>
	<i id="import" class="icofont-download" on:click={importDistribution} />
	<i id="export" class="icofont-share-alt" on:click={exportDistribution} />
	<div class="tabs">
		{#each chains as chain}
			<div class="chainTab {chain}" class:selected={chainSelected === chain} on:click={() => chainSelected = chain}>
				<img src="/images/{chain}.svg" alt="{chain}">
			</div>
		{/each}
	</div>
	<span id="line" />
	<div class="chainDist">
		{#each prizeCounts as prizeCount}
			<span class="tier">
				<label for="prizeCount{prizeCount}">{prizeCount.toLocaleString()}:</label>
				<span class="prizeInput" class:hiddenValue={distributions[chainSelected][prizeCount] === 0}>
					{#if distributions[chainSelected][prizeCount] && distributions[chainSelected][prizeCount] !== 0}
						<span>$</span>
					{/if}
					<input type="number" id="prizeCount{prizeCount}" bind:value={distributions[chainSelected][prizeCount]}>
				</span>
			</span>
		{/each}
	</div>
	<span id="line" />
	<div class="totals">
		<span class="amount"><strong>Total Prize Amount:</strong> ${chainTotalPrizeAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
		<span class="count"><strong>Total Prize Count:</strong> {chainTotalPrizeCount.toLocaleString()}</span>
	</div>
</section>

<!-- Condition Inputs -->
<section id="condInputs">
	<h2>How's the weather lately?</h2>
	<div class="tvl">
		<label for="tvlInput">TVL:</label>
		<input type="range" id="tvlInput" min={1_000_000} max={100_000_000} step={1_000_000} bind:value={tvl}>
		<span>${tvl / (10 ** 6)}M</span>
	</div>
	<div class="rate">
		<label for="rateInput">Yield Rate:</label>
		<input type="range" id="rateInput" min={0.1} max={20} step={0.1} bind:value={rate}>
		<span>{rate.toFixed(1)}%</span>
	</div>
	<span class="small">You can click on a slider and use arrow keys if you'd like :)</span>
</section>

<!-- Results -->
<section id="results">
	{#if balancesFetched}
		<div class="highlights">
			<div class="yield">
				<span>Yield Accrued</span>
				<span>${apr.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
			</div>
			<div class="claimable">
				<span>Claimable Prizes</span>
				<span>${claimable.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
			</div>
			<div class="dropped">
				<span>Dropped Prizes</span>
				<span>{((dropped / (dropped + claimable)) * 100).toLocaleString(undefined, { maximumFractionDigits: 1 })}%</span>
			</div>
			<div class="subsidy">
				<span>Subsidy</span>
				<span>{subsidy < 0 ? '-' : ''}${Math.abs(subsidy).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
			</div>
		</div>
		{#if subsidy > 0}
			<span class="tvlInfo">With these rates and distribution, we'd need to reach a TVL of <strong>${(sustainableTVL / (10 ** 6)).toLocaleString(undefined, { maximumFractionDigits: 1 })}M</strong> to be sustainable.</span>
		{/if}
	{:else}
		<div class="loading">
			<img src="/images/loading.gif" alt="Loading">
			<span>Loading...</span>
		</div>
	{/if}
</section>

<!-- #################################################################################################### -->

<style>

	section {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}

	div {
		display: flex;
	}

	span {
		display: flex;
		align-items: center;
	}

	input:focus {
		outline: none;
	}

	h2 {
		text-align: center;
	}

	#header {
		margin: 2em 0 1em;
	}
	
	#header > img {
		height: 5em;
	}

	#header > h1 {
		font-size: 3.5em;
	}

	#distInputs, #condInputs {
		position: relative;
		flex-direction: column;
		width: min(50em, 100%);
		margin: 0 auto;
		padding: 1em;
		background: var(--dark-purple);
		border: 2px solid var(--accent-color);
		border-radius: 1em;
	}

	#line {
		width: 80%;
		border-bottom: 2px solid white;
	}

	#import, #export {
		position: absolute;
		top: 1em;
		padding: .3em;
		font-size: 1.2em;
		border-radius: .5em;
		cursor: pointer;
	}

	#import:hover, #export:hover {
		background: var(--light-purple);
	}

	#import {
		right: 2.6em;
	}

	#export {
		right: 1em;
	}

	div.tabs {
		gap: .5em;
	}

	div.chainTab {
		padding: .5em 2em;
		border-radius: .5em;
		cursor: pointer;
	}

	div.chainTab.eth.selected, div.chainTab.eth:hover {
		background: #627EEA;
	}

	div.chainTab.poly.selected, div.chainTab.poly:hover {
		background: #7B3FE4;
	}

	div.chainTab.avax.selected, div.chainTab.avax:hover {
		background: #E84142;
	}

	div.chainTab.op.selected, div.chainTab.op:hover {
		background: #FF0420;
	}

	div.chainTab > img {
		height: 2em;
		user-select: none;
	}

	div.chainDist {
		flex-direction: column;
		gap: .2em;
	}

	span.tier {
		gap: 1em;
		padding: 0 1em;
		border-radius: .5em;
	}

	span.tier:hover {
		background: var(--light-purple);
	}

	span.tier > label {
		flex: 1;
		text-align: right;
	}

	span.prizeInput {
		display: flex;
		align-items: center;
		gap: .2em;
		width: 10ch;
		color: var(--secondary-color);
	}

	span.prizeInput.hiddenValue {
		color: transparent;
	}

	span.prizeInput > input {
		width: 100%;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		background: transparent;
		border: none;
	}

	div.totals {
		justify-content: center;
		gap: 1em;
		flex-wrap: wrap;
	}

	div.totals > span {
		gap: .5em;
	}

	div.totals > span.amount {
		width: 22ch;
	}

	div.totals > span.count {
		width: 20ch;
	}

	#condInputs > div {
		gap: 1em;
	}

	#condInputs > div > span {
		justify-content: center;
		width: 5ch;
	}

	#results {
		flex-direction: column;
	}

	div.highlights {
		justify-content: center;
		gap: 2em;
		flex-wrap: wrap;
		padding-top: 1em;
		font-size: 1.1em;
	}

	div.highlights > div {
		flex-direction: column;
		align-items: center;
	}

	div.highlights > div > span {
		white-space: nowrap;
	}

	div.highlights > div > span:last-of-type {
		font-size: 2em;
		color: var(--secondary-color);
	}

	span.tvlInfo {
		display: inline;
		text-align: center;
	}

	span.tvlInfo > strong {
		color: var(--secondary-color);
	}

	div.loading {
		gap: 1em;
	}

	div.loading > img {
		height: 2em;
	}

	span.small {
		text-align: center;
		font-size: .8em;
		color: grey;
	}

	@media screen and (max-width: 1280px) {
		span.small {
			display: none;
		}
	}

	@media screen and (max-width: 700px) {
		#header > h1 {
			font-size: 2em;
		}
		#distInputs {
			padding-top: 4em;
		}
	}

	@media screen and (max-width: 550px) {
		h2 {
			font-size: 1.3em;
		}
		div.chainTab {
			padding: .5em 1em;
		}
		div.chainTab > img {
			height: 1.5em;
		}
	}

	@media screen and (max-width: 450px) {
		#header > img {
			height: 3em;
		}
		#header > h1 {
			font-size: 1.5em;
		}
	}

	@media screen and (max-width: 350px) {
		#condInputs > div {
			gap: .5em;
		}
		div.chainTab {
			padding: .3em .5em;
		}
	}
	
</style>