<template>
    <section>
        <AddButton name="Add Appointment" iclass="fa-solid fa-plus" @click="goAdd()"/>
        <div class="list__table">
            <div class="header__list__table">
                <h2>Appointment List</h2>
                <div class="search__header__list__table">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="search" name="" id="" :placeholder="invalue" v-model="search">
                </div>
            </div>
            <div class="data__list__table">
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Create Date</th>
                            <th>Starts at</th>
                            <th>Ends at </th>
                            <th>Cancelled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="el in filterAppointment" :key="el.id">
                            <td>{{ el.name }}</td>
                            <td>{{ formatCreateDate(el.createdat) }}</td>
                            <td>{{ (formatAppDate(el.appstart)) }}</td>
                            <td>{{ (formatAppDate(el.append))}}</td>
                            <td>{{ el.cancelled }}</td>
                            <td class="action__icon">
                                <router-link :to="{ name: 'showAppointment', params: { id: el.id } }" :id="el.id">
                                    <i class="fa-regular fa-eye"></i>
                                </router-link>
                                <router-link :to="{ name: 'editAppointment', params: { id: el.id } }" :id="el.id">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </router-link>
                                <i class="fa-regular fa-trash-can" @click="deleteAppointment(el.id)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

</template>

<script>
import { AddButton, List } from "../../components";
import PatientServices from '../../PatientServices'
import AppointmentServices from '../../AppointmentServices'
export default {
    components: {
        AddButton,

    }, data() {
        return {
            appointments: [],
            search: '',
            Swal: this.$swal
        }
    }, async created() {
        this.appointments = await AppointmentServices.getAppoitments();
    }, methods: {
        goAdd(){
            this.$router.push({ name: 'addAppointment' })
        },
        formatAppDate(d) {
            let date = new Date(d);
            return date.toLocaleString("en", {
                // weekday: 'long',
                // year: "numeric",
                day: 'numeric',
                month: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: "Asia/Jerusalem",
            })
        },
        formatCreateDate(d) {
            return new Date(d).toLocaleString("en", {
                day: "numeric",
                month: 'numeric', year: 'numeric',
                timeZone: "Asia/Jerusalem",
            })
        },
        async deleteAppointment(id) {
            let Swal = this.Swal;
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    await AppointmentServices.deleteAppoitment(id);
                    this.appointments = await AppointmentServices.getAppoitments();

                }
            })



        }
    }, computed: {
        filterAppointment: function () {
            return this.appointments.filter(appointment => {
                return this.formatCreateDate(appointment.appstart.toLowerCase()).includes(this.search.toLowerCase()) || appointment.name.toLowerCase().includes(this.search.toLowerCase());

            })
        }
    }
}
</script>

<style>

</style>