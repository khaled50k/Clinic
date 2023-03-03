import App from "./App.vue";
// import PatientServices  from "./PatientServices";
// import { AppointmentServices } from "./AppointmentServices";
import router from "./router";
import "./App.css";
import { createApp } from "vue";
import { createStore } from "vuex";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const store = createStore({
  state: {
    count: 0,
  },
});
// async function loadData() {
//     return await PatientServices.getPatients();
// }
const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueSweetalert2);
// app.use(new PatientServices);
// app.use(AppointmentServices);
app.mount("#app");
