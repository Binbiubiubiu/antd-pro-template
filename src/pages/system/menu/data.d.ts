interface MenuItem {
  id: number;
  parentId: number;
  moduleName: string;
  name: string;
  path: string;
  icon: string;
  sort: number;
}

interface MenuTableItem extends MenuItem {
  children: MenuTableItem[];
}

interface MenuTableForm extends Partial<MenuItem> {
  newParentId?: number;
}
