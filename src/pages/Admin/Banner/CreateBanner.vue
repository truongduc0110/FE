<template>
  <div class="mx-auto container">
    <div class="text-[50px] text-color-2 font-great text-center">
      Thêm banner quảng cáo
    </div>
    <el-form
        class="w-full p-3 responsive-form"
        :model="sizeForm"
        label-width="auto"
        size="large"
    >
      <el-form-item label="Banner">
        <el-input v-model="sizeForm.image_url" />
      </el-form-item>
      <el-form-item label="Danh mục">
        <el-select
            v-model="sizeForm.category_id"
            clearable
            placeholder="Select"
            style="width: 240px"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Tạo</el-button>
        <el-button>Hủy</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>

import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { createAccount } from '@/service/accountService';
import {ElNotification} from "element-plus";
import {getCategoryList} from "@/service/categoryService.js";
import {createBanner} from "@/service/BannerService.js";

const router = useRouter()
const options = ref([])

const fetchCategorys = () => {
  const fetchApi = async () => {
    const result = await getCategoryList()
    console.log(result)
    options.value = result.data.data.map(item => ({ value: item.id, label: item.title }));
  }
  fetchApi();
};
onMounted(async () => {
  await fetchCategorys()
});

const sizeForm = reactive({
  image_url : '',
  category_id : ''
})

const onSubmit = () => {
  const errorMessages = {
    image_url: 'Vui lòng chọn banner',
    category_id: 'Vui lòng chọn danh mục',
  };
  for (const key in sizeForm) {
    if (sizeForm[key] === '' || sizeForm[key] === null || sizeForm[key] === undefined) {
      ElNotification({
        title: 'Warning',
        message: errorMessages[key], // Hiển thị thông báo tương ứng
        type: 'warning',
      });
      return; // Dừng lại nếu có lỗi
    }
  }
  const fetchApi = async () => {
    const result = await createBanner(sizeForm)
    if(result){
      ElNotification({
        title: 'Success',
        message: 'Tạo thành công',
        type: 'success',
      })
      router.replace({name : 'banners'})
    }
  }
  fetchApi();
  console.log(sizeForm);
}
</script>

