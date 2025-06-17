<script lang="ts" setup>
    import { computed, ref, onMounted } from 'vue'
    import { ElTable } from 'element-plus'
    import { RouterLink } from 'vue-router';
    import { changeStatus, deletePermanently, getProductDeletedSort, getProductListDeleted, getProductListSort, restoreProduct } from '../../../service/productsService';

    interface Product {
        id : string
        title: string
        price: Int16Array,
        position: Int16Array,
        status : string
    }

    const search = ref('')
    const products = ref<Product[]>([]);
    let page = 1;
    const totalPage = ref(1)

    const fetchProducts = () => {
        const fetchApi = async () => {
            const result = await getProductListDeleted(page)
            products.value = result['products'];
            totalPage.value = result['totalPages']
        }
        fetchApi();
    };

    onMounted(fetchProducts);

    const filterTableData =  computed(() =>
        products.value.filter(
            (data) =>
                !search.value ||
                data.title.toLowerCase().includes(search.value.toLowerCase())
        )
    )

    const handleRestore = async (row: Product) => {
        const result = await restoreProduct({
            id: row
        })
        if(result){
            fetchProducts()
        }
         
    } 

    const handleDelete = async (row: Product) =>{
        const result = await deletePermanently({
            id: row
        })
        if(result){
            fetchProducts()
        }
    }
    const handleChange = async (row: Product) => {
        if (row.status === 'active') {
            row.status = 'inactive';
        } else {
            row.status = 'active';
        }
        const result = await changeStatus(row.id,{
            status : row.status
        })
        if(result){
            console.log("Success");
        }
    }  
    
    type Option = {
        id: number
        label: string
        desc: string
    }
    const value = ref<Option>()
    const options = ref([
        { id: 1, label: 'Tiêu đề giảm dần', sort: 'title', value:'asc' },
        { id: 2, label: 'Tiêu đề tăng dần', sort: 'title', value: 'desc' },
        { id: 3, label: 'Giá giảm dần', sort: 'price', value: "desc" },
        { id: 4, label: 'Giá tăng dần', sort: 'price', value : "asc"},
        { id: 5, label: 'Vị trí giảm dần', sort: 'position', value : "desc"},
        { id: 6, label: 'Vị trí tăng dần', sort: 'position', value : "asc"},
    ])



    const handlePageChange = (newPage) =>{
        page = newPage;  
        fetchProducts();
    }
</script>

<template>
    <div class="p-10 mx-auto">
        <div>
            <div class="text-[50px] text-color-2 font-great text-center">
                Sản phẩm đã xóa
            </div>
            <div class="bg-color-white flex justify-between">
                <RouterLink :to="{ name : 'product'}">
                    <el-button type="primary" plain>Danh sách sản phẩm sản phẩm</el-button>
                </RouterLink>
            </div>
        </div>
        <div class="pt-8">
            <div class="m-4">
                <el-select
                    v-model="value"
                    value-key="id"
                    placeholder="Sắp xếp"
                    style="width: 240px"
                    @Change = "changeSort"
                >
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.label"
                    :value="item"
                />
                </el-select>
            </div>
            <el-table :data="filterTableData">
                <el-table-column type="selection" width="55" />
                <el-table-column label="Title" prop="title" />
                <el-table-column label="Price" prop="price" />
                <el-table-column label="Position" prop="position" />
                <el-table-column label="Status" prop="status">
                    <template #default="scope">
                        <el-button v-if="scope.row.status === 'active'" type="success" plain size="small" @click="handleChange(scope.row)">Hoạt động</el-button>
                        <el-button v-else type="danger" plain size="small" @click="handleChange(scope.row)">Dừng hoạt động</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="right">
                    <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleRestore(scope.row.id)"
                    >
                        Khôi phục
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row.id)"
                    >
                        Xóa vĩnh viễn
                    </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="totalPage * 10" @current-change="handlePageChange"/>
        </div>
    </div>
  </template>
  
  