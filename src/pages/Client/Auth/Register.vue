
<template>
    <div class="text-color-white h-[100vh] flex justify-center items-center bg-contain bg-background-image-7">
        <div class="bg-slate-900 border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative w-1/3">
            <h1 class="text-4xl text-color-white font-bold text-center mb-6">Register</h1>
            <div class="relative my-5">
                <input v-model="data.email" type="email" class="block w-full py-2 px-0 text-sm text-color-white bg-transparent border-0 border-b-2
                    border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-color-white focus:border-blue-600 peer ">
                <label for="" class="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:translate-y-6">Your Mail</label>
            </div>
            <div class="relative my-5">
                <input v-model="data.password" type="password" class="block w-full py-2 px-0 text-sm text-color-white bg-transparent border-0 border-b-2
                    border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-color-white focus:border-blue-600 peer">
                <label for="" class="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:translate-y-6">Your Password</label>
            </div>
            <div class="relative my-5">
                <input v-model="data.confirm" type="password" class="block w-full py-2 px-0 text-sm text-color-white bg-transparent border-0 border-b-2
                    border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-color-white focus:border-blue-600 peer">
                <label for="" class="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:translate-y-6">Confirm Your Password</label>
            </div>
            <div class="relative my-5">
                <input v-model="data.fullName" type="text" class="block w-full py-2 px-0 text-sm text-color-white bg-transparent border-0 border-b-2
                    border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-color-white focus:border-blue-600 peer">
                <label for="" class="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:translate-y-6">FullName</label>
            </div>
            <div class="relative my-5">
              <input v-model="data.phone" type="text" class="block w-72 w-full px-0 text-sm text-color-white bg-transparent border-0 border-b-2
                      border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-color-white focus:border-blue-600 peer">
              <label for="" class="absolute text-base text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                      peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                      peer-focus:scale-75 peer-focus:translate-y-6">Phone</label>
            </div>
            <button @click="handleSubmit" class="w-full mb-4 text-lg mt-6 rounded-full bg-color-white text-emerald-800
              hover:bg-emerald-600 hover:text-color-white py-2 transition-colors duration-300">Register</button>
            <div class="mt-4">
                <span class="text-sm">Already Create an Account? <RouterLink :to="{ name : 'loginClient'}" class="text-blue-500"> Login</RouterLink></span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { register } from '@/service/auth.js';

const router = useRouter();
const data = ref(
    {
      "fullName": "",
      "email": "",
      "phone": "",
      "password" : "",
      "confirm" : "",
      "roleId" : 2,
    }
)

const handleSubmit = async () =>{
  if (!data.value.email || !data.value.password || !data.value.fullName || !data.value.phone || !data.value.confirm) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.value.email)) {
    alert("Email không đúng định dạng.");
    return;
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(data.value.password)) {
    alert(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ thường, chữ in hoa, chữ số và ký tự đặc biệt."
    );
    return;
  }
  if(data.value.password !== data.value.confirm){
    alert("Mật khẩu xác nhận không trùng khớp")
    return;
  }
  const result = await register(data.value)
  if(result.message == "Đăng ký tài khoản thành công"){
    router.replace({name : 'loginClient'})
  }else{
    alert('Tài khoản đã tồn tại!')
  }
}


</script>
