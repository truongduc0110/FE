
<script setup>
import { ref } from 'vue';
import { Login } from '@/service/userService';
import { RouterLink, useRouter } from 'vue-router';
import { ForgotPassword } from '../../../service/userService';

    const router = useRouter();
    const data = ref(
        {
            "email": "",
        }
    )
    
    const handleSubmit = async () =>{
        const result = await ForgotPassword(data.value)
        if(result.message == "Success"){
            router.push({name : 'otp-password'})
        }else{
            alert('Tài khoản không tồn tại!')
        }
    }
    
    
</script>

<template>
    <div class="text-color-white h-[100vh] flex justify-center items-center bg-contain bg-background-image-7">
        <div class="bg-slate-900 border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <h1 class="text-4xl text-color-white font-bold text-center mb-6">Forgot Password</h1>
            <div class="relative my-5">
                <input v-model="data.email" type="email" class="block w-72 py-2 px-0 text-sm text-color-white bg-transparent border-0 border-b-2 
                    border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-color-white focus:border-blue-600 peer ">
                <label for="" class="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:translate-y-6">Your Mail</label>
            </div>
            <button @click="handleSubmit" class="w-full mb-4 text-lg mt-6 rounded-full bg-color-white text-emerald-800
                 hover:bg-emerald-600 hover:text-color-white py-2 transition-colors duration-300">Xác nhận</button>
            <div class="mt-4">
                <span class="text-sm">New Here? <RouterLink :to="{ name : 'register'}" class="text-blue-500"> Create a Account</RouterLink></span>
            </div>
        </div>
    </div>
</template>