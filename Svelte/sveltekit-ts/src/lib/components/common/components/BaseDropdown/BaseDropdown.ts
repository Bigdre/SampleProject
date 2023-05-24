import {
    type IBaseButtonProps,
    ButtonVariants,
    ButtonSizes,
    ButtonTags,
    ButtonToggle
} from '$lib/components/common/components/BaseButton/BaseButton';

/**
 *  @param variant ButtonVariants.Primary
    @param size ButtonSizes.Medium
    @param tag ButtonTags.Button
    @param isOutline false
    @param isDisabled false
    @param toggle ButtonToggle.Inactive
    @param customClasses 'dropdown-toggle'
    @param dataBsToggle 'dropdown'
    @param ariaExpanded false
 */
export const buttonProps: IBaseButtonProps = {
    variant: ButtonVariants.Primary,
    size: ButtonSizes.Medium,
    tag: ButtonTags.Button,
    isOutline: false,
    isDisabled: false,
    toggle: ButtonToggle.Inactive,
    customClasses: 'dropdown-toggle',
    dataBsToggle: 'dropdown',
    ariaExpanded: false
};

/**
 *  @param variant ButtonVariants.Link
    @param size ButtonSizes.Medium
    @param tag ButtonTags.Link
    @param isOutline false
    @param isDisabled false
    @param toggle ButtonToggle.Inactive
    @param customClasses 'dropdown-item
 */
export const dropdownLinkProps: IBaseButtonProps = {
    variant: ButtonVariants.Link,
    size: ButtonSizes.Medium,
    tag: ButtonTags.Link,
    isOutline: false,
    isDisabled: false,
    toggle: ButtonToggle.Inactive,
    customClasses: 'dropdown-item'
};

/**
 * @param Single 'dropdown'
    @param Group 'btn-group'
    @param Center 'dropdown-center'
 */
export enum DropdownVariant {
    Single = 'dropdown',
    Group = 'btn-group',
    Center = 'dropdown-center',

}

/**
     * @param Up 'dropup'
     * @param Down ''
     * @param Left 'dropstart'
     * @param Right 'dropend'
     */
export enum DropDirection {
    Up = 'dropup',
    Down = '',
    Left = 'dropstart',
    Right = 'dropend'

}

/**
     * @param variant DropdownVariant
     * @param direction DropDirection
     * @param isSplit boolean
     * @param label string
     * @param items Record<string, string>
     */
export interface IBaseDropdownProps {
    
    variant: DropdownVariant,
    direction: DropDirection,
    isSplit: boolean,
    label: string,
    items: Record<string, string>
}


// let { variant, direction, isSplit, label} = props;
// let split = isSplit ? "dropdown-toggle-split" : "";
