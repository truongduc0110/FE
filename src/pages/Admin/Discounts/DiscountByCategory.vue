
<template>
  <h1 class="text-2xl font-bold text-color-dark max-md:text-xl max-lg:text-center">Mã giảm giá theo danh mục </h1>
  <div class="mt-8 md:container max-md:px-2 mx-auto product">
    <RouterLink :to="{ name : 'create-discount'}">
      <button class="px-5 font-semibold py-2 bg-color-13 text-sm text-color-white rounded-lg max-md:px-3">Thêm mã giảm giá </button>
    </RouterLink>
    <RouterLink :to="{ name : 'discounts'}">
      <button class="px-5 font-semibold py-2 bg-color-13 text-sm text-color-white rounded-lg max-md:px-3 ml-5">Danh sách mã giảm giá </button>
    </RouterLink>
    <div class="bg-color-white-2 mt-10 rounded-lg max-md:rounded-lg text-center shadow-shadow-5 transition-all duration-300
      ease-in-out hover:shadow-none max-md:px-2">
      <div class="py-5 pl-3 max-lg:py-3 max-md:pl-1">
        <div class="h-10 relative border pl-3 border-color-light w-1/2 rounded-lg flex justify-between items-center max-md:h-8">
          <input v-model="searchQuery" @input="searchProducts" placeholder="Nhập từ khóa..." type="search" class="w-full bg-color-white-2 outline-none text-color-9 text-base max-md:text-xs">
          <button class="px-2 hover:text-color-2 text-color-3">
            <span class="material-icons-sharp text-3xl max-md:text-xl">search</span>
          </button>
        </div>
      </div>
      <div class="overflow-x-auto w-full max-md:my-0 max-md:mx-auto">
        <table class="w-full border-collapse min-w-[600px]">
          <thead>
          <tr class="border-b border-color-light">
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark whitespace-nowrap">STT</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">
              <div class="flex gap-2 items-center justify-center">
                Mã
                <svg class="cursor-pointer" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.62402 2.25024V9.62525M8.62402 9.62525L10.875 6.87512M8.62402 9.62525L6.375 6.87512" stroke="#475467" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.37402 9.75012V2.37512M3.37402 2.37512L5.625 5.12524M3.37402 2.37512L1.125 5.12524" stroke="#98A2B3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark whitespace-nowrap">
              <div class="flex gap-2 items-center justify-center">
                Giá trị
                <svg  class="cursor-pointer" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.62402 2.25024V9.62525M8.62402 9.62525L10.875 6.87512M8.62402 9.62525L6.375 6.87512" stroke="#475467" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.37402 9.75012V2.37512M3.37402 2.37512L5.625 5.12524M3.37402 2.37512L1.125 5.12524" stroke="#98A2B3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark whitespace-nowrap">
              <div class="flex gap-2 items-center justify-center">
                Danh mục
                <svg class="cursor-pointer" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.62402 2.25024V9.62525M8.62402 9.62525L10.875 6.87512M8.62402 9.62525L6.375 6.87512" stroke="#475467" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.37402 9.75012V2.37512M3.37402 2.37512L5.625 5.12524M3.37402 2.37512L1.125 5.12524" stroke="#98A2B3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Trạng thái</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Hành động</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in dataDiscounts">
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap" >{{ index + 1 }}</td>
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap">{{ item.code }}</td>
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap">{{ item.value }} {{ item.type === 'percent' ? '%' : 'VND' }}</td>
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap">{{ item.title }}</td>
            <td class="h-10 border-b border-color-light text-color-dark">
              <button
                  :class="{'bg-color-primary': item.is_active == true,
                            'bg-color-danger' : item.is_active == false
                    }"
                  class="px-4 py-1 text-color-white rounded-lg text-base font-semibold max-md:text-xs max-md:px-2">{{ item.is_active ? 'Active' : 'Inactive' }}</button>
            </td>
            <td class="h-10 border-b border-color-light text-color-dark whitespace-nowrap">
              <button @click="handleDelete(item.id)" class="px-5 font-semibold py-1 bg-color-2 ml-1 text-color-white rounded-lg max-md:text-xs max-md:px-2 whitespace-nowrap">Xóa</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="totalPage*10" @change="handlePageChange" />
  </div>

</template>

<script>
import { ElNotification } from 'element-plus';
import {
  deleteDiscount,
  deleteDiscountCategory,
  getDiscountList,
  getDiscountOfCategory
} from "@/service/DiscountsServive.js";

export default {
  data(){
    return{
      dataDiscounts : [],
      searchQuery: "",
      allDiscounts: [],
      totalPage: 0,
      sortKey: "",
      sortAscending: true
    }
  },
  methods:{
    async handleDelete (id){
      const result = await deleteDiscountCategory(id)
      if(result){
        ElNotification({
          title: 'Success',
          message: 'Xóa thành mã giảm giá',
          type: 'success',
        })
        await this.loadDiscounts();
      }
    },
    async loadDiscounts(page = 1) {
      try {
        const result = await getDiscountOfCategory();
        console.log(result)
        this.dataDiscounts = result.discounts;
        this.allDiscounts = result.discounts;
      } catch (err) {
        console.log("Lỗi khi lấy danh sách sản phẩm");
      }
    },
    searchProducts() {
      if (!this.searchQuery) {
        this.dataDiscounts = this.allDiscounts; // Nếu không có từ khóa, hiển thị danh sách gốc
      } else {
        this.dataDiscounts = this.allDiscounts.filter((product) =>
            product.code.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    handlePageChange(page) {
      this.loadDiscounts(page);
    },
  },
  async created(){
    await this.loadDiscounts();
  }
}
</script>
