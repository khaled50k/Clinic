<template>
    <aside>
        <router-link to="/" class="logo">
            <img src="../../assets/logo.jpg" alt="">
            <h1>Safi Dental Clinic</h1>
        </router-link>
        <div class="views">
            <router-link :to="{ name: 'patient' }" class="view">
                <i class="fa-solid fa-user-doctor"></i>
                <p>Patient</p>
            </router-link>
            <router-link :to="{ name: 'appointment' }" class="view">
                <i class="fa-regular fa-calendar-check"></i>
                <p>Appointment</p>
            </router-link>
            <router-link :to="{ name: 'calendar' }" class="view">
                <i class="fa-solid fa-calendar-days"></i>
                <p>Calendar</p>
            </router-link>
            <router-link :to="{ name: 'invoice' }" class="view">
                <i class="fa-solid fa-file-invoice-dollar"></i>
                <p>Invoice</p>
            </router-link>

        </div>
    </aside>
</template>

<script>
export default {

}
</script>

<style scoped>
aside {
    background: var(--bg-white);
    height: 100vh;
    position: sticky;
    top: 0;
    width: 230px;
}

aside .logo {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    color: var(--text-dark);
}

aside .logo img {
    widows: 30px;
    height: 30px;
}

aside .logo h1 {
    font-size: 20px;
    font-weight: 400;

}

.views {
    display: flex;
    flex-direction: column;

    background: var(--bg-white);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

}

.views .view {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    width: 100%;
    color: var(--text-dark);
    height: 50px;

}

.views .view:hover i,
.views .view:hover {
    background: var(--text-dark);
    color: var(--bg-white);
    transition: 0.4s ease-in-out;
}

.views .view.router-link-active,
.views .view.router-link-active i {
    color: var(--bg-white);
    background: var(--bg-blue1);
}

.views .view i {
    color: var(--text-dark);
    font-size: 18px;
}

.views .view p {
    font-size: 16px;
}
</style>