<template>
    <section>

        <div class="head__title">
            <h2>Patient details</h2>
        </div>
        <div class="table__details">
            <div class="detail">
                <h5>Patient Name:</h5>
                <p>{{ patient.name }}</p>
            </div>
            <div class="detail">
                <h5>Patient Age:</h5>
                <p>{{ getAge(patient.dateofbirth) }} Years old</p>
            </div>
            <div class="detail">
                <h5>Patient Gender:</h5>
                <p>{{ patient.gender }}</p>
            </div>

            <div class="detail">
                <h5>Patient Case Study:</h5>
                <p>{{ patient.casestudy }}</p>
            </div>
            <div class="detail">
                <h5>Patient Notes:</h5>
                <p>{{ patient.notes }}</p>
            </div>
        </div>




    </section>
</template>
<script>
import PatientServices from '../../PatientServices'

export default {
    props: ['id'],
    data() {
        return {
          
            patient:[],
            Swal: this.$swal
        }
    }, async created() {
     
        let p = await PatientServices.getPatient(this.id);
        p = await p[0];
     
        this.patient = await p;
    }, methods: {
        getAge(birthDate) {

            return Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
        },
    },
}
</script>
<style >
.table__details {
    display: flex;
    width: 100%;
    background: var(--bg-white);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    gap: 20px;
    border-radius: 4px;
    flex-wrap: wrap;
}

.table__details .detail {
    display: flex;
    align-items: center;

    height: 50px;
    width: 30%;
    gap: 30px;
    padding: 10px;
    margin: 10px;
    background: var(  --bg-white2);
    color: var( --text-dark2);
    border-radius: 4px;
}


.table__details .detail h5 {

    font-weight: 500;
}

.table__details .detail p {
    color: var(--text-dark1);
    font-weight: 400;
    text-decoration: underline;
}
</style>