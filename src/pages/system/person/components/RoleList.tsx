import React, {FC, useEffect, useState} from 'react';
import {Button, Card, List, Typography} from "antd";
import {RoleListItem} from "@/pages/system/person/data";
import {queryRole} from "@/pages/system/person/service";

interface RoleListProps {

}

const RoleList: FC<RoleListProps> = props => {
  const [roleData, setRoleData] = useState<RoleListItem[]>([]);
  useEffect(() => {
    queryRole()
      .then((res) => {
        const {data = []} =res;
        setRoleData(data);
      })
  }, []);

  return (
    <>
      <Card bordered={false} style={{marginBottom: 24}} loading={false}>
        <List
          header={<Typography.Title level={4}>角色</Typography.Title>}
          dataSource={roleData}
          renderItem={item => (
            <List.Item
              actions={[<Button icon="edit" type="link"></Button>, <Button icon="delete" type="link"></Button>]}>
              <List.Item.Meta
                title={`${item.name}(${item.count})`}
              />
              {/*<Typography.Text mark>{item.name}</Typography.Text>*/}
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}

export default RoleList;
