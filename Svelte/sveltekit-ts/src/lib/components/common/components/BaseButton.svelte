<script lang="ts">
	import type { IBaseButtonProps } from './BaseButton';
	import { ButtonTypes, GetCssClass } from './BaseButton';

	export let props: IBaseButtonProps;
</script>

{#if props.type === ButtonTypes.Link}
	<a class={GetCssClass(props)} href={props.href} role="button"><slot /></a>
{:else if props.type === ButtonTypes.Button}
	<button class={GetCssClass(props)} type="submit"><slot /></button>
{:else if props.type === ButtonTypes.Input}
	<input class={GetCssClass(props)} type="button" value="Input" />
{:else if props.type === ButtonTypes.Submit}
	<input class={GetCssClass(props)} type="submit" value="Submit" />
{:else if props.type === ButtonTypes.Reset}
	<input class={GetCssClass(props)} type="reset" value="Reset" />
{/if}
