<template>
    <h1 class="text-center">Register</h1>
    <a-row>
        <a-col :xs="{span: 24}" :sm="{span: 12, offset: 6}">
        <a-form 
            name="register" 
            autocomplete="off" 
            layout="vertical" 
            :model="formState"
            @finish="onFinish"
            >
            <a-form-item
            name="email"
            label="Ingrese su mail"
            :rules="[{
                required: true,
                whitespace: true,
                message:
                'Ingrese un mail valido'
            }]"
            >   
            <a-input v-model:value="formState.email"></a-input>
        </a-form-item>
            <a-form-item
            name="password"
            label="Ingrese contraseña"
            :rules="[{
                required: true,
                min: 6,
                whitespace: true,
                message:
                'Ingrese una contraseña de mínimo 6 caracteres'
            }]"
            >   
            <a-input-password v-model:value="formState.password"> </a-input-password>

            </a-form-item>
            <a-form-item
            name="repassword"
            label="Repita contraseña"
            :rules="[{
                validator: validatePass,
            }]"
            >   
            <a-input-password v-model:value="formState.repassword"> </a-input-password>

            </a-form-item>
            <a-form-item>
            <a-button type="primary" 
            :disabled="userStore.loadingUser"
            html-type="submit"
            :loading="userStore.loadingUser"
            >
            Crear usuario</a-button>
            </a-form-item>
        </a-form>
    </a-col>
    </a-row>
</template>

<script setup>
    import { reactive } from 'vue';
    import {useUserStore} from '../stores/user';
    import { message } from 'ant-design-vue';

    const userStore = useUserStore()


    const formState = reactive ({
        email: '', 
        password: '',
        repassword: '',
    })
    
    const validatePass= async(_rule, value) => {
        if(value === '') {
            return Promise.refect('Repita contraseña')
        }
        if (value !== formState.password) {
            return Promise.reject('No coinciden las contraseñas')
        }
        return Promise.resolve()
    }

    const onFinish = async(values) => {
        console.log('Success:', values);
        const error = await userStore.registerUser(formState.email, formState.password);
        if(!error) {
            return message.success("Bienvenido! Verifica tu correo electronico.")
        }
        
        switch (error) {
            case 'auth/email-already-in-use':
            message.error('Usuario ya existe');
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

</script>