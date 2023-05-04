export enum ButtonVariants {
    Primary,
    Secondary,
    Success,
    Danger,
    Warning,
    Info,
    Light,
    Dark,
    Link
}

export enum ButtonSizes {
    Large,
    Medium,
    Small
}

export enum ButtonTypes {
    Link,
    Button,
    Input,
    Submit,
    Reset
}

export enum ButtonToggle {
    Inactive,
    Active
}

export interface IBaseButtonProps {
    variant: ButtonVariants,
    size: ButtonSizes,
    type: ButtonTypes,
    toggle: ButtonToggle | undefined,
    isOutline: boolean,
    isDisabled: boolean,
    customCss: string | undefined,
    href: string | undefined,
}

export function GetVariant(props: IBaseButtonProps): string {
    let type = props.isOutline ? "btn-outline" : "btn";

    switch (props.variant) {
        case ButtonVariants.Primary: return `${type}-primary`;
        case ButtonVariants.Secondary: return `${type}-secondary`;
        case ButtonVariants.Success: return `${type}-success`;
        case ButtonVariants.Danger: return `${type}-danger`;
        case ButtonVariants.Warning: return `${type}-warning`;
        case ButtonVariants.Info: return `${type}-info`;
        case ButtonVariants.Light: return `${type}-light`;
        case ButtonVariants.Dark: return `${type}-dark`;
        case ButtonVariants.Link: return `${type}-link`;
        default: return "";
    }
}

export function GetSize(props: IBaseButtonProps) {
    switch (props.size) {
        case ButtonSizes.Large: return "btn-lg";
        case ButtonSizes.Medium: return "";
        case ButtonSizes.Small: return "btn-sm";
        default: return "";
    }
}

export function GetCssClass(props: IBaseButtonProps): string {
    return `btn ${GetVariant(props)} ${GetSize(props)}`;
}