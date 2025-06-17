<template>
  <div class="mx-auto container mt-8 max-md:mt-3">
    <div class="text-[50px] text-color-2 font-great text-center max-md:text-2xl">
      Thêm mã giảm giá
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
      <el-form-item label="Mã">
        <el-input v-model="sizeForm.code" class="bg-color-white-2" />
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
      <el-form-item label="Kiểu">
        <el-input v-model="sizeForm.type" type="textarea" class="bg-color-white-2" />
      </el-form-item>
      <el-form-item label="Giá trị">
        <el-input v-model.number="sizeForm.value" class="responsive-input" />
      </el-form-item>
      <el-form-item label="Ngày bắt đầu">
        <div class="block">
          <el-date-picker
              v-model="sizeForm.start_date"
              type="datetime"
              placeholder="Chọn ngày giờ"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
      </el-form-item>
      <el-form-item label="Ngày kết thúc">
        <el-date-picker
            v-model="sizeForm.end_date"
            type="datetime"
            placeholder="Chọn ngày giờ"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="Số lượng">
        <el-input v-model.number="sizeForm.max_uses" />
      </el-form-item>
      <el-form-item label="Tổng tiền hàng">
        <el-input v-model.number="sizeForm.min_order_amount" />
      </el-form-item>
      <el-form-item class="flex justify-center">
        <el-button type="primary" @click="onSubmit">Tạo</el-button>
        <el-button>Hủy</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { createProduct } from '@/service/productsService';
import { getCategoryList } from '@/service/categoryService';
import { ElNotification } from 'element-plus'
import {createDiscount} from "@/service/DiscountsServive.js";


const router = useRouter()
const options = ref([])

const fetchCategories = () => {
  const fetchApi = async () => {
    const result = await getCategoryList()
    console.log(result)
    options.value = result.data.data.map(item => ({ value: item.id, label: item.title }));
  }
  fetchApi();
};

onMounted(() => {
  fetchCategories()
});


const sizeForm = reactive({
  title : '',
  description : '',
  code : '',
  type : '',
  value : 0,
  start_date : '',
  end_date : '',
  max_uses : 0,
  min_order_amount : 0,
  category_id : '',
})


function onSubmit() {
  console.log(sizeForm)
  const errorMessages = {
    title : 'Vui lòng nhập tiêu đề',
    description : "Vui lòng nhập mô tả",
    code : 'Vui lòng nhập mã',
    type : 'Vui lòng nhập kiểu mã giảm giá',
    value : 'Vui lòng nhập giá trị',
    start_date : 'Vui lòng nhập ngày bắt đầu ',
    end_date : 'Vui lòng nhập ngày kết thúc',
    max_uses : 'Vui lòng nhập số lượng',
    min_order_amount : 'Vui lòng nhập tổng tiền hàng tối thiểu',
    category_id : 'Vui lòng nhập danh mục giảm giá',
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
  const fetchApi = async () => {
    const result = await createDiscount(sizeForm)
    if(result){
      ElNotification({
        title: 'Success',
        message: 'Tạo thành công',
        type: 'success',
      })
      router.replace({name : 'discounts'})
    }
  }
  fetchApi();
}
</script>

