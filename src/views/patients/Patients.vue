<template>
    <section>
        <AddButton name="Add Patient" iclass="fa-solid fa-plus" rname="addPatient" @click="goAdd()" />
        <div class="list__table">
            <div class="header__list__table">
                <h2>Patient List</h2>
                <div class="search__header__list__table">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="search" name="" id="" :placeholder="invalue" v-model="search">
                </div>
            </div>
            <div class="data__list__table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Case Study </th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr v-for="el in filterPatients" :key="el.id">
                            <td>{{ el.name }}</td>
                            <td style="text-transform:capitalize">{{ el.gender }}</td>
                            <td>{{ getAge(el.dateofbirth) }}</td>
                            <td>{{ el.casestudy }}</td>
                            <td>{{ el.notes }}</td>
                            <td class="action__icon">
                                <router-link :to="{ name: 'showpatient', params: { id: el.id } }" :id="el.id">
                                    <i class="fa-regular fa-eye"></i>
                                </router-link>


                                <router-link :to="{ name: 'editPatient', params: { id: el.id } }" :id="el.id">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </router-link>

                                <i class="fa-regular fa-trash-can" @click="deletePatient(el.id)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
import { AddButton } from "../../components";
import PatientServices from '../../PatientServices'

export default {
    components: {
        AddButton,

    },
    data() {
        return {
            patients: [],
            search: '',
            Swal: this.$swal
        }
    }, async created() {
        try {
            this.patients = await PatientServices.getPatients();

        } catch (error) {

        }
    }, methods: {
        goAdd() {
            this.$router.push({ name: 'addPatient' })
        },
        getAge(birthDate) {
            console.log(birthDate);
            return Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
        }, deletePatient: async function (id) {
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
                    let a = await PatientServices.deletePatient(id);
                    
                    this.patients = await PatientServices.getPatients();
                }
            })


        }
    }, computed: {
        filterPatients: function () {
            return this.patients.filter(patient => {
                return patient.name.toLowerCase().match(this.search.toLowerCase());
            })
        },

    }
}
</script>

<style scopoed>
section {}
</style>