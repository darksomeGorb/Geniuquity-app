import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import app from './modules/app'
import * as getters from './getters'

Vue.use(Vuex)

let userToken = ''
let user = {}
let activeAccount = {}
let accounts = []
let userString = window.localStorage.getItem('user')
let loggedIn = false
if (userString !== undefined && userString !== '' && userString != null) {
  userString = JSON.parse(userString)
  userToken = userString.auth
  accounts = userString.accounts
  activeAccount = userString.accounts[0]
  user.admin = userString.admin
  user.name = userString.name
  loggedIn = true
}
const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
  },
  state: {
    accounts: accounts,
    activeAccount: activeAccount,
    userToken: userToken,
    user: user,
    loggedIn: loggedIn,

  },
  actions: {
    userlogin ({ commit }, usernamelogin) {
      commit('userlogin', usernamelogin)
    },
    accountQuery ({ commit }, details) {
      commit('accountQuery', details)
    },
    activeaccount ({ commit }, accountNumber) {
      commit('activeaccount', accountNumber)
    },
    userdetails ({ commit }, userdetails) {
      window.localStorage.setItem('user', JSON.stringify(userdetails))
      commit('userdetails', userdetails)
    },
    logout ({ commit }) {
      window.localStorage.removeItem('user')
      commit('logout')
    },
    ministatement ({ commit }, stmt) {
      commit('ministatement', stmt)
    },
    fullstatement ({ commit }, stmt) {
      commit('fullstatement', stmt)
    },
    balances ({ commit }, balances) {
      commit('balances', balances)
      commit('balances_set')
    },
    openclose ({ commit }, openclose) {
      commit('openclose', openclose)
    },

    kyc ({ commit }, kyc) {
      commit('kyc', kyc)
    },
    creditscore ({ commit }, data) {
      commit('creditscore', data)
    },
  },
  mutations: {
    creditscore (state, data) {
      state.creditscore = data
    },
    kyc (state, kyc) {
      state.kyc = kyc
    },
    balances_set (state) {
      console.log('balance set')
    },
    openclose (state, balances) {
      state.openclose = balances
    },
    userlogin (state, usernamelogin) {
      state.usernamelogin = usernamelogin
    },
    fullstatement (state, stmt) {
      state.fullstatement = stmt
    },
    ministatement (state, stmt) {
      state.ministatement = stmt
    },
    accountQuery (state, details) {
      state.accountQueryDetails[state.activeAccount.accountNumber] = details
    },
    balances (state, balances) {
      state.activeAccount.currentBalance = balances.current
      state.activeAccount.availableBalance = balances.available
    },
    activeaccount (state, accountNumber) {
      state.activeAccount = state.accounts.filter(acc => acc.accountNumber === accountNumber.trim())[0]
    },
    userdetails (state, userdetails) {
      state.accounts = userdetails.accounts
      userdetails.accounts[0].currentBalance = 0
      userdetails.accounts[0].availableBalance = 0
      state.activeAccount = userdetails.accounts.length > 0 ? userdetails.accounts[0] : {}
      state.activeAccount.availableBalance = ''
      state.activeAccount.currentBalance = ''
      state.userToken = userdetails.auth
      state.user.admin = userdetails.admin
      state.user.name = userdetails.name
      state.usernamelogin = undefined
    },
    logout (state) {
      state.loggedIn = false
      state.activeAccount = {}
      state.accounts = []
      state.userToken = ''
      state.user = {}
    },
  },
})

Vue.use(VuexI18n.plugin, store)

export default store
