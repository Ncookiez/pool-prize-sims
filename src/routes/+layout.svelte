<script lang="ts">

	// Imports:
	import Footer from '$lib/Footer.svelte';
	import '../app.css';
	
</script>

<!-- #################################################################################################### -->

<!-- App Content -->
<main><slot /></main>

<!-- Footer -->
<Footer />

<!-- #################################################################################################### -->

<style>

	main {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em 1em 5em;
	}

</style>