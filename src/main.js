import Vue from "vue";
import App from "./App.vue";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Notifications from "vue-notification";

Vue.config.productionTip = false;
Vue.use(Notifications);

export const eventBus = new Vue();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
