<template>
    <section>


        <div class="head__title">
            <h2>Appointment details</h2>
        </div>
        <div class="data__table">
            <div class="inputs__data__table">
                <div class="input__data__table">
                    <p>Patient Name</p>
                    <select name="patientname" v-model="appointment.pid">
                        <option value=""></option>
                        <option :value="patient.id" v-for="patient in patients" :key="patient.id">{{ patient.name }}
                        </option>
                    </select>
                </div>
                <div class="input__data__table">
                    <p>Appointment date</p>
                    <input type="date" name="" id="" v-model="day">


                </div>
                <div class="input__data__table">
                    <p>Appointment Start at</p>
                    <input type="time" name="" id="" v-model="appstart" @change="filterAppStart()">

                </div>
                <div class="input__data__table">
                    <p>Appointment End at</p>
                    <input type="time" name="" id="" v-model="append" @change="filterAppEnd()">
                </div>
                
                <div class="input__data__table">
                    <p>Cancelled</p>
                    <select name="operationname" v-model="appointment.cancelled">
                        <!-- <option value=""></option> -->
                        <option :value="true">true</option>
                        <option :value="false">false</option>
                    </select>
                </div>
                
                <div class="input__data__table">
                    <p>Notes</p>
                    <input type="text" v-model="appointment.notes">
                </div>
            </div>
        </div>
        <div style="display: flex;align-items: flex-end;flex-direction: column; ">

            <AddButton name="Update" iclass="fa-regular fa-pen-to-square"  style="rigth:0;"
                @click="this.updateAppointment()" />

        </div>

    </section>
</template>

<script>

import { AddButton } from "../../components";
import PatientServices from '../../PatientServices'
import AppointmentServices from '../../AppointmentServices'

export default {
    components: {
        AddButton,

    },
    props: ['id'],
    data() {
        return {
            pid: '',
            patients: [],
            appointment: [],
            day:'',
            appstart:'',
            append:'',
            Swal: this.$swal

        }
    }, methods: {
        async updateAppointment() {

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
                    AppointmentServices.updateAppoitment(this.id,this.appointment.pid,this.day+' '+this.appstart,this.day+' '+this.append,this.appointment.cancelled,this.appointment.notes);

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
                    this.$router.push({ name: 'appointment' })

                }
            })


        },
        formatDMY(d) {
            let current_date = new Date(d)
            let dateString = current_date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
            let parts = dateString.split("/");
            let formattedDate = [parts[2], parts[0], parts[1]].join("-");
            return formattedDate;
        },
        formatHM(d){
    
            let current_date = new Date(d)
            let dateString = current_date.toLocaleDateString('en-US', {   hour: 'numeric',
                    minute: 'numeric',
                    timeZone: "Asia/Jerusalem",
                    hour12: false,});
                    return dateString.split(" ")[1];
        },
        async filterAppStart() {
            let d = await AppointmentServices.CheckAppoitmentStart(this.day + ' ' + this.appointment.appstart)

            if (d[0].status) {
                // this.appstart = await d[0].append
                await console.log(d[0]);
            } else {
                this.appstart = await new Date(d[0].append).toLocaleString("en", {
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: "Asia/Jerusalem",
                    hour12: false
                })
            }
        }, 
    }, async created() {
        this.patients = await PatientServices.getPatients();
        let b = await AppointmentServices.getAppoitment(this.id);
        this.appointment = await b[0];
        this.day= await this.formatDMY(b[0].appstart)
        this.appstart=await this.formatHM(b[0].appstart)
        this.append=await this.formatHM(b[0].append)



    }
}
</script>