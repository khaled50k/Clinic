<template>
    <section>

        <div class="head__title">
            <h2>Invoice details</h2>
        </div>
        <div class="table__details">
            <div class="detail">
                <h5>Patient Name:</h5>
                <p>{{ invoice.name }}</p>
            </div>
            <div class="detail">
                <h5>Created At:</h5>
                <p>{{ this.formatCreateDate(invoice.createdat)}}</p>
            </div>
            <div class="detail">
                <h5>Price:</h5>
                <p>{{ invoice.price }}</p>
            </div>

            <div class="detail">
                <h5>Discount:</h5>
                <p>{{ invoice.discount }}</p>
            </div>
            <div class="detail">
                <h5>Total Price:</h5>
                <p>{{ invoice.total }}</p>
            </div>
            <div class="detail">
                <h5>Notes:</h5>
                <p>{{ invoice.notes }}</p>
            </div>
        </div>




    </section>
</template>
<script>
import InvoiceServices from '../../InvoiceServices'

export default {
    props: ['id'],
    data() {
        return {
          invoice:[],
          
            Swal: this.$swal
        }
    }, async created() {
        this.patient
        let p = await InvoiceServices.getInvoice(this.id);
        p = await p[0];
       
        this.invoice = await p;
    }, methods: {
        formatCreateDate(d) {
            return new Date(d).toLocaleString("en", {
                day: "numeric",
                month: 'numeric', year: 'numeric',
                timeZone: "Asia/Jerusalem",
            })
        },
    },
}
</script>