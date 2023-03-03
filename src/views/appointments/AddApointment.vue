<template>
    <section>

        <div class="head__title">
            <h2>Appointment details</h2>
        </div>
        <div class="data__table">
            <div class="inputs__data__table">
                <div class="input__data__table">
                    <p>Patient Name</p>
                    <select name="patientname" v-model="pid">
                        <option value=""></option>
                        <option :value="patient.id" v-for="patient in patients" :key="patient.id">{{ patient.name }}
                        </option>
                    </select>
                </div>
                <div class="input__data__table">
                    <p>Appointment date</p>
                    <input type="date" name="" id="" v-model="appdate">


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
                    <p>Notes</p>
                    <input type="text" v-model="notes">
                </div>
            </div>
        </div>
        <div style="display: flex;align-items: flex-end;flex-direction: column; ">

            <AddButton name="Add Appointment" iclass="fa-solid fa-plus" rname="patient" style="rigth:0;"
                @click="this.addAppointment()" />

        </div>

    </section>
</template>

<script>
import PatientServices from '../../PatientServices'
import AppointmentServices from '../../AppointmentServices'
import { AddButton } from "../../components";

export default {
    components: {
        AddButton
    },
    data() {
        return {
            patients: [],
            appdate: '',
            pid: 0,
            appstart: '',
            append: '',
            appoitments: [],
            notes: '',
            Swal: this.$swal
        }
    }, async created() {
        try {
            this.patients = await PatientServices.getPatients();
            this.appoitments = await AppointmentServices.getAppoitments();


        } catch (error) {

        }
    }, computed: {
        filterDate: function () {
            return this.appoitments
        }
    }, methods: {
        formateDate(d, t) {


            const date = new Date(d);

            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const newFormat = `${year}-${month}-${day} ${t}`;
            return newFormat;
        },

        formatDMY(d) {
            let current_date = new Date(d)
            let dateString = current_date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
            let parts = dateString.split("/");
            let formattedDate = [parts[2], parts[0], parts[1]].join("-");
            return formattedDate;
        },
        async filterAppStart() {
            let d = await AppointmentServices.CheckAppoitmentStart(this.appdate + ' ' + this.appstart)

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
        }, async filterAppEnd() {
            let d = await AppointmentServices.CheckAppoitmentEnd(this.appdate + ' ' + this.append)

            if (d[0].status) {
                // this.appstart = await d[0].append
                await console.log(d[0]);
            } else {
                this.append = await new Date(d[0].appstart).toLocaleString("en", {
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: "Asia/Jerusalem",
                    hour12: false
                })
            }

        },
        async addAppointment() {
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
                    AppointmentServices.insertAppoitment(this.pid, (this.formateDate(this.appdate, this.appstart)), (this.formateDate(this.appdate, this.append)), false,this.notes);

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


        }
    },


}
</script>

<style>

</style>