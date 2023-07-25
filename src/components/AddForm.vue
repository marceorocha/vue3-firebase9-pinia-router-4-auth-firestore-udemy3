<script setup>
import { reactive } from 'vue';
import { useDatabaseStore } from '../stores/database';
import { message } from 'ant-design-vue'


const databaseStore = useDatabaseStore();

const formState= reactive({
    url:''
})

const onFinish = async (value) => {
console.log('Todo correcto' + value);
const error = await databaseStore.addUrl(formState.url);
if(!error) {
            formState.url= "";
            return message.success('URL agregada')
        }
        switch (error) {
            //buscar errores de firestore despues
            default:
            message.error('Falló algo desde firebase')
            break;
        }
}

</script>

<template>
    
    <a-form
    name="addForm"
    autocomplete="off"
    layout="vertical" 
    :model="formState"
    @finish="onFinish"
    >
    <a-form-item
    name="url"
    label = "Ingrese una URL"
    :rules = "[{
        required:true,
        whitespace: true,
        pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
        message: 'Ingrese una URL valida',
    }]"
    >
    <a-input v-model:value="formState.url"></a-input>

    </a-form-item>
    <a-form-item>
        <a-button
        type="primary" 
        html-type="submit"
        :loading="databaseStore.loading"
        :disabled="databaseStore.loading"
        :onFinish:databaseStore.loading = "false"
        >
            Agregar URL</a-button>
    </a-form-item>

    </a-form>

</template>



