import { IconDefinition } from "@fortawesome/fontawesome-common-types";

export type SidebarItems = SidebarItem[];

export interface SidebarItem {
  name: string;
  icon: IconDefinition | string;
  routerLink: string;
}
