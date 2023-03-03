import { createRouter, createWebHistory } from "vue-router";
import Patients from "../views/patients/Patients.vue";
import AddPatient from "../views/patients/AddPatient.vue";
import EditPatient from "../views/patients/EditPatient.vue";
import ShowPatient from "../views/patients/ShowPatient.vue";
import Calendar from "../views/calendar/Calendar.vue";
import AddAppointment from "../views/appointments/AddApointment.vue";
import EditAppointment from "../views/appointments/EditAppointment.vue";
import ShowAppointment from "../views/appointments/ShowAppointment.vue";
import Appointments from "../views/appointments/Appointments.vue";
import Invoices from "../views/invoices/Invoices.vue";
import AddInvoices from "../views/invoices/AddInvoice.vue";
import EditInvoices from "../views/invoices/EditInvoice.vue";
import  ShowInvoices from "../views/invoices/ShowInvoice.vue";
import Home from "../App.vue";

const routes = [
  { path: "/patient", name: "patient", component: Patients },
  { path: "/patient/add", name: "addPatient", component: AddPatient },
  { path: "/patient/edit/:id", name: "editPatient", component: EditPatient,props:true,  },
  { path: "/patient/:id", name: "showpatient", component: ShowPatient,props:true,  },
  { path: "/appointment/add", name: "addAppointment", component: AddAppointment },
  { path: "/appointment/edit/:id", name: "editAppointment", component: EditAppointment,props:true,  },
  { path: "/appointment/:id", name: "showAppointment", component: ShowAppointment,props:true,  },
  { path: "/calendar", name: "calendar", component: Calendar },
  { path: "/appointment", name: "appointment", component: Appointments },
  { path: "/invoice", name: "invoice", component: Invoices },
  { path: "/invoice/add", name: "addInvoice", component: AddInvoices },
  { path: "/invoice/:id", name: "showInvoice", component: ShowInvoices,props:true },
  { path: "/invoice/edit/:id", name: "editInvoice", component: EditInvoices ,props:true},

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
