export const routes = [
  {
    path: '/',
    redirect: '/channel/general'
  },
  {
    path: '/:chat/:name',
    component: () => import('@/pages/chats/ui/index.vue')
  }
  // {
  //   path: '/dm/:user',
  //   name: 'dm',
  //   component: () => import('@/pages/DMPage.vue')
  // }
];
