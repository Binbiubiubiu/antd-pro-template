interface RoleModal {
  id: number;
  name: string;
  moduleId: number;
  moduleList: string;
}

interface RoleListItem extends RoleModal {
  count: number;
}

interface RoleListForm extends Partial<RoleModal> {}
