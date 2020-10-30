
export default {
  routes: [
    {
      path:'/',
      redirect:'/home/rightstyle'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/home.vue'),
      children: [
        {
          path: 'rightanchor',
          name: 'rightanchor',
          component: () => import('../views/right/rightanchor.vue')
        },
        {
          path: 'rightlist',
          name: 'rightlist',
          component: () => import('../views/right/rightlist.vue')
        },
        {
          path: 'rightnewsing',
          name: 'rightnewsing',
          component: () => import('../views/right/rightnewsing.vue')
        },
        {
          path: 'rightsinger',
          name: 'rightsinger',
          component: () => import('../views/right/rightsinger.vue')
        },
        {
          path: 'rightsongs',
          name: 'rightsongs',
          component: () => import('../views/right/rightsongs.vue')
        },
        {
          path: 'rightstyle',
          name: 'rightstyle',
          component: () => import('../views/right/rightstyle.vue')
        },
        
      ]
    }
  ]
}
