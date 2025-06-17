<template>
  <div class="container mx-auto py-10">
    <div class="flex justify-between gap-5">
      <div class="w-1/4 max-lg:hidden">
<!--        Content Left-->
        <div class="filter-shop">
          <p class="text-base text-color-1 font-semibold tracking-spacing-2 pb-4 border-b border-border-color-2">FILTER BY PRICE</p>
          <div class="slider-demo-block">
            <el-slider v-model="dataSearchPrice" range  :max="1000000"/>
          </div>
          <div class="flex justify-between items-center">
            <button @click="filterProducts(1)" class="text-sm font-bold text-color-white py-3 px-7 bg-color-2 rounded-lg hover:bg-color-6">FILTER</button>
            <div class="flex justify-center gap-3 text-[15px] text-color-1 tracking-wider">Price: <p>{{ formatPrice(dataSearchPrice[0]) }}</p>- <p>{{ formatPrice(dataSearchPrice[1]) }}</p></div>
          </div>
          <p class="text-base text-color-1 font-semibold tracking-spacing-2 pb-4 border-b border-border-color-2 mt-10">CATEGORIES</p>
          <label class="flex items-center justify-between custom-checkbox gap-2 w-full max-md:p-3 max-md:px-2 mt-3 cursor-pointer">
            <span class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="hidden" :checked="isAllSelected" @change="toggleSelectAll">
              <span class="checkmark w-5 h-5 rounded-sm relative"></span>
              <span class="text-[15px] text-color-4 font-medium">All</span>
            </span>
            <span class="tracking-widest text-[15px] text-color-4 font-medium">{{ ListCategory.record_total }}</span>
          </label>
          <label v-for="item in ListCategory.data" :key="item.id" class="flex items-center justify-between custom-checkbox gap-2 w-full max-md:p-3 max-md:px-2 mt-3">
            <span class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="hidden" v-model="selectedCategories" :value="item.id">
              <span class="checkmark w-5 h-5 rounded-sm relative"></span>
              <span class="text-[15px] text-color-4 font-medium">{{ item.title }}</span>
            </span>
          </label>
          <div class="bg-color-8 flex min-h-16 items-center rounded-lg my-6">
            <input
                   type="text"
                   placeholder="Search in shop"
                   v-model="searchName"
                   class="focus:outline-none w-full bg-color-8 py-4 pl-6 pr-14">
            <button @click="filterProducts(1)" class="h-14 w-14 px-1">
              <Search  class="h-7 w-auto"/>
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
      </div>
      <div class="flex-1">
        <div class="pb-8 text-[15px] text-color-1 tracking-wider">Showing {{startItem}}–{{endItem}} of {{this.products.record_total}} results</div>
        <div v-if="products.data" class="grid grid-cols-3 gap-5 max-md:grid-cols-2">
          <div class="pb-5" v-for="product in products.data" :key="product.id">
            <article class="relative text-center px-4 pt-5 pb-10 max-w-[300px] mx-auto z-10 product bg-color-10">
              <div class="transition-all duration-200 ease-in-out">
                <div class="min-h-[200px] flex items-end justify-center">
                  <img :src="product.image"  alt="" class="w-[152px] h-[160px]">
                </div>
                <div class="mt-5">
                  <RouterLink :to="`/product/${product.id}`" class="font-medium text-lg text-color-1 hover:text-color-2 transition-all duration-200 ease-in-out">{{ product.title }}</RouterLink>
                </div>
                <div>
                  <div v-if="product.oldPrice" class="line-through text-color-12 inline-block text-font-15">${{ product.oldPrice }}</div>
                  <div class="text-color-2 inline-block text-font-15 font-bold ml-4">{{ formatPrice(product.price)}} VND</div>
                </div>
              </div>
              <span class="transition-all duration-200 ease-in-out bg-color-2 inline-block text-center absolute top-6 right-4 py-[5px] px-3 text-sm font-semibold tracking-wide uppercase text-color-white rounded-md">Sale</span>
              <div class="flex justify-center items-end absolute top-0 bottom-0 right-0 left-0 content-none px-5
                            pt-5 pb-10 bg-color-10 rounded-md transition-all duration-200 ease-in-out z-[-1] product-more-shop">
                <div>
                  <div class="flex gap-5 items-center justify-center mt-5 list-shop-more">
                    <div class="p-3 bg-color-2 rounded-radius-1 product-icon opacity-0 scale-0 transition-all duration-200 ease-in-out">
                      <Search class="h-5 w-auto text-color-white"/>
                    </div>
                    <div class="p-3 bg-color-2 rounded-radius-1 product-icon opacity-0 scale-0 transition-all duration-200 ease-in-out">
                      <ShoppingCart class="h-5 w-auto text-color-white"/>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div v-else class="text-md text-color-4 text-center">Không có sản phẩm nào</div>
        <el-pagination background layout="prev, pager, next" :total="products.total_page*10" @current-change="handlePageChange" />
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/pages/Client/Shop/List.vue";
import ContentLeft from "@/pages/Client/Shop/ContentLeft.vue";
import {getPopularProducts, getProductList, getProductOfCategory} from "@/service/productsService.js";
import {getCategoryList} from "@/service/categoryService.js";

export default {
  components: {
    List,
    ContentLeft,
  },
  data() {
    return {
      products: {},
      ListCategory : {},
      selectedCategories : [],
      dataSearchPrice : [0, 10000000],
      popularProducts : [],
      searchName: "",
    };
  },
  methods: {
    async loadCategory(){
      const category = this.$route.query.category;
      const result = await getCategoryList();
      if(result){
        this.ListCategory = result.data;
        if(category){
          this.selectedCategories.push(category)
        }else{
          this.selectedCategories = result.data.data.map((cat) => cat.id);
        }
      }
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
    handlePageChange(page) {
      this.filterProducts(page);
    },
    async filterProducts(page = 1) {
      try {
        const params = {
          page: page,
          title: this.searchName.trim(),
          category: this.selectedCategories.length > 0 ? this.selectedCategories.join(",") : null,
          min_price: this.dataSearchPrice[0],
          max_price: this.dataSearchPrice[1],
        };
        const result = await getProductOfCategory(params);
        if (result) {
          this.products = result.data;
        }
      } catch (err) {
        console.error("Lỗi khi lọc sản phẩm", err);
      }
    },
    toggleSelectAll(event) {
      const checked = event.target.checked;
      if (checked) {
        this.selectedCategories = this.ListCategory.data.map((cat) => cat.id);
      } else {
        this.selectedCategories = [];
      }
    }
  },
  watch: {
    selectedCategories: {
      handler() {
        this.filterProducts(1);
      },
      deep: true,
    },
  },
  computed: {
    isAllSelected() {
      return (
          this.ListCategory.data &&
          this.ListCategory.data.length > 0 &&
          this.selectedCategories.length === this.ListCategory.data.length
      );
    },
    startItem(){
      return (this.products.current_page - 1) * this.products.limit + 1;
    },
    endItem(){
      return Math.min(this.products.current_page * this.products.limit, this.products.record_total);
    }
  },
  async created() {
    await this.loadCategory();
    await this.loadPopularProducts();
    await this.filterProducts();
  },
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
