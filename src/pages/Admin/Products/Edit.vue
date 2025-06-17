<template>
  <div class="mx-auto container mt-8 max-md:mt-3">
    <div class="text-[50px] text-color-2 font-great text-center max-md:text-2xl">
      Sửa sản phẩm
    </div>
    <el-form
        class="w-full p-3 responsive-form"
        :model="sizeForm"
        label-width="auto"
        size="large"
    >
      <el-form-item label="Title" class="ml-0">
        <el-input v-model="sizeForm.title" />
      </el-form-item>
      <el-form-item label="Danh mục cha">
        <el-select
            v-model="sizeForm.parentId"
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
      <el-form-item label="Description">
        <el-input v-model="sizeForm.description" type="textarea" class="bg-color-white-2" />
      </el-form-item>
      <el-form-item label="Giá">
        <el-input v-model.number="sizeForm.price" class="responsive-input" />
      </el-form-item>
      <el-form-item label="Giá cũ">
        <el-input v-model.number="sizeForm.oldPrice" />
      </el-form-item>
<!--      <el-form-item label="Ảnh">-->
<!--        <el-button size="small" type="primary" @click="openUploadWidget()">Chọn ảnh</el-button>-->
<!--      </el-form-item>-->
      <el-form-item label="Ảnh">
        <el-input v-model.number="sizeForm.image" />
      </el-form-item>
      <el-form-item label="Vị trí">
        <el-input v-model.number="sizeForm.position" />
      </el-form-item>
      <el-form-item label="Sản phẩm nổi tiếng">
        <el-radio-group v-model="sizeForm.popular">
          <el-radio border :value="1">Có</el-radio>
          <el-radio border :value="0">Không</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Status">
        <el-radio-group v-model="sizeForm.status">
          <el-radio border value="active">Hoạt động</el-radio>
          <el-radio border value="inactive">Dừng hoạt động</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="flex justify-center">
        <el-button type="primary" @click="onSubmit">Cập nhật</el-button>
        <el-button>Hủy</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import {useRoute, useRouter} from 'vue-router';
import {createProduct, editProduct, getProductDetail} from '@/service/productsService';
import { getCategoryList } from '@/service/categoryService';
import {ElNotification} from "element-plus";

const router = useRouter()
const route = useRoute()
const id = route.params.id;

const options = ref([])

const fetchCategorys = () => {
  const fetchApi = async () => {
    const result = await getCategoryList()

    options.value = result.data.data.map(item => ({ value: item.id, label: item.title }));
  }
  fetchApi();
};

const loadProductDetail = async () =>{
  const result = await getProductDetail(id);
  if(result){
    Object.assign(sizeForm, result.detail);
    console.log(result)
  }
}

onMounted(() => {
  fetchCategorys()
  loadProductDetail();
});


let sizeForm = reactive({
  title: '',
  description: '',
  image: '',
  price: 0,
  status: '',
  position : '',
  oldPrice : '',
  parentId : '',
  popular : false
})

function onSubmit() {
  const fetchApi = async () => {
      const result = await editProduct(sizeForm, id)
      if(result){
        ElNotification({
          title: 'Success',
          message: 'Cập nhật thành công',
          type: 'success',
        })
          router.replace({name : 'product'})
      }
  }
  fetchApi();
}
</script>

  