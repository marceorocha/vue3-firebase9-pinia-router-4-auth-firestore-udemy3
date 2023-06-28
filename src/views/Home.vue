<template>
    <div>
        <h1>Home</h1>
        <p>{{userStore.userData?.email}}</p>
        <p>Esto solo se ve si estamos logueados porque la vista esta protegida, esta protegido en el router.js no en la vista</p>
    </div>
</template>

<script setup>
import {useUserStore} from '../stores/user'
const userStore = useUserStore()
</script>