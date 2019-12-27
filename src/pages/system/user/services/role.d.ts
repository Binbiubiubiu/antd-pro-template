export interface RoleModal {
  id: number;
  name: string;
  moduleId: number;
  moduleList: string;
}

export interface RoleListItem extends RoleModal {
  count: number;
}

export interface RoleListForm extends Partial<RoleModal> {}
