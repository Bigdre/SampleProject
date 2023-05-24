<script lang="ts">
	import {
		type IBaseButtonProps,
		ButtonVariants,
		ButtonSizes,
		ButtonTags,
		ButtonToggle
	} from '$lib/components/common/components/BaseButton/BaseButton';
	import BaseButton from '$lib/components/common/components/BaseButton/BaseButton.svelte';

	import {
		type IBaseDropdownProps,
		DropdownVariant,
		DropDirection
	} from '$lib/components/common/components/BaseDropdown/BaseDropdown';
	import BaseDropdown from '$lib/components/common/components/BaseDropdown/BaseDropdown.svelte';

	const props: IBaseButtonProps = {
		variant: ButtonVariants.Primary,
		size: ButtonSizes.Medium,
		tag: ButtonTags.Button,
		isOutline: false,
		isDisabled: false,
		toggle: ButtonToggle.Inactive
	};
	const dropdownProps: IBaseDropdownProps = {
		variant: DropdownVariant.Single,
		direction: DropDirection.Down,
		isSplit: false,
		label: 'links',
		items: [
			{ value: 'sublink1', href: '/dashboard', isVisible: true, isSelected: true },
			{ value: 'sublink2', href: '/test', isVisible: true, isSelected: false },
			{ value: 'sublink3', href: '/settings', isVisible: false, isSelected: false }
		]
	};
</script>

<BaseButton {props}>Test</BaseButton>
<BaseButton props={{ ...props, tag: ButtonTags.Input, isOutline: true }} />
<BaseDropdown props={dropdownProps} />
