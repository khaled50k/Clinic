<template>
    <section>
        <div class="head__title">
            <h2>Invoice details</h2>
        </div>
        <div class="data__table">
            <div class="inputs__data__table">
                <div class="input__data__table">
                    <p>Patient Name</p>
                    <select name="patientname" v-model="pid" >
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

            <AddButton name="Update" iclass="fa-regular fa-pen-to-square" rname="invoice" style="rigth:0;"
                @click="this.updateInvoice()" />

        </div>
    </section>
</template>

<script>

import { AddButton } from "../../components";
import PatientServices from '../../PatientServices'
import OperationServices from '../../OperationServices'
import InvoiceServices from '../../InvoiceServices'

export default {
    components: {
        AddButton,

    },
    props: ['id'],
    data() {
        return {
            patients: [],
            operations: [],
            casestudy: '',
            pname: '',
            opname: '',
            price: '',
            discount: 0,
            total: '',
            notes: '',
            invoice: [],
            pid:'',
            opid:'',
            // id:'',

            Swal: this.$swal

        }
    }, methods: {
        async updateInvoice() {

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
                    InvoiceServices.updateInvoice(this.id, this.pid, this.price, this.discount, this.opid, this.notes);

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
            let timerInterval
            Swal.fire({
                title: 'Updating!',
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


        },
        formatDMY(d) {
            let current_date = new Date(d)
            let dateString = current_date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
            let parts = dateString.split("/");
            let formattedDate = [parts[2], parts[0], parts[1]].join("-");
            return formattedDate;
        }
    }, async created() {
        this.patients = await PatientServices.getPatients();
        this.operations = await OperationServices.getOperations();
        let p = await InvoiceServices.getInvoice(this.id);
        await console.log(p[0]);
        p = await p[0];
        this.pname = await p.name
        this.opname = await p.operation_name
        this.price = await p.price
       
        this.discount = await p.discount
        this.notes = await p.notes
        this.pid = await p.pid
        this.opid = await p.opid
        this.invoice = await p;
    },computed:{
        totalPrice: function () {
            return (this.price - this.price * (this.discount / 100))

        }
    }
}
</script>