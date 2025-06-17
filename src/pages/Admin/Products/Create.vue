<template>
    <div class="mx-auto container mt-8 max-md:mt-3">
        <div class="text-[50px] text-color-2 font-great text-center max-md:text-2xl">
            Thêm sản phẩm
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
          <el-form-item label="Mô tả">
            <el-input v-model="sizeForm.description" type="textarea" class="bg-color-white-2" />
          </el-form-item>
        <el-form-item label="Giá">
          <el-input v-model.number="sizeForm.price" class="responsive-input" />
        </el-form-item>
        <el-form-item label="Giá cũ">
            <el-input v-model.number="sizeForm.oldPrice" />
        </el-form-item>
        <el-form-item label="Ảnh">
            <el-button size="small" type="primary" @click="openUploadWidget()">Chọn ảnh</el-button>
        </el-form-item>
        <el-form-item label="Vị trí">
            <el-input v-model.number="sizeForm.position" />
        </el-form-item>
        <el-form-item label="Trạng thái">
            <el-radio-group v-model="sizeForm.status">
            <el-radio border value="active">Hoạt động</el-radio>
            <el-radio border value="inactive">Dừng hoạt động</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Sản phẩm nổi tiếng">
          <el-radio-group v-model="sizeForm.popular">
            <el-radio border :value="true">Có</el-radio>
            <el-radio border :value="false">Không</el-radio>
          </el-radio-group>
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
    import Editor from '@tinymce/tinymce-vue'
    import { ElNotification } from 'element-plus'

    const widget = window.cloudinary.createUploadWidget(
        { cloud_name : "dsxkwbfyq", upload_preset : "upload"},
        (error, result) =>{
            if(!error && result && result.event === "success"){
                console.log("OK ... ", result.info.url);
                sizeForm.image = result.info.url
            }
        }
    )

  const router = useRouter()

    const openUploadWidget = () =>{
        widget.open()
    }

  const options = ref([])

    const fetchCategorys = () => {
      const fetchApi = async () => {
        const result = await getCategoryList()
        console.log(result)
        options.value = result.data.data.map(item => ({ value: item.id, label: item.title }));
      }
      fetchApi();
    };

    onMounted(() => {
        fetchCategorys()
    });

  
  const sizeForm = reactive({
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
    const errorMessages = {
      title: 'Vui lòng nhập tiêu đề',
      description: 'Vui lòng nhập mô tả',
      image: 'Vui lòng tải lên hình ảnh',
      price: 'Vui lòng nhập giá',
      status: 'Vui lòng chọn trạng thái',
      position: 'Vui lòng nhập vị trí',
      oldPrice: 'Vui lòng nhập giá cũ',
      parentId: 'Vui lòng chọn danh mục cha',
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
        const result = await createProduct(sizeForm)
        if(result){
          ElNotification({
            title: 'Success',
            message: 'Tạo thành công',
            type: 'success',
          })
            router.replace({name : 'product'})
        }
    }
    fetchApi();
}
</script>

  