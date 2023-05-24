<!-- BaseButton.svelte -->
<script lang="ts">
	import type { IBaseButtonProps } from './BaseButton';
	import { ButtonTags, GetCssClass } from './BaseButton';

	export let props: IBaseButtonProps;
</script>

{#if props.tag === ButtonTags.Link}
	<a
		class={GetCssClass(props)}
		href={props.href}
		role="button"
		data-bs-toggle={props.dataBsToggle}
		on:click><slot /></a
	>
{:else if props.tag === ButtonTags.Button}
	<button
		class={GetCssClass(props)}
		type="submit"
		data-bs-toggle={props.dataBsToggle}
		aria-expanded={props.ariaExpanded}
		on:click><slot /></button
	>
{:else if props.tag === ButtonTags.Input}
	<input
		class={GetCssClass(props)}
		type="button"
		value="Input"
		data-bs-toggle={props.dataBsToggle}
		aria-expanded={props.ariaExpanded}
		on:click
	/>
{:else if props.tag === ButtonTags.Submit}
	<input
		class={GetCssClass(props)}
		type="submit"
		value="Submit"
		data-bs-toggle={props.dataBsToggle}
		aria-expanded={props.ariaExpanded}
		on:click
	/>
{:else if props.tag === ButtonTags.Reset}
	<input
		class={GetCssClass(props)}
		type="reset"
		value="Reset"
		data-bs-toggle={props.dataBsToggle}
		aria-expanded={props.ariaExpanded}
		on:click
	/>
{/if}

<style>
	.link-button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		text-decoration: none;
		color: rgb(8, 226, 0);
		font: inherit;
		padding: 8px 16px;
		margin-bottom: 10px;
	}
	.link-button:hover {
		background-color: #555;
		cursor: pointer;
	}

	.nav-link-button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		text-decoration: none;
		color: white;
		font: inherit;
		padding: 8px 16px;
		margin-bottom: 10px;
	}
	.nav-link-button:hover {
		background-color: #555;
		cursor: pointer;
	}
</style>
