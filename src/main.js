// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import Footer from './components/common/Footer'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.component('app-footer', Footer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status)
})
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function () {
    console.log('Service Worker Registered!')
  })
    .catch(function (err) {
      console.log('Service Worker registration failed: ', err)
    })
}
