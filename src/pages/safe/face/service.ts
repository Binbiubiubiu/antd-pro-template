// import requestquest from '@/utils/request';
import { PeopleFaceListSearch } from './data.d';

export async function queryVideos(data?: Pageable<PeopleFaceListSearch>) {
  return [
    {
      id: 1,
      carCode: '学校东门',
      houseName: '宏越艺术培训学校',
      pic: require('@/assets/face/1.jpeg'),
      happenTime: '2019-12-30 01:09:13',
    },
    {
      id: 2,
      carCode: '学校东门',
      houseName: '宏越艺术培训学校',
      pic: require('@/assets/face/2.jpeg'),
      happenTime: '2019-12-29 21:24:09',
    },
    {
      id: 3,
      carCode: '学校东门',
      houseName: '宏越艺术培训学校',
      pic: require('@/assets/face/3.jpeg'),
      happenTime: '2019-12-29 18:30:54',
    },
    {
      id: 4,
      carCode: '学校东门',
      houseName: '宏越艺术培训学校',
      pic: require('@/assets/face/4.jpeg'),
      happenTime: '2019-12-29 18:03:19',
    },
    {
      id: 5,
      carCode: '学校东门',
      houseName: '宏越艺术培训学校',
      pic: require('@/assets/face/5.jpeg'),
      happenTime: '2019-12-29 17:44:10',
    },
    {
      id: 6,
      carCode: '学校东门',
      houseName: '宏越艺术培训学校',
      pic: require('@/assets/face/6.jpeg'),
      happenTime: '2019-12-29 17:20:47',
    },
    {
      id: 7,
      carCode: '学校东门',
      houseName: '宏越艺术培训学校',
      pic: require('@/assets/face/7.jpeg'),
      happenTime: '2019-12-29 17:14:20',
    },
    {
      id: 8,
      carCode: '学校东门',
      houseName: '宏越艺术培训学校',
      pic: require('@/assets/face/8.jpeg'),
      happenTime: '2019-12-29 17:14:18',
    },
  ];
  // return request('/api/fake_list', {
  //   params,
  // });
}
