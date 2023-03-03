<template>
    <section>

        <div class="head__title">
            <h2>Patient details</h2>
        </div>
        <div class="data__table">
            <div class="inputs__data__table">
                <div class="input__data__table">
                    <p>Name</p>
                    <input type="text" v-model="name">
                </div>
                <div class="input__data__table">
                    <p>Gender</p>
                    <div class="lable__inputs">
                        <label>
                            <input type="radio" autocomplete="off" name="radio" checked :value="'male'"
                                v-model="gender" />
                            Male
                        </label>
                        <label>
                            <input type="radio" name="radio" :value="'female'" v-model="gender" />
                            Female
                        </label>
                    </div>

                </div>
                <div class="input__data__table">
                    <p>Phone Number</p>
                    <input type="tel" v-model="phoneNmuber">
                </div>
                <div class="input__data__table">
                    <p>Date of birth</p>
                    <input type="date" v-model="dateOfBirth">
                </div>
                <!-- <div class="input__data__table">
                    <p>Current Medication</p>
                    <select name="currentmedication" v-model="currentmedication" id="currentmedication">
                        <option value=""></option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="hamster">Hamster</option>
                        <option value="parrot">Parrot</option>
                        <option value="spider">Spider</option>
                        <option value="goldfish">Goldfish</option>
                    </select>
                </div> -->
                <div class="input__data__table">
                    <p>Case Study</p>
                    <select name="casestudy" v-model="casestudy">
                        <option value=""></option>
                        <option value="Diabetic">1-Diabetic</option>
                        <option value="Kidney Problems">2-Kidney Problems</option>
                        <option value="High Blood Presure">3-High Blood Presure</option>
                        <option value="Heart Disease">4-Heart Disease</option>
                        <option value="Allergy">5-Allergy</option>
                        <option value="Blood Thinners">6-Blood Thinners</option>
                        <option value="Hepatitis">7-Hepatitis</option>
                        <option value="Thyroid">8-Thyroid</option>
                        <option value="Cancer">9-Cancer</option>
                    </select>
                </div>
                <div class="input__data__table">
                    <p>Notes</p>
                    <input type="text" v-model="notes">
                </div>
            </div>

        </div>
        <div style="    display: flex;
    align-items: flex-end;
    flex-direction: column; ">

            <AddButton name="Update" iclass="fa-regular fa-pen-to-square" rname="patient" style="rigth:0;"
                @click="this.updatePatient()" />
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
    props: ['id'],
    data() {
        return {
            casestudy: '',
            name: '',
            gender: 'male',
            phoneNmuber: null,
            notes: null,
            casestudy: null,
            dateOfBirth: null,
            patient: [],
            Swal: this.$swal

        }
    }, methods: {
        async updatePatient() {

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
                    PatientServices.updatePatient(this.id, this.name, this.phoneNmuber, this.gender, this.dateOfBirth, '', this.casestudy, this.notes);

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
                    this.$router.push({ name: 'patient' })

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
        this.patient
        let p = await PatientServices.getPatient(this.id);
        p = await p[0];
        this.name = await p.name
        this.gender = await p.gender
        this.phoneNmuber = await p.phonenumber
        this.dateOfBirth = await this.formatDMY(p.dateofbirth)
        this.casestudy = await p.casestudy
        this.notes = await p.notes
        this.patient = await p;
    }
}
</script>