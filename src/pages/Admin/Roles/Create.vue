<template>
  <div class="mx-auto container mt-8 max-md:mt-3">
    <div class="text-[50px] text-color-2 font-great text-center max-md:text-3xl">
      Thêm nhóm quyền
    </div>
    <el-form
        class="w-full p-3 responsive-form"
        :model="sizeForm"
        label-width="auto"
        size="large"
    >
      <el-form-item label="Tiêu đề">
        <el-input v-model="sizeForm.title" class="bg-color-white-2" />
      </el-form-item>
      <el-form-item label="Mô tả">
        <el-input v-model="sizeForm.description" type="textarea" class="bg-color-white-2" />
      </el-form-item>
      <el-form-item class="flex justify-center">
        <el-button type="primary" @click="onSubmit">Tạo</el-button>
        <el-button>Huỷ</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
    import {reactive } from 'vue'
    import { useRouter } from 'vue-router';
    import { createRole } from '@/service/roleService';
    import {ElNotification} from "element-plus";

    const router = useRouter()

  
  const sizeForm = reactive({
    title: '',
    description: '',
  })

  const onSubmit = async () => {
    const errorMessages = {
      title: 'Vui lòng nhập tiêu đề',
      description: 'Vui lòng nhập mô tả',
    };

    // Kiểm tra từng thuộc tính của sizeForm
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
    const result = await createRole(sizeForm)
    if(result){
      ElNotification({
        title: 'Success',
        message: 'Tạo thành công',
        type: 'success',
      })
        router.replace({name : 'roles'})
    }
  }
</script>

  