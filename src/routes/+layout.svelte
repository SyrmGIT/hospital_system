<script lang="ts">
	import '$lib/scss/style.scss';
	import '$lib/scss/global.scss';
	import '$lib/scss/panel.scss';
	import '$lib/scss/grid.scss';
	import Navbar from '$lib/components/navbar.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Navbar/>
<slot />
