// BaseButton.ts

/**
 *  @param Primary 'primary'
    @param Secondary 'secondary'
    @param Success 'success'
    @param Danger 'danger'
    @param Warning 'warning'
    @param Info 'info'
    @param Light 'light'
    @param Dark 'dark'
    @param Link 'link'
 */
export enum ButtonVariants {
    Primary = 'primary',
    Secondary = 'secondary',
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning',
    Info = 'info',
    Light = 'light',
    Dark = 'dark',
    Link = 'link'
}

/**
 *  @param Large 'btn-lg'
    @param Medium ''
    @param Small 'btn-sm'
 */
export enum ButtonSizes {
    Large = 'btn-lg',
    Medium = '',
    Small = 'btn-sm'
}

/**
 * This value is chosen to select the button tag element to be generated
 *  @param Link 
    @param Button 
    @param Input 
    @param Submit 
    @param Input 
 */
export enum ButtonTags {
    Link,
    Button,
    Input,
    Submit,
    Reset
}


/**
 *  @param Inactive ''
    @param Active 'active'
 */
export enum ButtonToggle {
    Inactive = '',
    Active = 'active',
}

/**
 *  @param variant ButtonVariants
    @param size ButtonSizes
    @param tag ButtonTags
    @param isOutline boolean
    @param isDisabled boolean
    @param toggle? ButtonToggle | undefined
    @param customClasses? string | undefined
    @param id? string | undefined
    @param href? string | undefined
    @param dataBsToggle? string | undefined
    @param ariaExpanded? boolean | undefined
 */
export interface IBaseButtonProps {
    variant: ButtonVariants,
    size: ButtonSizes,
    tag: ButtonTags,
    isOutline: boolean,
    isDisabled: boolean,
    toggle?: ButtonToggle | undefined,
    customClasses?: string | undefined,
    id?: string | undefined,
    href?: string | undefined,
    dataBsToggle?: string | undefined,
    ariaExpanded?: boolean | undefined,
}

/**
 * 
 * @param props 
 * @returns `btn ${outline}-${variant} ${size} ${toggle} ${disabled} ${customClasses ?? ''} `
 */
export function GetCssClass(props: IBaseButtonProps): string {
    let { variant, size, toggle, isOutline, isDisabled, customClasses } = props;
    let outline = isOutline ? "btn-outline" : "btn";
    let disabled = isDisabled ? "disabled" : "";
    return `btn ${outline}-${variant} ${size} ${toggle} ${disabled} ${customClasses ?? ''} `;
}