export function getFakeList() {
  const FakeList = {
    data: {
      records: [
        {
          id: 1,
          houseName: '测试房子名称',
          housePhone: '测试物业手机号',
          address: '测试房屋地址',
          phone: '测试手机号',
          manager: '牛散',
          creator: '张三',
          createTime: '2019-11-01  18:50:08',
        },
      ],
      total: 20,
    },
  };

  return FakeList;
}

export default {
  'GET  /api/fake_list': getFakeList,
  // 支持值为 Object 和 Array
  'GET  /api/currentUser': {},
};
