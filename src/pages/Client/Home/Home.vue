
<template>
    <GioiThieu />
    <Offer />
    <Products />
    <ChooseUs />
    <Sale />
    <div @click="handleChatbot" class="flex gap-2 cursor-pointer items-center bg-white p-1 rounded-tl-full rounded-bl-full fixed bottom-40 right-0 shadow-sd-1">
      <div class="h-11 w-11 rounded-full bg-linear-gradient-1 flex justify-center items-center">
        <img src="@/assets/images/Avatar_AI.png" alt="AI">
      </div>
      <div class="text-base font-semibold text-color-4">Chat bot</div>
    </div>
  <div
      :class="{
      'opacity-100 scale-100 pointer-events-auto': openChatbot,
      'opacity-0 scale-95 pointer-events-none': !openChatbot,
  }"
      class="fixed bottom-0 right-0 transition-all duration-300 ease-in-out transform rounded-tr-2xl rounded-tl-2xl"
  >
    <ChatBot :handleChatbot="handleChatbot" />
  </div>
</template>

<script>
import GioiThieu from './GioiThieu.vue';
import Offer from './Offer.vue';
import Products from './Products.vue';
import ChooseUs from './ChooseUs.vue';
import Sale from './Sale.vue';
import ChatBot from "@/pages/Client/Home/ChatBot.vue";

export default {
  data(){
    return{
      openChatbot : true
    }
  },
  components:{
    GioiThieu,
    Offer,
    Products,
    ChooseUs,
    Sale,
    ChatBot
  },
  methods:{
    handleChatbot(){
      this.openChatbot = !this.openChatbot;
    },
  }
}
</script>
