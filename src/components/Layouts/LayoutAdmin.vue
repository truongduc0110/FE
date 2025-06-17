<template>
  <div class="layoutAdmin">
    <Header :toggleSidebar="toggleSidebar" :toggleLightMode="toggleLightMode" :light="light"/>
    <Sidebar :toggleSidebar="toggleSidebar" :openSidebar="openSidebar" />
    <main class="mt-5 max-md:mt-[8rem] py-0 px-4 w-[calc(100%-14rem)] max-lg:w-[calc(100%-7rem)] ml-56 max-lg:ml-28 max-md:ml-0 max-md:w-full max-md:px-1">
      <slot />
    </main>
  </div>
</template>
<script>
import Header from '@/components/partials/Admin/Header.vue';
import Sidebar from '@/components/partials/Admin/Sidebar.vue';
  export default {
    data(){
      return{
        openSidebar : false,
        light : false
      }
    },
    components:{
      Header,
      Sidebar
    },
    watch: {
      light(newVal) {
        if (newVal) {
          document.body.classList.add("dark-theme-variables");
        } else {
          document.body.classList.remove("dark-theme-variables");
        }
      },
    },
    methods : {
      toggleSidebar() {
        this.openSidebar = !this.openSidebar;
      },
      toggleLightMode() {
        this.light = !this.light;
      },
    }
  }
</script>