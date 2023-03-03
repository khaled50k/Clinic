<template>
    <section>

        <div class="head__title">
            <h2>Invoice details</h2>
        </div>
        <div class="data__table">
            <div class="inputs__data__table">
                <div class="input__data__table">
                    <p>Patient Name</p>
                    <select name="patientname" v-model="patientid">
                        <option value=""></option>
                        <option :value="patient.id" v-for="patient in patients" :key="patient.id">{{ patient.name }}
                        </option>
                    </select>
                </div>
                <div class="input__data__table">
                    <p>Operation Name</p>
                    <select name="operationname" v-model="opid">
                        <option value=""></option>
                        <option :value="operation.id" v-for="operation in operations" :key="operation.id">{{
                            operation.name
                        }}
                        </option>
                    </select>
                </div>
                <div class="input__data__table">
                    <p>Price</p>
                    <input type="number" name="" id="" v-model="price">
                </div>
                <div class="input__data__table">
                    <p>Discount</p>
                    <input type="number" name="" id="" v-model="discount">
                </div>
                <div class="input__data__table">
                    <p>Total</p>
                    <input type="number" name="" id="" v-model="totalPrice">
                </div>
                <div class="input__data__table">
                    <p>Notes</p>
                    <input type="text" v-model="notes">
                </div>
            </div>

        </div>
        <div style="display: flex;align-items: flex-end;flex-direction: column; ">

            <AddButton name="Add Invoice" iclass="fa-solid fa-plus" rname="invoice" style="rigth:0;"
                @click="this.addInvoice()" />

        </div>

    </section>
</template>

<script>
import PatientServices from '../../PatientServices'
import OperationServices from '../../OperationServices'
import InvoiceServices from '../../InvoiceServices'
import { AddButton } from "../../components";
export default {
    components:{
        AddButton
    },
    data() {
        return {
            patients: [],
            operations: [],
            patientid: '',
            price: '',
            discount: 0,
            opid: '',
            total: '',
            notes: '',
            Swal: this.$swal
        }
    }, async created() {
        try {
            this.patients = await PatientServices.getPatients();
            this.operations = await OperationServices.getOperations();

        } catch (error) {

        }
    }, computed: {
        totalPrice: function () {
            return (this.price - this.price * (this.discount / 100))

        }
    }, methods: {
       async addInvoice() {
            let Swal = this.Swal;

            await Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success')
                    InvoiceServices.insertInvoice(this.patientid, this.price, this.discount, this.opid,this.notes);

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
            let timerInterval
            Swal.fire({
                title: 'Adding Invoice!',
                html: 'I will close in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    this.$router.push({ name: 'invoice' })

                }
            })



        }
    }
}
</script>

<style>

</style>