<template>
    <div>
        <h1>Editar id: route.params</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese el URL" v-model="url">
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {useDatabaseStore} from '../stores/database'
const route = useRoute()
// console.log(route.params.id)

const handleSubmit = () => {
    //validaciones del input
    databaseStore.updateUrl(route.params.id,url.value)
}

const databaseStore = useDatabaseStore();
const url = ref ('');

onMounted(async () => {
    url.value = await databaseStore.leerUrl(route.params.id)
})

</script>

