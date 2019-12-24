export function getFakeList() {
  const FakeList = {
    data: {
      records: [
        {
          id: 1,
          houseName: '测试房子名称',
          content: '测试房屋内容',
          type: '投诉',
          state: '未回复',
          createMan: '张三',
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
