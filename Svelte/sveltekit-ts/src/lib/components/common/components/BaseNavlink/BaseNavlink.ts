import type { IDropdownItemProps } from "../BaseDropdown/DropdownItem/DropdownItem";

export interface IBaseNavlinkProps {
    title: string;
    href: string;
    func?: () => void;
    sublinks?: IDropdownItemProps[];
    needsAuth?: boolean;
}