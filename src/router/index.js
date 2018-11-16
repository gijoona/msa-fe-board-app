import Vue from 'vue'
import Router from 'vue-router'

// microservice architecture(MSA) example
// import HelloWorld from '@/components/HelloWorld'
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
import QuestInfo from '@/components/quester/QuestInfo'

// issue sources
import Issue from '@/components/issue/Issue'
import IssueList from '@/components/issue/IssueList'
import IssueEdit from '@/components/issue/IssueEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/main'
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
      path: '/quest',
      name: 'QuestInfo',
      component: QuestInfo
    },
    {
      path: '/issue',
      component: Issue,
      children: [
        {
          path: '',
          name: 'IssueList',
          component: IssueList
        },
        {
          path: 'Edit(/:id)?',
          name: 'IssueEdit',
          component: IssueEdit
        }
      ]
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
