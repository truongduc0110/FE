<template>
  <div class="mx-auto container mt-8 max-md:mt-3">
    <div class="text-[50px] text-color-2 font-great text-center max-md:text-2xl">
      Chỉnh sửa danh mục sản phẩm
    </div>
    <el-form
        class="w-full p-3 responsive-form"
        :model="sizeForm"
        label-width="auto"
        size="large"
    >
      <el-form-item label="Title">
        <el-input v-model="sizeForm.title" class="bg-color-white-2" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="sizeForm.description" type="textarea" class="bg-color-white-2" />
      </el-form-item>
      <el-form-item label="Ảnh">
        <el-button size="small" type="primary" @click="openUploadWidget()">Chọn ảnh</el-button>
      </el-form-item>
      <el-form-item label="Vị trí">
        <el-input v-model.number="sizeForm.position" />
      </el-form-item>
      <el-form-item label="Status">
        <el-radio-group v-model="sizeForm.status">
          <el-radio border value="active">Hoạt động</el-radio>
          <el-radio border value="inactive">Dừng hoạt động</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="flex justify-center">
        <el-button type="primary" @click="onSubmit">Cập nhật</el-button>
        <el-button>Hủy bỏ</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter,useRoute } from 'vue-router';
import { editCategory, getCategoryDetail } from '@/service/categoryService';
import {ElNotification} from "element-plus";

const router = useRouter()
const route = useRoute()
const id = route.params.id;

const openUploadWidget = () =>{
  widget.open()
}

const widget = window.cloudinary.createUploadWidget(
    { cloud_name : "dsxkwbfyq", upload_preset : "upload"},
    (error, result) =>{
      if(!error && result && result.event === "success"){
        console.log("OK ... ", result.info.url);
        sizeForm.thumbnail = result.info.url
      }
    }
)

const loadCategoryDetail = async () =>{
  const result = await getCategoryDetail(id);
  if(result){
    console.log(result)
    Object.assign(sizeForm, result.detail);
  }
}

onMounted(async () => {
  await loadCategoryDetail(id);
});

const sizeForm = reactive({
  title: '',
  description: '',
  status: '',
  position : '',
  thumbnail : ''
})

const onSubmit = () => {
  const fetchApi = async () => {
    const result = await editCategory(id, sizeForm)
    if(result){
      ElNotification({
        title: 'Success',
        message: 'Cập nhật thành công',
        type: 'success',
      })
      router.replace({name : 'category'})
    }
  }
  fetchApi();
}
</script>

  