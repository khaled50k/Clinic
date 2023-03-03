<template>
    <section>
        <AddButton name="Add Invoice" iclass="fa-solid fa-plus" rname="addInvoice" @click="goAdd()" />
        <div class="list__table">
            <div class="header__list__table">
                <h2>Invoice List</h2>
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
                            <th>Created at</th>
                            <th>Price</th>
                            <th>Discount </th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr v-for="el in filterInvoices" :key="el.id">
                            <td>{{ el.name }}</td>
                            <td>{{ this.formatCreateDate(el.createdat) }}</td>
                            <td>{{ el.price }}</td>
                            <td>{{ el.discount }}</td>
                            <td>{{ el.total }}</td>

                            <td class="action__icon">
                                <router-link :to="{ name: 'showInvoice', params: { id: el.id } }" :id="el.id">
                                    <i class="fa-regular fa-eye"></i>
                                </router-link>


                                <router-link :to="{ name: 'editInvoice', params: { id: el.id } }" :id="el.id">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </router-link>

                                <i class="fa-regular fa-trash-can" @click="deleteInvoice(el.id)"></i>
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
import InvoiceServices from '../../InvoiceServices'

export default {
    components: {
        AddButton,

    },
    data() {
        return {
            Invoices: [],
            search: '',
            Swal: this.$swal
        }
    }, async created() {
        try {
            this.Invoices = await InvoiceServices.getInvoices();

        } catch (error) {

        }
    }, methods: {
        formatCreateDate(d) {
            return new Date(d).toLocaleString("en", {
                day: "numeric",
                month: 'numeric', year: 'numeric',
                timeZone: "Asia/Jerusalem",
            })
        },
        goAdd() {
            this.$router.push({ name: 'addInvoice' })
        },
        getAge(birthDate) {
            console.log(birthDate);
            return Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
        }, deleteInvoice: async function (id) {
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
                    await InvoiceServices.deleteInvoice(id);
                    this.Invoices = await InvoiceServices.getInvoices();
                }
            })


        }
    }, computed: {
        filterInvoices: function () {
            return this.Invoices.filter(invoice => {
                return invoice.name.toLowerCase().match(this.search.toLowerCase());
            })
        },
    }
}
</script>

<style scopoed>

</style>