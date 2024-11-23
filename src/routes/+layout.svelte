<script lang="ts">
	import '../app.css';
	let { children } = $props();
	console.log('Hello World from +layout.svelte');
</script>

{@render children()}
