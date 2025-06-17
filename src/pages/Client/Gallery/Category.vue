<template>
    <div class="gallery py-[100px]">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="ALL CATEGORIES" name="first"><List /></el-tab-pane>
            <el-tab-pane v-for="item in ListCategory" :key="item.id" :label="item.title" :name="item.title">
              <ListProduct :productId="item.id"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import List from './List.vue';
import { onMounted, ref } from 'vue';
import { getCategoryList } from '@/service/categoryService';
import ListProduct from './ListProduct.vue';

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const ListCategory = ref([])

const fetchListCategory = async () =>{
  const result = await getCategoryList()
  if(result){
    ListCategory.value = result;
  }
}

onMounted(fetchListCategory);

</script>
