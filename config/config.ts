import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2'; // import themePluginConfig from './themePluginConfig';

const { pwa, title } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env; // const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: false,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // if (isAntDesignProPreview) {
//   // 针对 preview.pro.ant.design 的 GA 统计代码
//   plugins.push([
//     'umi-plugin-ga',
//     {
//       code: 'UA-72788897-6',
//     },
//   ]);
//   plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
// }

export default {
  plugins,
  extraBabelIncludes: [/node_modules[\\/][\\@]uform[\\/]antd[\\/]esm/],
  // history: 'hash',
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: '登录',
          path: '/user/login',
          component: './user/login',
        },
        // {
        //   name: 'register-result',
        //   icon: 'smile',
        //   path: '/user/register-result',
        //   component: './user/register-result',
        // },
        // {
        //   name: 'register',
        //   icon: 'smile',
        //   path: '/user/register',
        //   component: './user/register',
        // },
        {
          component: './exception/404',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/community/suggest', // authority: ['admin', 'user'],
            },
            // {
            //   path: '/dashboard',
            //   name: 'dashboard',
            //   icon: 'dashboard',
            //   routes: [
            //     {
            //       name: 'alarm',
            //       icon: 'smile',
            //       path: '/dashboard/alarm',
            //       component: './dashboard/alarm',
            //     },
            //     {
            //       name: 'monitor',
            //       icon: 'smile',
            //       path: '/dashboard/monitor',
            //       component: './dashboard/monitor',
            //     },
            //     {
            //       name: 'workplace',
            //       icon: 'smile',
            //       path: '/dashboard/workplace',
            //       component: './dashboard/workplace',
            //     },
            //   ],
            // },
            // {
            //   path: '/form',
            //   icon: 'form',
            //   name: 'form',
            //   routes: [
            //     {
            //       name: 'basic-data-form',
            //       icon: 'smile',
            //       path: '/form/basic-data-form',
            //       component: './form/basic-data-form',
            //     },
            //     {
            //       name: 'step-form',
            //       icon: 'smile',
            //       path: '/form/step-form',
            //       component: './form/step-form',
            //     },
            //     {
            //       name: 'advanced-form',
            //       icon: 'smile',
            //       path: '/form/advanced-form',
            //       component: './form/advanced-form',
            //     },
            //   ],
            // },
            // {
            //   path: '/list',
            //   icon: 'table',
            //   name: 'list',
            //   routes: [
            //     {
            //       path: '/list/search',
            //       name: 'search-list',
            //       component: './list/search',
            //       routes: [
            //         {
            //           path: '/list/search',
            //           redirect: '/list/search/articles',
            //         },
            //         {
            //           name: 'articles',
            //           icon: 'smile',
            //           path: '/list/search/articles',
            //           component: './list/search/articles',
            //         },
            //         {
            //           name: 'projects',
            //           icon: 'smile',
            //           path: '/list/search/projects',
            //           component: './list/search/projects',
            //         },
            //         {
            //           name: 'applications',
            //           icon: 'smile',
            //           path: '/list/search/applications',
            //           component: './list/search/applications',
            //         },
            //       ],
            //     },
            //     {
            //       name: 'table-list',
            //       icon: 'smile',
            //       path: '/list/table-list',
            //       component: './list/table-list',
            //     },
            //     {
            //       name: 'basic-data-list',
            //       icon: 'smile',
            //       path: '/list/basic-data-list',
            //       component: './list/basic-data-list',
            //     },
            //     {
            //       name: 'card-list',
            //       icon: 'smile',
            //       path: '/list/card-list',
            //       component: './list/card-list',
            //     },
            //     {
            //       name: '查询表格',
            //       icon: 'smile',
            //       path: '/list/listtablelist',
            //       component: './ListTableList',
            //     },
            //   ],
            // },
            // {
            //   path: '/profile',
            //   name: 'profile',
            //   icon: 'profile',
            //   routes: [
            //     {
            //       name: 'basic-data',
            //       icon: 'smile',
            //       path: '/profile/basic-data',
            //       component: './profile/basic-data',
            //     },
            //     {
            //       name: 'advanced',
            //       icon: 'smile',
            //       path: '/profile/advanced',
            //       component: './profile/advanced',
            //     },
            //   ],
            // },
            // {
            //   name: 'account',
            //   icon: 'user',
            //   path: '/account',
            //   routes: [
            //     {
            //       name: 'center',
            //       icon: 'smile',
            //       path: '/account/center',
            //       component: './account/center',
            //     },
            //     {
            //       name: 'settings',
            //       icon: 'smile',
            //       path: '/account/settings',
            //       component: './account/settings',
            //     },
            //   ],
            // },
            {
              name: '社区服务',
              icon: 'home',
              path: '/community',
              routes: [
                {
                  name: '投诉建议',
                  path: '/community/suggest',
                  component: './community/suggest',
                },
                {
                  name: '小区管理',
                  path: '/community/village',
                  component: './community/village',
                },
                {
                  name: '基础档案',
                  path: '/community/basic-data',
                  component: './community/basic-data',
                },
                {
                  name: '访客管理',
                  path: '/community/visitor',
                  component: './community/visitor',
                },
                {
                  name: '公告管理',
                  path: '/community/notice',
                  component: './community/notice',
                },
                {
                  name: '新增公告',
                  path: '/community/notice/form',
                  component: './community/notice/NoticeForm',
                },
                {
                  name: '报修管理',
                  path: '/community/repair',
                  component: './community/repair',
                },
                {
                  name: '投票管理',
                  path: '/community/poll',
                  component: './community/poll',
                },
                {
                  name: '发起投票',
                  path: '/community/poll/form',
                  component: './community/poll/PollForm',
                },
                {
                  name: '投票详情',
                  path: '/community/poll/info',
                  component: './community/poll/PollInfo',
                },
                {
                  name: '业委会管理',
                  path: '/community/industry',
                  component: './community/industry',
                },
                {
                  component: './exception/404',
                },
              ],
            },
            {
              name: '安防管理',
              icon: 'alert',
              path: '/safe',
              routes: [
                {
                  name: '视频管理',
                  path: '/safe/video',
                  component: './safe/video',
                },
                {
                  name: '出入记录',
                  path: '/safe/in-and-out',
                  component: './safe/in-and-out',
                },
                {
                  name: '人脸识别',
                  path: '/safe/face',
                  component: './safe/face',
                },
                {
                  component: './exception/404',
                },
              ],
            },
            {
              name: '消防管理',
              icon: 'fire',
              path: '/fire',
              routes: [
                {
                  name: '报警统计',
                  path: '/fire/alarm',
                  component: './fire/alarm',
                },
                {
                  name: '巡更统计',
                  path: '/fire/patrol',
                  component: './fire/patrol',
                },
                {
                  component: './exception/404',
                },
              ],
            },
            {
              name: '系统设置',
              icon: 'setting',
              path: '/system',
              routes: [
                {
                  name: '人员管理',
                  path: '/system/user',
                  component: './system/user',
                },
                {
                  name: '菜单管理',
                  path: '/system/menu',
                  component: './system/menu',
                },
                {
                  name: '操作日志',
                  path: '/system/log',
                  component: './system/log',
                },
                {
                  component: './exception/404',
                },
              ],
            },
            {
              component: './exception/404',
            },
          ],
        },
        {
          component: './exception/404',
        },
      ],
    },
    {
      component: './exception/404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    'process.env.WEBSITE_NAME': title,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  // chainWebpack: webpackPlugin,
  proxy: {
    '/csp': {
      target: `http://192.168.1.142:8080`, // 高阔ip
      // target: `http://192.168.1.109:8080`,
      // target: `http://120.26.92.123:21081/`,
      changeOrigin: true, // pathRewrite: { '^/isc': '/isc' },
    },
  },
} as IConfig;
