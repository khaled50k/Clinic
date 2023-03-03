<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
  <main>
    <Aside></Aside>
    <aside class="rigth-side">
      <header></header>

      <router-view class="" />

    </aside>
  </main>


</template>
<script>

import { Aside } from './views'
import PatientServices from './PatientServices';
import AppoitmentServices from './AppointmentServices';
import InvoiceServices from './InvoiceServices';
import OperationServices from './OperationServices';
import AdminServices from './AdminServices';
export default {

  components: {
    Aside,

  }
  ,
  data() {
    return {
      patients: [],
      appoitments: [],
      invoices: [],
      operations: [],
      admin: [],

    }
  }, async created() {
    // try {
    //   await console.log('created');
    //   this.appoitments = await AppoitmentServices.getAppoitments();
    //   this.invoices = await InvoiceServices.getInvoices();
    //   this.operations = await OperationServices.getOperations();
    //   this.admin = await AdminServices.getAdmin("khaled");
    //   this.patients = await PatientServices.getPatients();
    // } catch (error) {

    // }

  }, computed: {

  }, async mounted() {
   
  },beforeMount(){

  }
}

</script>
<style scoped>
main {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

.rigth-side {
  width: calc(100% - 230px);
  height: 100%;

}

header {
  height: 60px;
  width: 100%;
  background: var(--bg-white);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  padding: 0 10px;
  position: sticky;
  top: 0;
  z-index: 3;
}

section {
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}
</style>
