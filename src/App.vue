<template>
  <div>
    <Loading v-if="isLoading" />
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loading from '@/pages/Client/Loading.vue';

export default {
  components: {
    Loading,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(false);

    const layout = computed(() => route.meta.layout || 'default');

    router.beforeEach((to, from, next) => {
      // Kiểm tra nếu route có `/admin` thì không hiển thị loading
      if (!to.path.startsWith('/admin')) {
        isLoading.value = true;
      }
      next();
    });

    watch(route, () => {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    });

    return {
      layout,
      isLoading,
    };
  },
};
</script>
