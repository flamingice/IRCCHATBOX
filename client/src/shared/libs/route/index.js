import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/shared/constants/routes';

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
