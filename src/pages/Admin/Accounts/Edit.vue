<template>
    <div class="mx-auto container">
        <div class="text-[50px] text-color-2 font-great text-center">
            Chỉnh sửa tài khoản admin
        </div>
        <el-form
            class="w-full p-3 responsive-form"
            :model="sizeForm"
            label-width="auto"
            size="large"
        >
        <el-form-item label="Họ tên">
            <el-input v-model="sizeForm.fullName" />
        </el-form-item>
        <el-form-item label="Nhóm quyền">
            <el-select
                v-model="sizeForm.roleId"
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
        <el-form-item label="Email">
            <el-input v-model="sizeForm.email" />
        </el-form-item>
        <el-form-item label="Mật khẩu">
            <el-input v-model="sizeForm.password" />
        </el-form-item>
        <el-form-item label="Số điện thoại">
            <el-input v-model="sizeForm.phone" />
        </el-form-item>
        <el-form-item label="Ảnh">
            <el-input v-model="sizeForm.avatar" />
        </el-form-item>
        <el-form-item label="Trạng thái">
            <el-radio-group v-model="sizeForm.status">
            <el-radio border value="active">Hoạt động</el-radio>
            <el-radio border value="inactive">Dừng hoạt động</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Cập nhật</el-button>
            <el-button>Hủy</el-button>
        </el-form-item>
        </el-form>
    </div>
  </template>
  
<script setup>

    import { onMounted, reactive, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import { getRoleList } from '@/service/roleService';
    import { createAccount, getAccountDetail } from '@/service/accountService';
    import { editAccount } from '@/service/accountService';
    import {ElNotification} from "element-plus";

    const router = useRouter()
    const options = ref([])
    const route = useRoute();
    const id = route.params.id;

    const sizeForm = reactive({
        fullName: '',
        email: '',
        password: '',
        phone : '',
        avatar : '',
        roleId : '',
        status : '',
    })
    
    const fetchCategorys = () => {
        const fetchApi = async () => {
            const result = await getRoleList()
            options.value = result.data.data.map(item => ({ value: item.id, label: item.title }));
        }
        fetchApi();
    };    

    const fetchData = async () =>{
      const result = await getAccountDetail(id)
      if(result){
        Object.assign(sizeForm, result.detail);
      }
    }
    onMounted(async () => {
        await fetchCategorys();
        await fetchData();
    });

  const onSubmit = () => {
    const fetchApi = async () => {
        const result = await editAccount(id,sizeForm)
        if(result){
          ElNotification({
            title: 'Success',
            message: 'Cập nhật thành công',
            type: 'success',
          })
            router.replace({name : 'accounts'})
        }
    } 
    fetchApi();
}
</script>

  