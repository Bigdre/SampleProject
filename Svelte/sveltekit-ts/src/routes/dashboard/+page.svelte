<script lang="ts">
	import {
		type IBaseButtonProps,
		ButtonVariants,
		ButtonSizes,
		ButtonTypes
	} from '$lib/components/common/components/BaseButton';
	import BaseButton from '$lib/components/common/components/BaseButton.svelte';

	const props: IBaseButtonProps = {
		variant: ButtonVariants.Primary,
		size: ButtonSizes.Medium,
		type: ButtonTypes.Button,
		isOutline: false,
		isDisabled: false,
		toggle: undefined,
		customCss: undefined,
		href: undefined
	};
</script>

<BaseButton {props}>Test</BaseButton>
<BaseButton props={{ ...props, type: ButtonTypes.Input, isOutline: true }} />
