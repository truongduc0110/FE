
<template>
  <h1 class="text-2xl font-bold text-color-dark max-md:text-xl max-lg:text-center">Banner quảng cáo</h1>
  <div class="mt-8 md:container max-md:px-2 mx-auto product">
    <RouterLink :to="{ name : 'create-banner'}">
      <button class="px-5 font-semibold py-2 bg-color-13 text-sm text-color-white rounded-lg max-md:px-3">Thêm banner</button>
    </RouterLink>
    <div class="bg-color-white-2 mt-10 rounded-lg max-md:rounded-lg text-center shadow-shadow-5 transition-all duration-300
      ease-in-out hover:shadow-none max-md:px-2">
      <div class="py-5 pl-3 max-lg:py-3 max-md:pl-1">
      </div>
      <div class="overflow-x-auto w-full max-md:my-0 max-md:mx-auto">
        <table class="w-full border-collapse min-w-[600px]">
          <thead>
          <tr class="border-b border-color-light">
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark whitespace-nowrap">STT</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark whitespace-nowrap">Hình ảnh</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Trạng thái</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Hành động</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in banners">
            <td class="h-20 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap" >{{ index + 1 }}</td>
            <td class="border-b border-color-light text-color-dark flex justify-center items-center">
              <img :src="item.image_url" alt="Image" class="w-full h-full max-md:h-12 max-md:w-12">
            </td>
            <td class="h-20 border-b border-color-light text-color-dark">
              <button
                  :class="{'bg-color-primary': item.is_active,
                            'bg-color-danger' : item.is_active
                    }"
                  class="px-4 py-1 text-color-white rounded-lg text-base font-semibold max-md:text-xs max-md:px-2">{{ item.is_active ? 'Active' : 'Inactive' }}</button>
            </td>
            <td class="h-20 border-b border-color-light text-color-dark whitespace-nowrap">
              <RouterLink :to="`/admin/edit-product/${item.id}`">
                <button class="px-5 font-semibold py-1 bg-color-13 text-color-white rounded-lg max-md:text-xs max-md:px-2 whitespace-nowrap">Sửa</button>
              </RouterLink>
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
import {deleteBanner, getBanners} from "@/service/BannerService.js";

export default {
  data(){
    return{
      banners : [],
      totalPage: 0,
    }
  },
  methods:{
    async handleDelete (id){
      const result = await deleteBanner(id)
      if(result){
        ElNotification({
          title: 'Success',
          message: 'Xóa thành công banner',
          type: 'success',
        })
        await this.loadBanners();
      }
    },
    async loadBanners(page = 1) {
      try {
        const result = await getBanners(page);
        this.banners = result.data.data;
        this.totalPage = result.data.total_page
      } catch (err) {
        console.log("Lỗi khi lấy banner");
      }
    },
    handlePageChange(page) {
      this.loadBanners(page);
    },
  },
  async created(){
    await this.loadBanners();
  }
}
</script>
