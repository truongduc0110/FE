<template>
  <div class="mt-6 max-md:w-[94%] max-md:mt-0 max-md:mx-auto max-md:mb-[4rem] w-[96%]">
    <div class="flex justify-end gap-8 max-md:fixed max-md:top-0 max-md:left-0 max-md:items-center max-md:py-0 max-md:px-3
            max-md:h-[4.6rem] max-md:w-full m-0 z-[2] max-md:shadow-shadow-4">
      <button @click="toggleSidebar" class="hidden max-md:inline-block max-md:bg-transparent max-md:cursor-pointer max-md:text-color-dark max-md:absolute
              max-md:left-4">
            <span class="material-icons-sharp">menu</span>
      </button>
      <div @click="toggleLightMode" class="bg-color-light flex justify-between items-center h-6 w-16 cursor-pointer rounded-border-radius-1 max-md:w-[4.4rem]
              max-md:absolute max-md:left-2/3">
        <span :class="{
          'bg-color-primary text-white' : !light
        }" class="material-icons-sharp text-base w-1/2 h-full flex justify-center items-center rounded-border-radius-1 text-color-dark transition-all duration-300 ease-in-out">light_mode</span>
        <span :class="{
          'bg-color-primary text-white' : light
        }"
              class="material-icons-sharp text-base w-1/2 h-full flex justify-center items-center rounded-border-radius-1 text-color-dark transition-all duration-300 ease-in-out">dark_mode</span>
      </div>
      <div class="flex gap-8 text-right ">
        <div class="max-md:hidden text-color-dark">
          <p>Hey, <b>{{user.fullName }}</b></p>
          <small>{{ user.roleTitle }}</small>
        </div>
        <div class="h-8 w-8">
          <img src="@/assets/images/profile-1.jpg" alt="Profile" class="rounded-full">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        user : []
      }
    },
    props:{
      toggleSidebar :{
        type : Function,
        required : true
      },
      toggleLightMode :{
        type : Function,
        required : true
      },
      light:{
        type : Boolean,
        required : true
      }
    },
    mounted() {
      // Lấy dữ liệu từ localStorage khi trang tải lên
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },
  }
</script>