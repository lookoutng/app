import { createRouter, createWebHistory } from '@ionic/vue-router';

import Home from '../views/Home.vue'
import DashBoard from '../views/DashBoard.vue'
import Reg from '../views/Reg.vue'
import Profile from '../views/Profile.vue'

import QuestionHistory from '../views/QuestionHistory.vue'
import MyQuestion from '../views/MyQuestion.vue'
import SingleQuestion from '../views/SingleQuestion.vue'
import AnsweredQuestion from '../views/AnsweredQuestion.vue'



const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/register',
    name: 'Reg',
    component: Reg
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/questions/answered',
    name: 'AnsweredQuestion',
    component: AnsweredQuestion
  },

  {
    path: '/questions/view',
    name: 'QuestionHistory',
    component: QuestionHistory
  },

  {
    path: '/questions/:id',
    name: 'QuestionHistory',
    component: QuestionHistory
  },
  {
    path: '/user/question',
    name: 'MyQuestion',
    component: MyQuestion
  },
  {
    path: '/question/:id',
    name: 'SingleQuestion',
    component: SingleQuestion
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
