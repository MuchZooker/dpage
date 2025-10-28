import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashBoard from '../views/DashBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: DashBoard,
      component: () => import('../views/OrderTemplatesView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    // 订单相关路由
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue'),
    },
    {
      path: '/my-orders',
      name: 'my-orders',
      component: () => import('../views/MyOrdersView.vue'),
    },
    {
      path: '/order-templates',
      name: 'order-templates',
      component: () => import('../views/OrderTemplatesView.vue'),
    },
    // 库存相关路由
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('../views/InventoryView.vue'),
    },
    {
      path: '/my-inventory',
      name: 'my-inventory',
      component: () => import('../views/MyInventoryView.vue'),
    },
  ],
})

export default router
