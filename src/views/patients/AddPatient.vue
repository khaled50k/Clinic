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
        <div style="display: flex;align-items: flex-end;flex-direction: column; ">

            <AddButton name="Add Patient" iclass="fa-solid fa-plus" rname="patient" style="rigth:0;"
                @click="this.addPatient()" />

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
            // currentmedication: '',
            casestudy: '',
            name: '',
            gender: 'male',
            phoneNmuber: null,
            notes: null,
            casestudy: null,
            dateOfBirth: null,
            active: false,
            Swal: this.$swal

        }
    }, methods: {
        async addPatient() {

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
                    PatientServices.insertPatient(this.name, this.phoneNmuber, this.gender, this.dateOfBirth, '', this.casestudy, this.notes);

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
            let timerInterval
            Swal.fire({
                title: 'Adding Patient!',
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



        }
    },
}
</script>
<style >

.head__title h2 {
    color: var(--text-dark2);
    font-weight: 400;
}

.data__table {
    display: flex;
    width: 100%;
    background: var(--bg-white);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    flex-direction: column;
    gap: 50px;
    border-radius: 4px;
}

.inputs__data__table {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: inherit;
    justify-content: space-between;
    gap: 30px;

}

.input__data__table {
    width: 30%;
    display: flex;
    padding: 10px;
    /* */
    flex-direction: column;
    gap: 10px;
    color: var(--text-dark1);
    font-weight: 500;
}

.input__data__table input,
.lable__inputs {
    color: var(--text-dark);
    padding: 5px;
    gap: 5px;
    border-radius: 4px;
}

.lable__inputs {
    gap: 15px;
}

.lable__inputs,
select {
    display: flex;

}

select,
select option {
    outline: 0;
    border: none;
    color: var(--text-dark);
    padding: 5px;
}

.input__data__table input[type=text],
.input__data__table input[type=tel],
.input__data__table input[type=date],
.input__data__table input[type=number],
.input__data__table input[type=time],
.lable__inputs,
select {

    height: 40px;
    padding-left: 5px;
    background: var(--bg-white2);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
}

.input__data__table input:focus {
    outline: 0;
}

.input__data__table input:focus {
    outline: 0;
}

.input__data__table label {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 400;
}

.input__data__table label input {
    width: 10px;
    height: 10px;
}
</style>