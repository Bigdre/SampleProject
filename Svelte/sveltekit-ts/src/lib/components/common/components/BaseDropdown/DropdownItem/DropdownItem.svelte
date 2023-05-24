<script lang="ts">
	import BaseButton from '$lib/components/common/components/BaseButton/BaseButton.svelte';
	import { dropdownLinkProps } from '../BaseDropdown';
	import type { IDropdownItemProps } from './DropdownItem';

	export let props: IDropdownItemProps;
</script>

{#if props.isVisible}
	<li>
		<BaseButton props={{ ...dropdownLinkProps, href: props.href }}>{props.value}</BaseButton>
	</li>
{/if}
