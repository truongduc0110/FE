
<template>
    <div class="filter-shop">
        <p class="text-base text-color-1 font-semibold tracking-spacing-2 pb-4 border-b border-border-color-2">FILTER BY PRICE</p>
        <div class="slider-demo-block">
            <el-slider v-model="value" range  :max="1000000"/>
        </div>
        <div class="flex justify-between items-center">
            <button @click="handleFilter" class="text-sm font-bold text-color-white py-3 px-7 bg-color-2 rounded-lg hover:bg-color-6">FILTER</button>
            <div class="flex justify-center gap-3 text-[15px] text-color-1 tracking-wider">Price: <p>{{ value[0] }}</p>- <p>{{ value[1] }}</p></div>
        </div>
        <p class="text-base text-color-1 font-semibold tracking-spacing-2 pb-4 border-b border-border-color-2 mt-10">CATEGORIES</p>
      <label class="flex items-center justify-between custom-checkbox gap-2 w-full max-md:p-3 max-md:px-2 mt-3">
        <div class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="hidden" v-model="selectAll" @change="toggleSelectAll">
          <span class="checkmark w-5 h-5 rounded-sm relative"></span>
          <div class="text-[15px] text-color-4 font-medium">All</div>
        </div>
        <div class="tracking-widest text-[15px] text-color-4 font-medium">{{ TotalCategory }}</div>
      </label>
      <label v-for="item in ListCategory" :key="item.id" class="flex items-center justify-between custom-checkbox gap-2 w-full max-md:p-3 max-md:px-2 mt-3">
        <div class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="hidden" v-model="selectedCategories" :value="item.id" @change="updateCategoryFilter">
          <span class="checkmark w-5 h-5 rounded-sm relative"></span>
          <div class="text-[15px] text-color-4 font-medium">{{ item.title }}</div>
        </div>
      </label>
        <div class="bg-color-8 flex min-h-16 items-center rounded-lg my-6">
            <input v-model="searchQuery"
                   @input="handleSearch"
                   type="text"
                   placeholder="Search in shop"
                   class="focus:outline-none w-full bg-color-8 py-4 pl-6 pr-14">
            <button class="h-14 w-14 px-1">
                <Search class="h-7 w-auto"/>
            </button>
        </div>
        <div>
           <p class="text-base text-color-1 font-semibold tracking-spacing-2 pb-4 border-b border-border-color-2 mt-10">POPULAR PRODUCTS</p>
          <div v-for="item in popularProducts" class="flex gap-3 items-center py-5">
            <div class="w-28 h-28 ">
              <img :src="item.image" alt="Image" class="bg-color-10">
            </div>
            <div class="text-[15px]">
              <RouterLink :to="`product/${item.id}`" class="text-color-1 tracking-wider hover:text-color-2 font-medium">{{ item.title }}</RouterLink>
              <div class="text-color-2 font-semibold">{{ formatPrice(item.price) }} đ</div>
            </div>
          </div>
        </div>

    </div>
    
</template>

<script>
import {getPopularProducts} from "@/service/productsService.js";

export default {
  props: {
    maxPrice: Number,
    minPrice: Number,
    TotalCategory: Number,
    ListCategory : Array
  },
  data() {
    return {
      value: [this.minPrice, this.maxPrice],
      searchQuery: "",
      popularProducts : [],
      selectedCategories: [],
      selectAll: true
    };
  },
  methods: {
    handleFilter() {
      this.$emit("updatePriceRange", { minPrice: this.value[0], maxPrice: this.value[1] });
    },
    handleSearch() {
      this.$emit("updateSearchQuery", this.searchQuery); // Gửi từ khóa tìm kiếm lên component cha
    },
    async loadPopularProducts(){
      const result = await getPopularProducts();
      if(result){
        this.popularProducts = result.data;
      }
    },
    formatPrice(price){
      return new Intl.NumberFormat('vi-VN').format(price);
    },
    updateCategoryFilter() {
      this.selectAll = this.selectedCategories.length === 0;
      this.$emit("updateCategoryFilter", this.selectedCategories);
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedCategories = [];
      } else {
        this.selectedCategories = this.ListCategory.map(item => item.id);
      }
      this.updateCategoryFilter();
    }
  },
  async created(){
    await this.loadPopularProducts();
  }
};
</script>


<style scoped>

.custom-checkbox {
  user-select: none;
}
.custom-checkbox .checkmark {
  border: 1px solid rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

.custom-checkbox input:checked + .checkmark {
  background-color: #c14679;
  border-color: #c14679;
}

.custom-checkbox input:checked + .checkmark::after {
  content: "✔";
  color: white;
  font-size: 15px;
  font-weight: 600;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

</style>


