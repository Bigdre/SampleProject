<script lang="ts">
	import BaseButton from '$lib/components/common/components/BaseButton/BaseButton.svelte';

	import type { IBaseDropdownProps } from './BaseDropdown';
	import { buttonProps, dropdownLinkProps } from './BaseDropdown';

	export let props: IBaseDropdownProps;
</script>

<div class={props.variant}>
	<!-- BUTTON COMPONENT GOES HERE -->
	{#if '' === ''}
		<BaseButton props={buttonProps}>{props.label}</BaseButton>
	{:else if '' === ''}
		<BaseButton props={buttonProps}>{props.label}</BaseButton>
	{/if}
	<ul class="dropdown-menu">
		<!-- THIS NEEDS TO BE PASSED A LIST -->
		{#each props.items as item}
			<li>
				<BaseButton props={{ ...dropdownLinkProps, href: item.href }}>{item.label}</BaseButton>
			</li>
		{/each}
	</ul>
</div>
