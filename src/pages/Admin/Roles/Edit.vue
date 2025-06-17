<template>
    
    <div class="mx-auto container">
        <div class="text-[50px] text-color-2 font-great text-center max-md:text-3xl">
            Chỉnh sửa nhóm quyền
        </div>
        <el-form
            class="w-full p-3 responsive-form"
            :model="sizeForm"
            label-width="auto"
            size="large"
        >
        <el-form-item label="Title">
            <el-input v-model="sizeForm.title" />
        </el-form-item>
        <el-form-item label="Description">
            <el-input v-model="sizeForm.description" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Cập nhật</el-button>
            <el-button>Hủy</el-button>
        </el-form-item>
        </el-form>
    </div>
  </template>

<script setup>
import { onMounted, reactive } from 'vue'
import {useRoute, useRouter} from 'vue-router';
import {ElNotification} from "element-plus";
import {editRole, getRoleDetail} from "@/service/roleService.js";

const router = useRouter()
const route = useRoute()
const id = route.params.id;

const loadRoleDetail = async () =>{
  const result = await getRoleDetail(id);
  if(result){
    Object.assign(sizeForm, result.detail);
  }
}

onMounted(() => {
  loadRoleDetail();
});


let sizeForm = reactive({
  title: '',
  description: '',
})

function onSubmit() {
  const fetchApi = async () => {
    const result = await editRole(id, sizeForm)
    if(result){
      ElNotification({
        title: 'Success',
        message: 'Cập nhật thành công',
        type: 'success',
      })
      router.replace({name : 'roles'})
    }
  }
  fetchApi();
}
</script>

  