import { createRouter, createWebHistory } from 'vue-router'

import ChannelPage from '@/pages/ChannelPage.vue'
import DMPage from '@/pages/DMPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/channel/general'
    },
    {
        path: '/channel/:name',
        component: ChannelPage
    },
    {
        path: '/dm/:user',
        name: 'dm',
        component: () => import('@/pages/DMPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
