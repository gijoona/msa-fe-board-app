import Vue from 'vue'
import Router from 'vue-router'

// microservice architecture(MSA) example
import HelloWorld from '@/components/HelloWorld'
import Board from '@/components/Board'
import SvgApp from '@/components/SvgApp'
import Container from '@/components/Container'
import Code from '@/components/Code'

// chatbot example
import ChatBot from '@/components/bots/ChatBot'

// A Quester sources
import Login from '@/components/quester/Login'
import Main from '@/components/quester/Main'
import Profile from '@/components/quester/Profile'

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
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
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
