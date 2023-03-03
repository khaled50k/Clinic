<template>
    <div class="list__table">
        <div class="header__list__table">
            <h2>{{ name }} List</h2>
            <div class="search__header__list__table">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" name="" id="" :placeholder="invalue">
            </div>
        </div>
        <div class="data__list__table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Current Medication</th>
                        <th>Case Study</th>
                        <th>Actions</th>
                    </tr>
                    <tr v-for="el in data" :key="el.id">
                        <td>{{ el.name }}</td>
                        <td>{{ el.gender }}</td>
                        <td>{{ getAge(el.dateofbirth) }}</td>
                        <td>{{ el.currentmedication }}</td>
                        <td>{{ el.casestudy }}</td>
                        <td class="action__icon">
                            <i class="fa-regular fa-pen-to-square"></i>
                            <i class="fa-regular fa-trash-can"></i>
                        </td>
                    </tr>


                </thead>



            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: ['name', 'invalue', 'data'],
    data() {
        return {
        }
    },
}
</script>

<style >
.action__icon a {
    color: var(--text-dark1);
}

.list__table {
    /* margin-top: 20px; */
    background: var(--bg-white);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    border-radius: 4px;
}

.header__list__table {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    color: var(--text-dark);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    padding: 10px;


}

.header__list__table h2 {
    color: var(--text-dark2);
    font-weight: 400;
}

.search__header__list__table {
    position: relative;
    outline: none;
    height: 100%;
    background: var(--bg-white2);
    padding: 5px;
    border-radius: 4px;
}

.search__header__list__table input {
    background: transparent;
    height: 100%;
    padding-left: 5px;
    color: var(--text-dark);
}

.search__header__list__table input:focus {
    outline: none;


}

.search__header__list__table i {
    /* position: absolute; */
    left: 0;
    top: 50%;
    font-size: 18;
}

.data__list__table {
    display: flex;
    width: 100%;
    padding: 10px;

}

table {
    display: flex;
    width: inherit;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

table thead {

    width: inherit;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;

}

table tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    padding: 10px;



}

table tr td,
table tr th {
    width: calc(100% / 6);
    text-align: left;
    padding: 5px;
    color: var(--text-dark);
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

}

table tr th {
    color: var(--text-dark1);
    font-weight: 500;
    /* text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; */

}

table tbody {
    display: flex;
    flex-direction: column;
    gap: 10px;

}

table tbody tr {
    background: var(--bg-white2);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    border-radius: 4px;
    /* max-height: 30px; */
    /* text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; */
}

.action__icon {
    display: flex;
    align-items: center;
    gap: 15px;

}

.action__icon i {
    cursor: pointer;
}

.action__icon i:hover {
    color: var(--bg-blue1);
}
</style>