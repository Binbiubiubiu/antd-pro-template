export interface MenuItem {
  id: number;
  parentId: number;
  moduleName: string;
  name: string;
  path: string;
  icon: string;
  sort: number;
}

export interface MenuTableItem extends MenuItem {
  children: MenuTableItem[];
}

export interface MenuTableForm extends Partial<MenuItem> {
  newParentId?: number;
}
