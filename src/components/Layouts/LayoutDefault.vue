<script setup>
    import Header from '../partials/Client/Header.vue';
    import Footer from '../partials/Client/Footer.vue'
</script>

<template>
    <Header />

    <slot />

    <Footer />
</template>