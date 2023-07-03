<template>
    <div>
        <h1>Home</h1>
        <p style="color: brown;">Bienvenido! {{userStore.userData?.email}}</p>

        <form @submit.prevent="handleSubmit">

            <input type="text" placeholder="Ingrese el URL" v-model="url">
            <button type="submit">Agregar</button>
        </form>


        <p>Esto solo se ve si estamos logueados porque la vista esta protegida, esta protegido en el router.js no en la vista</p>
        <p v-if="databaseStore.loadingDoc">loading docs...</p>
        <ul v-else>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.name }}
                <br>
                {{ item.id }}
                <br>
                {{ item.short }}
                <br>
                <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
                <button @click="router.push(`/editar/${item.id}`)">Editar</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {useUserStore} from '../stores/user'
const userStore = useUserStore()
import { useDatabaseStore } from '../stores/database';
import { ref } from 'vue';
const databaseStore = useDatabaseStore();
import { useRouter } from 'vue-router';

databaseStore.getUrls();

const url = ref ('');
const handleSubmit = () => {
    // console.log('formulario')
    databaseStore.addUrl(url.value)
};
const router = useRouter()

</script>