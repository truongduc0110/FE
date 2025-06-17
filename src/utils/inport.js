import { defineAsyncComponent } from "vue";

export function registerGlobalComponents(app) {
    app.component('default', defineAsyncComponent(() => import("@/components/Layouts/LayoutDefault.vue")))
    app.component('admin', defineAsyncComponent(() => import("@/components/Layouts/LayoutAdmin.vue")))
    app.component('login', defineAsyncComponent(() => import("@/components/Layouts/LayoutLogin.vue")))
}