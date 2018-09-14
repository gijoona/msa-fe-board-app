import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Board from '@/components/Board'
import SvgApp from '@/components/SvgApp'
import Container from '@/components/Container'
import Code from '@/components/Code'

import ChatBot from '@/components/bots/ChatBot'

import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
    },
    {
      path: '/svg-app',
      name: 'SvgApp',
      component: SvgApp
    },
    {
      path: '/container',
      name: 'Container',
      component: Container
    },
    {
      path: '/code',
      name: 'Code',
      component: Code
    },
    {
      path: '/chat',
      name: 'Chat',
      component: ChatBot
    }
  ]
})
