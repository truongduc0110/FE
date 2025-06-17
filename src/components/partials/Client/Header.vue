
<template>
    <header class="border-b border-[#ddd] max-lg:bg-color-white max-lg:shadow-shadow-1 max-lg:sticky max-lg:top-0 max-lg:left-0 z-20">
        <div class="container mx-auto">
            <div class="flex justify-between items-center py-10 max-lg:py-2">
                <div class="flex gap-2 items-center max-lg:hidden">
                    <Location class="h-12 w-auto text-color-2"/>
                    <div class="text-sm text-color-1 hover:text-color-2 font-lato tracking-wider">
                        <p>523 Sylvan Ave</p>
                        <p>Mountain View, CA 94041 USA</p>
                    </div>
                </div>
                <div class="flex gap-2 items-center">
                    <span v-if="!opensidebar" @click="handleOpenSidebar" class="material-icons-sharp text-4xl lg:hidden cursor-pointer transition-all duration-400 ease-in-out ">menu</span>
                    <span v-else @click="handleOpenSidebar" class="material-icons-sharp text-4xl lg:hidden cursor-pointer transition-all duration-400 ease-in-out">close</span>
                    <img src="https://ld-wt73.template-help.com/wt_prod-23024/images/logo-default-231x49.png" alt="Logo" class="max-lg:max-h-[40px] max-lg:max-w-[200px]">
                </div>
              <div class="flex gap-2 items-center lg:hidden">
                  <Search class="h-7 w-auto"/>
                  <div class="relative cursor-pointer">
                    <div class="flex items-start gap-1" @click="activeCard">
                      <ShoppingCart class="h-7 w-auto"/>
                      <p class="text-xs text-color-2 font-medium"> {{ store.dataAll.quantity }}</p>
                    </div>
                  </div>
                <RouterLink :to="{ name : 'dashboard'}" class="border-[2px] border-color-2 h-8 flex justify-center items-center py-1 px-2 text-color-1 rounded-lg hover:bg-color-2 text-color-primary hover:text-color-white">
                  <span class="material-icons-sharp">leaderboard</span>
                </RouterLink>
                </div>
                <div class="flex items-center gap-2 max-lg:hidden">
                    <div class="flex items-center gap-2 border-[2px] border-color-2 h-11  py-3 px-8  text-color-1 rounded-lg hover:bg-color-2 hover:text-color-white">
                        <Message class="h-5 w-auto"/>
                        <p class="text-xs font-bold tracking-wider">GET IN TOUCH</p>
                    </div>
                    <div class="text-right z-[1000]" v-if="storeUser.user" >
                        <Menu as="div" class="relative inline-block text-left">
                            <div>
                                <MenuButton
                                class="inline-flex w-full justify-between  cursor-pointer border-[2px] border-color-2 py-3 px-8 rounded-lg hover:bg-color-2 text-color-1 hover:text-color-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                >
                                <p class="text-sm font-bold tracking-wider">Hi <span class="text-color-2">{{ storeUser.user.fullName }}</span></p>
                                <el-icon><ArrowDownBold class="text-color-2 text-xs"/></el-icon>
                                </MenuButton>
                            </div>

                            <transition
                                enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-in"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0"
                            >
                                <MenuItems
                                class="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                                >
                                <div>
                                    <MenuItem v-slot="{ active }">
                                    <button
                                        :class="[
                                        active ? 'bg-color-2 text-white' : 'text-gray-900',
                                        'group flex w-full items-center rounded-md p-3 text-sm font-semibold',
                                        ]"
                                        @click="logout"
                                    >
                                        Logout
                                    </button>
                                    </MenuItem>
                                </div>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                    <RouterLink v-else :to="{ name : 'loginClient'}" class="border-[2px] flex justify-center items-center border-color-2 h-11 py-3 px-8 text-color-1 rounded-lg hover:bg-color-2 hover:text-color-white">
                        <p class="text-xs font-bold tracking-wider">Login</p>
                    </RouterLink>
                  <RouterLink v-if="storeUser.user?.role === 'admin'" :to="{ name: 'dashboard' }"
                              class="border-[2px] border-color-2 h-11 flex justify-center items-center py-3 px-5 text-color-1 rounded-lg hover:bg-color-2 text-color-primary hover:text-color-white">
                    <span class="material-icons-sharp">leaderboard</span>
                  </RouterLink>
                </div>
            </div>
        </div>
    </header>
  <div :class="{
      'hidden': !opensidebar,
      'block': opensidebar,
      'fixed left-[-100%] w-[18rem] bg-color-white pt-4 h-screen z-20' : true}" class="sidebarclient lg:hidden">
    <ul class="text-color-1 text-xs font-semibold" >
      <li class="hover:bg-color-2 mb-1 hover:text-color-white" :class=" BreakCurmp === 'HOME' ? 'bg-color-2 text-color-white' : ''">
        <RouterLink :to="{ name : 'Home'}" class="py-3 inline-block tracking-widest relative ml-3">HOME </RouterLink>
      </li>
      <li @click="handleOpenDropdown" class="transition-all duration-300 ease-in-out cursor-pointer"
          :class=" BreakCurmp === 'Gallery' ? 'bg-color-2 text-color-white' : ''">
        <div class="flex justify-between items-center hover:bg-color-2 mb-1 hover:text-color-white ">
          <RouterLink :to="{ name: 'Gallery' }" class="py-3 inline-block tracking-widest relative text-xs ml-3">GALLERY</RouterLink>
          <span class="material-icons-sharp mr-3 text-base " :class="{'rotate-180' : openDropdown}">expand_more</span>
        </div>
        <ul :class="{
          'hidden': !openDropdown,
          'block': openDropdown
        }" class="w-full bg-color-white z-[5] text-left">
          <li class="block" v-for="item in ListCategory">
            <a href="#" class="text-sm text-color-4 leading-[1.2] font-semibold tracking-wider hover:text-color-2">{{ item.title }}</a>
          </li>
          <li class="hover:text-color-white hover:bg-color-2 py-3 pl-5 text-color-4">
            <RouterLink to="/" class="text-xs leading-[1.2] font-medium tracking-wider">Grid Gallery</RouterLink>
          </li>
        </ul>
      </li>
      <li class="hover:bg-color-2 mb-1 hover:text-color-white transition-all duration-300 ease-in-out"
          :class=" BreakCurmp === 'Shop' ? 'bg-color-2 text-color-white' : ''">
        <RouterLink :to="{ name: 'Shop' }" class="py-3 inline-block tracking-widest relative ml-3">
          SHOP </RouterLink>
      </li>
      <li class="hover:bg-color-2 mb-1 hover:text-color-white transition-all duration-300 ease-in-out"
          :class=" BreakCurmp === 'blogAdmin' ? 'bg-color-2 text-color-white' : ''">
        <RouterLink :to="{ name : 'blog'}" class="py-3 inline-block tracking-widest relative ml-3">
          BLOG </RouterLink>
      </li>
      <li class="hover:bg-color-2 mb-1 hover:text-color-white transition-all duration-300 ease-in-out"
          :class=" BreakCurmp === 'Shop' ? 'bg-color-2 text-color-white' : ''">
        <RouterLink to="#" class="py-3 inline-block tracking-widest relative ml-3">PAGES </RouterLink>
      </li>
      <li class="hover:bg-color-2 mb-1 hover:text-color-white transition-all duration-300 ease-in-out"
          :class=" BreakCurmp === 'Shop' ? 'bg-color-2 text-color-white' : ''">
        <RouterLink to="#" class="py-3 inline-block tracking-widest relative ml-3">ELEMENTS </RouterLink>
      </li>
      <li class="hover:bg-color-2 mb-1 hover:text-color-white transition-all duration-300 ease-in-out"
          :class=" BreakCurmp === 'Shop' ? 'bg-color-2 text-color-white' : ''">
        <RouterLink to="#" class="py-3 inline-block tracking-widest relative ml-3">CONTACT US </RouterLink>
      </li>
    </ul>
  </div>

    <div class="sticky top-0 left-0 bg-color-white z-[1000] shadow-shadow-1 max-lg:hidden">
        <div class="container mx-auto">
            <div class="flex justify-between items-center">
                <ul class="flex items-center justify-start text-color-1 text-sm font-semibold">
                    <li class="hover:text-color-2">
                        <RouterLink :to="{ name : 'Home'}" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2
                            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2
                            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear"
                            :class=" BreakCurmp === 'HOME' ? 'before:bg-color-2 before:w-full' : ''"
                            >HOME </RouterLink>
                    </li>
                    <li class="ml-10 galleery-header">
                        <RouterLink :to="{ name: 'Gallery' }" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2
                            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2
                            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear before:hover:bg-color-2 before:hover:w-full"
                            :class=" BreakCurmp === 'GALLERY' ? 'before:bg-color-2 before:w-full' : ''"
                            >
                        GALLERY </RouterLink>
                        <ul class="navbar absolute p-[30px]  bg-color-white z-[5] text-left opacity-0 invisible w-[400px] grid grid-cols-2 gap-2">
                            <li class="block text-center" v-for="item in ListCategory">
                                <img :src="item.thumbnail" :alt="item.title" class="h-20 mx-auto">
                                <a href="#" class="text-sm text-color-4 leading-[1.2] font-semibold tracking-wider hover:text-color-2 mt-2 text-center">{{ item.title }}</a>
                            </li>
                        </ul>
                    </li>
                    <li class="ml-10 ">
                        <RouterLink :to="{ name: 'Shop' }" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2
                            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2
                            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear before:hover:bg-color-2 before:hover:w-full"
                            :class=" BreakCurmp === 'SHOP' ? 'before:bg-color-2 before:w-full' : ''"
                            >
                        SHOP </RouterLink>
                    </li>
                    <li class="ml-10">
                        <RouterLink :to="{ name : 'blog'}" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2
                            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2
                            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear before:hover:bg-color-2 before:hover:w-full"
                            :class=" BreakCurmp === 'BLOG' ? 'before:bg-color-2 before:w-full' : ''"
                            >
                        BLOG </RouterLink>
                    </li>
                    <li class="ml-10">
                        <RouterLink to="#" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2
                            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2
                            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear before:hover:bg-color-2 before:hover:w-full"
                            :class=" BreakCurmp === 'PAGES' ? 'before:bg-color-2 before:w-full' : ''"
                            >PAGES </RouterLink>
                    </li>
                    <li class="ml-10">
                        <RouterLink to="#" class="py-6 inline-block tracking-widest relative before:content-[''] before:absolute before:top-0 before:left-1/2
                            before:h-2 before:w-[140%] before:transform before:-translate-x-1/2
                            before:-translate-y-1/2 before:transition-all before:duration-200 before:ease-linear before:hover:bg-color-2 before:hover:w-full">ELEMENTS </RouterLink>
                    </li>
                    <li class="ml-10">
                        <RouterLink to="#" class="py-6 inline-block tracking-widest">CONTACT US </RouterLink>
                    </li>
                </ul>
                <div>
                    <div class="flex gap-3 items-center">
                        <Search class="h-7 w-auto"/>
                        <div class="relative cursor-pointer">
                            <div class="flex items-start gap-1" @click="activeCard">
                                <ShoppingCart class="h-7 w-auto"/>
                                <p class="text-xs text-color-2 font-medium"> {{ cartTotal }}</p>
                            </div>
                            <div :class="active ? 'active' : ''" class="cart-inline" >
                                <div class="p-5">
                                    <div class="text-lg font-semibold  text-color-1 tracking-wider ">IN CART: {{ store.dataAll.quantity }} PRODUCTS</div>
                                    <div class="text-base tracking-spacing-2 font-semibold text-color-1">TOTAL PRICE: {{ formatPrice(store.dataAll.totalPrice) }} VND</div>
                                </div>
                                <div class="flex items-center p-3 border-t border-border-color-2 gap-5" v-for="(item, index) in store.dataAll.data" :key="item.id">
                                    <img :src="item.image" alt="Image" class="w-[100px] h-[90px]">
                                    <div>
                                        <div class="text-base text-color-1 font-semibold">{{ item.title }}</div>
                                        <div class="flex items-center">
                                            <div class="flex items-center my-3">
                                                <span class="h-9 w-9 text-3xl bg-color-white border border-border-color-2 text-color-1 text-center rounded-md cursor-pointer" 
                                                     @click="handleDecre(index)">-</span>
                                                <input type="number" v-model="item.quantity" min="1" max="100" 
                                                    class="no-spinner text-xl text-color-1 rounded-md text-center focus:outline-none w-1/6">
                                                <span class="h-9 w-9 text-3xl bg-color-white border border-border-color-2 text-color-1 text-center rounded-md cursor-pointer" 
                                                    @click="handleIncre(index)">+</span>
                                            </div>
                                            <div class="text-base text-color-1 font-semibold">{{ formatPrice(item.price) }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-5 flex justify-between border-t border-border-color-2">
                                    <RouterLink :to="{ name : 'cart'}">
                                        <button class=" text-sm font-bold text-color-1 py-[14px] px-[34px] border-2 border-color-1 rounded-md hover:border-color-2 hover:bg-color-2 hover:text-color-white">GO TO CARD</button>
                                    </RouterLink>
                                    <RouterLink :to="{ name : 'checkout'}">
                                        <button class=" text-sm font-bold text-color-white py-[14px] px-[34px] bg-color-2 rounded-lg hover:bg-color-6">CHECKOUT</button>
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { computed, onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue'
import {deleteProduct, getCart} from '@/service/cartService';
import { changeQuantity } from '@/service/cartService';
import { useUserStore, useProduct } from '@/stores/local';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { getCategoryList } from '@/service/categoryService';
import Cookies from "js-cookie";

const active = ref(false)
const cartId = localStorage.getItem("cartId")
const store = useProduct();
const storeUser = useUserStore()
const router = useRouter();
const ListCategory = ref([])
const opensidebar = ref(false);
const openDropdown = ref(false);

const cartTotal = computed(() => store.dataAll?.data?.length || 0);

const handleOpenSidebar = () =>{
  opensidebar.value = !opensidebar.value;
}

const handleOpenDropdown = () =>{
  openDropdown.value = !openDropdown.value;
}

const fetchApi = async ()=>{
  const result = await getCart({
    cart_id : localStorage.getItem("cartId")
  })
  if(result){
    store.dataAll = result
  }
}
const fetchListCategory = async () =>{
  const result = await getCategoryList()
  if(result){
    ListCategory.value = result.data.data;
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

onMounted(() => {
  fetchApi();
  fetchListCategory();
})

const handleIncre = async (index) => {
  store.dataAll.data[index].quantity++;
  store.dataAll.data[index].totalPrice = store.dataAll.data[index].quantity * store.dataAll.data[index].price
  store.dataAll.totalPrice += store.dataAll.data[index].price;
  store.dataAll.quantity++;

  const result = await changeQuantity({
    "product_id" : store.dataAll.data[index].id,
    "quantity": store.dataAll.data[index].quantity,
    "cartId": cartId
  });
  if(result){
    console.log("ok");
  }
};

const handleDecre = async (index) => {
  if(store.dataAll.data[index].quantity > 1){
    store.dataAll.data[index].quantity--;
    store.dataAll.data[index].totalPrice = store.dataAll.data[index].quantity * store.dataAll.data[index].price
    store.dataAll.totalPrice -= store.dataAll.data[index].price;
    store.dataAll.quantity--;
  }
  else{
    handleDelete(store.dataAll.data[index].id, index);
  }
  const result = await changeQuantity({
    "product_id" : store.dataAll.data[index].id,
    "quantity": store.dataAll.data[index].quantity,
    "cartId": cartId
  });
  if(result){
    console.log("ok");
  }
};
const handleDelete = async (id,index) =>{
  const result = await deleteProduct({
    'product_id' : id
  });
  if(result){
    store.dataAll.data.splice(index, 1);
  }
}
const route = useRoute();
const BreakCurmp = computed(() => {
  return route.name ? route.name.toUpperCase() : '';
});
const activeCard = () =>{
  active.value = !active.value;
}

const logout = () =>{
  Cookies.remove("token");
  localStorage.removeItem("cartId");
  storeUser.logout();
}
</script>
