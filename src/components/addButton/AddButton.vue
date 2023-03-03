<template>
    <div class="add__btn">
        <i :class="iclass"></i>
        <p>{{ name }}</p>
    </div>

</template>

<script>
export default {
    props: ['name', 'iclass', 'rname']
}
</script>

<style scopoed>
.add__btn {
    display: flex;
    background: var(--bg-blue1);
    color: var(--bg-white);
    padding: 12px;
    border-radius: 4px;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    width: fit-content;


}

.add__btn:hover {
    background: var(--text-dark);
    color: var(--bg-white);
    transition: 0.4s ease-in-out;
}

.add__btn i {
    font-size: 18px;
}

.add__btn p {
    font-size: 16px;
}
</style>