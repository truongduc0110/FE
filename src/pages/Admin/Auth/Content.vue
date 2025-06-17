
<template>
    <div>
        <div class="bg-slate-800 border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <h1 class="text-4xl text-color-white font-bold text-center mb-6">Admin</h1>
            <div class="relative my-5">
                <input v-model="data.email" type="email" class="block w-72 py-2 px-0 text-sm text-color-white bg-transparent border-0 border-b-2 
                    border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-color-white focus:border-blue-600 peer ">
                <label for="" class="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:translate-y-6">Your Mail</label>
            </div>
            <div class="relative my-5">
                <input v-model="data.password" type="password" class="block w-72 py-2 px-0 text-sm text-color-white bg-transparent border-0 border-b-2 
                    border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-color-white focus:border-blue-600 peer">
                <label for="" class="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:translate-y-6">Your Password</label>
            </div>
            <button @click="handleSubmit" class="w-full mb-4 text-lg mt-6 rounded-full bg-color-white text-emerald-800 hover:bg-emerald-600 hover:text-color-white py-2 transition-colors duration-300">Login</button>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { login } from '../../../service/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const data = ref(
    {
      "email": "",
      "password": "",
    }
)

const handleSubmit = async () =>{
  const result = await login(data.value)
  if(result.message == "Success"){
    localStorage.token = result.info.token;
    router.replace({name : 'dashboard'})
  }else{
    alert('Tài khoản không đúng hoặc sai mật khẩu')
  }

}


</script>
