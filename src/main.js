import { createApp } from 'vue'
import App from './App.vue'
import Home from '@/pages/Home'
import ThreadShow from '@/pages/ThreadShow'
import NotFound from '@/pages/NotFound'
import { createRouter, createWebHistory } from 'vue-router'
import sourceData from './data.json'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/thread/show:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter (to, from, next) {
      const threadExists = sourceData.threads.find(
        thread => thread.id === to.params.id
      )
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const forumApp = createApp(App)
forumApp.use(router)
forumApp.mount('#app')
