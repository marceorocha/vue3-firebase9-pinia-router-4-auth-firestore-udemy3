<template>
    <h1 class="text-center">Login</h1>
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
                    @click="success"
                    :loading="userStore.loadingUser"

                    >Acceso</a-button>
                </a-form-item>
            </a-form>


        </a-col>
    </a-row>
</template>

<script setup>
    import { reactive } from 'vue';
    import {useUserStore} from '../stores/user';
    import { message } from 'ant-design-vue'

    const userStore = useUserStore()

    const formState = reactive ({
        email: '', 
        password: ''
    })
     

    const onFinish = async(values) => {
        const error = await userStore.loginUser(formState.email, formState.password);
        console.log('Success:', values);

        if(!error) {
            return message.success("Bienvenido!")
        }
        switch (error) {
            case 'auth/user-not-found':
            message.error('No existe esa cuenta');
            break;
            case 'auth/wrong-password':
            message.error('Error en la contraseña');
            break;
            case 'auth/too-many-requests':
            message.error('muchos intentos fallidos, intente mas tarde')
            default:
            message.error('Falló algo desde firebase')
            break;
        }
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const success = () => {
  const hide = message.loading('Accediendo a su cuenta..', 0);
  setTimeout(hide, 2500);
};
</script>