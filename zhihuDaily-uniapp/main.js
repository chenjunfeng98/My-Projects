import App from './App'
import {latestRequest,historyRequest} from 'api/index.js'

Vue.prototype.$latestRequest = latestRequest;
Vue.prototype.$historyRequest = historyRequest;

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif