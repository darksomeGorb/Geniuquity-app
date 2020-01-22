import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'

Vue.use(Router)

const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

const demoRoutes = []
if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_INCLUDE_DEMOS) {
  const vueBookRoutes = require('./vueBookRoutes').default
  vueBookRoutes.forEach(route => demoRoutes.push(route))
}

export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'dashboard' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
        },
        {
          name: 'code',
          path: 'code',
          component: () => import('../components/auth/code/GetCode.vue'),
        },
        {
          path: '',
          redirect: { name: 'dashboard' },
        },
      ],
    },
    {
      path: '/404',
      component: EmptyParentComponent,
      children: [
        {
          name: 'not-found-advanced',
          path: 'not-found-advanced',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSearch.vue'),
        },
        {
          name: 'not-found-simple',
          path: 'not-found-simple',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSimple.vue'),
        },
        {
          name: 'not-found-custom',
          path: 'not-found-custom',
          component: () => import('../components/pages/404-pages/VaPageNotFoundCustom.vue'),
        },
        {
          name: 'not-found-large-text',
          path: '/pages/not-found-large-text',
          component: () => import('../components/pages/404-pages/VaPageNotFoundLargeText.vue'),
        },
      ],
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../components/dashboard/Dashboard.vue'),
          default: true,
        },
        {
          name: 'accountoperations',
          path: 'accountoperations',
          component: () => import('../components/accountoperations/AccountOperations.vue'),
        },
        {
          name: 'pesalink',
          path: 'pesalink',
          component: () => import('../components/pesalink/Pesalink.vue'),
        },
        {
          name: 'b2b',
          path: 'b2b',
          component: () => import('../components/b2b/b2b.vue'),
        },
        {
          name: 'bill-payment',
          path: 'bill-payment',
          component: () => import('../components/bill-payment/bill-payment.vue'),
        },
        {
          name: 'lipa-na-mpesa',
          path: 'lipa-na-mpesa',
          component: () => import('../components/lipa-na-mpesa/lipa-na-mpesa.vue'),
        },
        {
          name: 'purchase-airtime',
          path: 'purchase-airtime',
          component: () => import('../components/purchase-airtime/purchase-airtime.vue'),
        },
        {
          name: 'mobiletransfer',
          path: 'mobiletransfer',
          component: () => import('../components/mobiletransfer/Mobiletransfer.vue'),
        },
        {
          name: 'ift',
          path: 'ift',
          component: () => import('../components/ift/Ift.vue'),
        },
        {
          name: 'swift',
          path: 'swift',
          component: () => import('../components/swift/Swift.vue'),
        },
        {
          name: 'eft',
          path: 'eft',
          component: () => import('../components/eft/Eft.vue'),
        },
        {
          name: 'adduser',
          path: 'adduser',
          component: () => import('../components/usersaccounts/AddUser.vue'),
        },
        {
          name: 'creditscore',
          path: 'creditscore',
          component: () => import('../components/credit/Creditscore.vue'),
        },
        {
          name: 'viewusers',
          path: 'viewusers',
          component: () => import('../components/usersaccounts/Users.vue'),
        },
        {
          name: 'addaccount',
          path: 'addaccount',
          component: () => import('../components/usersaccounts/AddAccount.vue'),
        },
        {
          name: 'viewaccounts',
          path: 'viewaccounts',
          component: () => import('../components/usersaccounts/Accounts.vue'),
        },
        {
          name: 'kyc',
          path: 'kyc',
          component: () => import('../components/kyc/Kyc.vue'),
        },
        {
          name: 'pages',
          path: 'pages',
          component: EmptyParentComponent,
          children: [
            {
              name: '404-pages',
              path: '404-pages',
              component: () => import('../components/pages/404-pages/404PagesPage'),
            },
          ],
        },
      ],
    },
  ],
})
