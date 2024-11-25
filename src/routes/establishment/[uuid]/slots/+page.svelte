<script>
	import { page } from '$app/stores';

	$: uuid = $page.url.pathname.split('/')[2];
</script>

<h1>The UUID is: {uuid}</h1>
