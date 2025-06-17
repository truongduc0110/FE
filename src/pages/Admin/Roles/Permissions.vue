
<template>
    <div class="container mx-auto py-5">
        <div class="text-2xl font-bold text-color-dark max-md:text-xl max-lg:text-center">Phân quyền</div>
        <div class="text-right">
            <el-button type="primary" plain @click="handleUpdate">Cập nhật</el-button>
        </div>

      <div class="bg-color-white-2 mt-10 rounded-lg max-md:rounded-lg text-center shadow-shadow-5 transition-all duration-300
                ease-in-out hover:shadow-none max-md:px-2">
        <div class="overflow-x-auto w-full max-md:my-0 max-md:mx-auto">
          <table class="w-full border-collapse min-w-[600px]">
            <thead>
            <tr class="border-b border-color-light">
              <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark
                whitespace-nowrap"> Quyền</th>
              <th v-for="item in data" class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark
                whitespace-nowrap">{{ item.title }} </th>
              <th></th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in tableData">
                <td class="h-10 border-b border-color-light max-md:text-xs whitespace-nowrap text-center font-medium text-color-info-dark">{{ item.title }}</td>
                <td v-for="role in data" class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap text-center">
                  <label class="flex justify-center items-center cursor-pointer text-lg w-full py-2 px-3 rounded-md relative">
                    <input
                        @change="handleClick(role.id, item.permission)"
                        :checked="isChecked(role.id, item.permission)"
                        type="checkbox" class="hidden peer"
                    >
                    <span class="w-6 h-6 border-[3px] border-gray-300 rounded-lg flex items-center justify-center
                        peer-checked:border-blue-500 transition-colors relative"></span>
                    <span class="w-2.5 h-2.5 bg-blue-500 rounded-full peer-checked:inline-block hidden absolute inset-0 m-auto"></span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
</template>
<script setup>
import {ElNotification, ElTable} from 'element-plus'
import { onMounted, ref } from 'vue';
import { getRoleList, UpdatePermissions } from '@/service/roleService';

const data = ref([]);
const permission = ref([]);

const fetchRoles = async () => {
  const result = await getRoleList()
  data.value = result.data.data;
  permission.value = result.data.data.map((role) => ({
    id: role.id,
    permission: role.permissions.split(',')
  }));
};
onMounted(fetchRoles);

const tableData = [
  {
    title : "Xem Sản phẩm",
    permission : "product_view"
  },
  {
    title : "Tạo Sản phẩm",
    permission : "product_create"
  },
  {
    title : "Sửa Sản phẩm",
    permission : "product_edit"
  },
  {
    title : "Xóa Sản phẩm",
    permission : "product_delete"
  },
  {
    title : "Xem danh mục",
    permission : "category_view"
  },
  {
    title : "Thêm danh mục",
    permission : "category_create"
  },
  {
    title : "Xóa danh mục",
    permission : "category_delete"
  },
  {
    title : "Xem đơn hàng",
    permission : "order_view"
  },
  {
    title : "Thêm đơn hàng",
    permission : "order_create"
  },
  {
    title : "Xóa đơn hàng",
    permission : "order_delete"
  },
  {
    title : "Xem tài khoản",
    permission : "account_view"
  },
  {
    title : "Thêm tài khoản",
    permission : "account_create"
  },
  {
    title : "Xóa tài khoản",
    permission : "account_delete"
  },
  {
    title : "Xem nhóm quyền",
    permission : "role_view"
  },
  {
    title : "Thêm nhóm quyền",
    permission : "role_create"
  },
  {
    title : "Xóa nhóm quyền",
    permission : "role_delete"
  },
  {
    title : "Phân quyền",
    permission : "permissions"
  },

]

const handleClick = (id, permissionName) => {
  const index = permission.value.findIndex(p => p.id === id);

  if (index !== -1) {
    const permissionList = permission.value[index].permission;
    const permIndex = permissionList.indexOf(permissionName);

    if (permIndex !== -1) {
      permissionList.splice(permIndex, 1); // Xóa nếu đã tồn tại
    } else {
      permissionList.push(permissionName); // Thêm nếu chưa có
    }

    if (permissionList.length === 0) {
      permission.value.splice(index, 1); // Xóa hẳn nếu rỗng
    }
  } else {
    permission.value.push({ id, permission: [permissionName] });
  }
};

const isChecked = (id, permissionName) => {
  const checked = permission.value.find(p => p.id === id);
  return checked ? checked.permission.includes(permissionName) : false;
};

const handleUpdate = async () => {
  try {
    await UpdatePermissions(permission.value);
    const userData = localStorage.getItem("user");
    if (userData) {
      let parsedUser = JSON.parse(userData);

      // Cập nhật lại permissions của user
      const updatedPermissions = permission.value.flatMap(p => p.permission);
      parsedUser.permissions = updatedPermissions.join(",");

      // Lưu lại vào localStorage
      localStorage.setItem("user", JSON.stringify(parsedUser));
    }
    ElNotification({
      title: 'Success',
      message: 'Cập nhật thành công',
      type: 'success',
    })
  } catch (error) {
    console.error("Lỗi khi cập nhật quyền:", error);
  }
};

</script>