<template>
    <a-row>
        <a-col :xs="{span: 24}" :sm="{span: 12, offset: 6}">


            <a-form 
            name="basicLogin" 
            autocomplete="off" 
            layout="vertical" 
            :model="formState"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            >
                <a-form-item 
                name="email" 
                label="Ingrese su correo" 
                :rules="[
                    {required:true, message:'Ingresa un email valido', type:'email'}
                ]"
                >
                    <a-input v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item 
                name="password" 
                label="Ingrese su password"
                :rules="[
                    {required:true, min:6, message:'Ingresa una contraseña con minimo 6 caracteres'}
                ]" 
                >
                    <a-input-password 
                    v-model:value="formState.password"
                    ></a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button 
                    type="primary"
                    html-type="submit" 
                    :disabled="userStore.loadingUser"
                    >Acceso</a-button>
                </a-form-item>
            </a-form>


        </a-col>
    </a-row>
</template>

<script setup>
    import { reactive } from 'vue';
    import {useUserStore} from '../stores/user'

    const userStore = useUserStore()

    const formState = reactive ({
        email: 'marchelor@gmail.com', 
        password: '12345678'
    })
     

    const onFinish = async(values) => {
        await userStore.loginUser(formState.email, formState.password)
        console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
</script>