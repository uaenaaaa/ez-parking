<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let response = data as unknown as {
        fileData: string;
        contentType: string;
    };
    let blobUrl: string = $state('');

    $effect(() => {
        if (response.fileData && response.contentType) {
            const binary = atob(response.fileData);
            const array = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                array[i] = binary.charCodeAt(i);
            }
            const blob = new Blob([array], { type: response.contentType });
            blobUrl = URL.createObjectURL(blob);
        }

        return () => {
            if (blobUrl) URL.revokeObjectURL(blobUrl);
        };
    });
</script>

{#if blobUrl}
    {#if response.contentType.startsWith('image/')}
        <img src={blobUrl} alt="Document" class="w-full" />
    {:else if response.contentType === 'application/pdf'}
        <embed
            src={blobUrl}
            type="application/pdf"
            width="100%"
            height="800px"
        />
    {:else}
        <a href={blobUrl} download>Download Document</a>
    {/if}
{/if}
