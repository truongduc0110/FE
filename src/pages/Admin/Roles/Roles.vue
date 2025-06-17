
<template>
  <h1 class="text-2xl font-bold text-color-dark max-md:text-xl max-lg:text-center">Nhóm quyền</h1>
  <div class="mt-8 md:container max-md:px-2 mx-auto product">
    <RouterLink :to="{ name : 'create-role'}">
      <button class="px-5 font-semibold py-2 bg-color-13 text-sm text-color-white rounded-lg max-md:px-3">Thêm nhóm quyền</button>
    </RouterLink>
    <div class="bg-color-white-2 mt-10 rounded-lg max-md:rounded-lg text-center shadow-shadow-5 transition-all duration-300 ease-in-out hover:shadow-none max-md:px-2">
      <div class="py-5 pl-3 max-lg:py-3 max-md:pl-1">
        <div class="h-10 relative border pl-3 border-color-light w-1/2 rounded-lg flex justify-between items-center max-md:h-8">
          <input v-model="searchQuery" @input="searchRoles" placeholder="Nhập từ khóa..." type="search" class="w-full bg-color-white-2 outline-none text-color-9 text-base max-md:text-xs">
          <button class="px-2 hover:text-color-2 text-color-3">
            <span class="material-icons-sharp text-3xl max-md:text-xl">search</span>
          </button>
        </div>
      </div>
      <div class="overflow-x-auto w-full max-md:my-0 max-md:mx-auto">
        <table class="w-full border-collapse min-w-[600px]">
          <thead>
          <tr class="border-b border-color-light">
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark whitespace-nowrap w-10">STT</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark whitespace-nowrap">Tiêu đề</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Mô tả</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Hành động</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in roles">
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap" >{{ index + 1 }}</td>
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap">{{ item.title }}</td>
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap">{{ item.description }}</td>
            <td class="h-10 border-b border-color-light text-color-dark whitespace-nowrap">
              <RouterLink :to="`/admin/edit-role/${item.id}`">
                <button class="px-5 font-semibold py-1 bg-color-13 text-color-white rounded-lg max-md:text-xs max-md:px-2 whitespace-nowrap">Sửa</button>
              </RouterLink>
              <button @click="handleDelete(item.id)" class="px-5 font-semibold py-1 bg-color-2 ml-1 text-color-white rounded-lg max-md:text-xs max-md:px-2 whitespace-nowrap">Xóa</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteRole, getRoleList} from "@/service/roleService.js";
import {ElNotification} from "element-plus";

export default {
  data(){
    return{
      roles : [],
      searchQuery: "",
      allRoles: [],
    }
  },
  methods:{
    async loadRoles() {
      try {
        const result = await getRoleList();
        this.roles = result.data.data;
        this.allRoles = result.data.data;
      } catch (err) {
        console.log("Lỗi khi lấy nhóm quyền");
      }
    },
    searchRoles() {
      if (!this.searchQuery) {
        this.roles = this.allRoles;
      } else {
        this.roles = this.allRoles.filter((role) =>
            role.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    async handleDelete(id){
      const result = await deleteRole(id)
      if(result){
        ElNotification({
          title: 'Success',
          message: 'Xóa thành công nhóm quyền',
          type: 'success',
        })
        await this.loadRoles();
      }
    },
  },
  async created(){
    await this.loadRoles();
  }
}
</script>
