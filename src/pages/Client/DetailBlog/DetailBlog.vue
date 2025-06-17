<script setup>
    import MainContent from './MainContent.vue';
    import ContentLeft from './ContentLeft.vue';
</script>

<template>
    <div class="container mx-auto">
        <div class="grid grid-cols-4">
            <div class="col-span-3">
                <MainContent />
            </div>
            <div>
                <ContentLeft />
            </div>
        </div>
    </div>
</template>