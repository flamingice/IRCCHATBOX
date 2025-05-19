export const routes = [
  {
    path: '/',
    redirect: '/channel/general'
  },
  {
    path: '/channel/:name',
    component: () => import('@/pages/ChannelPage.vue')
  },
  {
    path: '/dm/:user',
    name: 'dm',
    component: () => import('@/pages/DMPage.vue')
  }
];
