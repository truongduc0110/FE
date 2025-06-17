
<template>
    <div class="container mx-auto py-[50px]">
      <div class="p-5 bg-color-2 text-color-white font-semibold text-lg">Chúc mừng bạn đã đặt hàng thành công! chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất</div>
      <div class="mt-[80px]">
        <h3 class="text-2xl font-medium text-color-1 tracking-wider mb-[50px]">Thông tin đơn hàng</h3>
        <TableCartSuccess />
        <h3 class="text-2xl font-medium text-color-1 tracking-wider mb-[50px]">Thông tin Cá nhân</h3>
        <InfoUser />
      </div>
    </div>
</template>

<script>
import InfoUser from "./InfoUser.vue";
import TableCartSuccess from "./TableCartSuccess.vue";

export default {
  components:{
    InfoUser,
    TableCartSuccess
  }
}
</script>