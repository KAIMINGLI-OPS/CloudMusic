
export default {
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/center/centerAll')
    }
  ]
}
