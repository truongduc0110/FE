import { createRouter, createWebHistory } from "vue-router";
import Cookies from 'js-cookie';

import Home from "../pages/Client/Home/Home.vue"
import Page404 from "../pages/404.vue"

import Admin from "../pages/Admin/Admin.vue";
import Dashboard from "../pages/Admin/Dashboard/Dashboard.vue";
import Products from "../pages/Admin/Products/Products.vue";
import Gallery from "../pages/Client/Gallery/Gallery.vue";
import Shop from "../pages/Client/Shop/Shop.vue";
import CreateProduct from '../pages/Admin/Products/Create.vue'
import EditProduct from "../pages/Admin/Products/Edit.vue";
import DeletedProduct from "../pages/Admin/Products/Deleted.vue";

import Category from "../pages/Admin/Category/Category.vue";
import CreateCategory from "../pages/Admin/Category/Create.vue"
import EditCategory from "../pages/Admin/Category/Edit.vue";

import Roles from "../pages/Admin/Roles/Roles.vue";
import CreateRole from "../pages/Admin/Roles/Create.vue";
import EditRole from "../pages/Admin/Roles/Edit.vue";
import Accounts from "../pages/Admin/Accounts/Accounts.vue";
import Detail from "../pages/Client/DetailProduct/Detail.vue";
import CreateAccount from "../pages/Admin/Accounts/Create.vue";
import EditAccount from "../pages/Admin/Accounts/Edit.vue";

import BreadCrumb from "../pages/Client/BreadCrumb.vue";
import Cart from '../pages/Client/Cart/Cart.vue'
import Success from "../pages/Client/Checkout/Success.vue";
import Login from "../pages/Admin/Auth/Login.vue";
import Checkout from "../pages/Client/Checkout/Checkout.vue";

import Blog from "../pages/Client/Blog/Blog.vue";
import DetailBlog from "../pages/Client/DetailBlog/DetailBlog.vue";
import LoginClient from '../pages/Client/Auth/Login.vue'
import Register from "../pages/Client/Auth/Register.vue";
import ForgotPassword from "../pages/Client/Auth/ForgotPassword.vue";
import OtpPassword from "../pages/Client/Auth/OtpPassword.vue";
import ResetPassword from "../pages/Client/Auth/ResetPassword.vue";
import BlogAdmin from "@/pages/Admin/Blog/Blog.vue";

import DiscountsList from "@/pages/Admin/Discounts/DiscountsList.vue";

import TableOrder from "../pages/Admin/Order/TableOrder.vue"
import OrderConfirmed from "../pages/Admin/Order/Confirmed.vue";

import { addCart } from "../service/cartService";
import { useUserStore } from "../stores/local";
import CreateDiscount from "@/pages/Admin/Discounts/CreateDiscount.vue";
import EditDiscount from "@/pages/Admin/Discounts/EditDiscount.vue";
import DiscountByCategory from "@/pages/Admin/Discounts/DiscountByCategory.vue";
import BannerList from "@/pages/Admin/Banner/BannerList.vue";
import CreateBanner from "@/pages/Admin/Banner/CreateBanner.vue";

// New Admin Components
import AdminNews from "@/pages/Admin/News/News.vue";
import AdminNotifications from "@/pages/Admin/Notifications/Notifications.vue";
import AdminChatbot from "@/pages/Admin/Chatbot/Chatbot.vue";
const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/auth/login",
    component: LoginClient,
    name: "loginClient",
    meta: {
      layout: 'login'
    }
  },
  {
    path: "/auth/register",
    component: Register,
    name: "register",
    meta: {
      layout: 'login'
    }
  },
  {
    path: "/auth/forgot-password",
    component: ForgotPassword,
    name: "forgot-password",
    meta: {
      layout: 'login'
    }
  },
  {
    path: "/auth/otp-password",
    component: OtpPassword,
    name: "otp-password",
    meta: {
      layout: 'login'
    }
  },
  {
    path: "/auth/reset-password",
    component: ResetPassword,
    name: "reset-password",
    meta: {
      layout: 'login'
    }
  },
  {
    path: "/",
    name: "BreadCrumb",
    component: BreadCrumb,
    children: [
      {
        path: "gallery",
        component: Gallery,
        name: "Gallery",
      },
      {
        path: "shop",
        component: Shop,
        name: "Shop",
      },
      {
        path: 'product/:id',
        component: Detail,
        name: 'detail'
      },
      {
        path: 'cart',
        component: Cart,
        name: 'cart'
      },
      {
        path: 'checkout',
        component: Checkout,
        name: 'checkout'
      },
      {
        path: 'success/:id',
        component: Success,
        name: 'success'
      },
      {
        path: 'blog',
        component: Blog,
        name: 'blog'
      },
      {
        path: 'blog/:id',
        component: DetailBlog,
        name: 'detail-blog'
      },
    ]
  },
  {
    path: '/admin/auth/login',
    component: Login,
    name: 'login',
    meta: {
      layout: 'login'
    }
  },
  {
    path: "/admin",
    component: Admin,
    name: "admin",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          layout: "admin",
          needsAuth: true
        }
      },
      {
        path: "product",
        name: "product",
        component: Products,
        meta: {
          layout: "admin",
          needsAuth: true
        },
      },
      {
        path: 'create-product',
        component: CreateProduct,
        name: 'create-product',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'deteted-product',
        component: DeletedProduct,
        name: 'deleted-product',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'edit-product/:id',
        component: EditProduct,
        name: 'edit-product',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'category',
        component: Category,
        name: 'category',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'create-category',
        component: CreateCategory,
        name: 'create-category',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'edit-category/:id',
        component: EditCategory,
        name: 'edit-category',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'roles',
        component: Roles,
        name: 'roles',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'create-role',
        component: CreateRole,
        name: 'create-role',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'edit-role/:id',
        component: EditRole,
        name: 'edit-role',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'accounts',
        component: Accounts,
        name: 'accounts',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'create-accounts',
        component: CreateAccount,
        name: 'create-accounts',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'edit-accounts/:id',
        component: EditAccount,
        name: 'edit-accounts',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'order',
        component: TableOrder,
        name: 'order',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'order/confirmed',
        component: OrderConfirmed,
        name: 'order-confirmed',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'blog',
        component: BlogAdmin,
        name: 'blogAdmin',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: "discounts",
        name: "discounts",
        component: DiscountsList,
        meta: {
          layout: "admin",
          needsAuth: true
        },
      },
      {
        path: "discounts/category",
        name: "discounts-category",
        component: DiscountByCategory,
        meta: {
          layout: "admin",
          needsAuth: true
        },
      },
      {
        path: 'discounts/create',
        component: CreateDiscount,
        name: 'create-discount',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'edit/discounts/:id',
        component: EditDiscount,
        name: 'edit-discount',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'banners',
        component: BannerList,
        name: 'banners',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'banners/create',
        component: CreateBanner,
        name: 'create-banner',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'news',
        component: AdminNews,
        name: 'admin-news',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'notifications',
        component: AdminNotifications,
        name: 'admin-notifications',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
      {
        path: 'chatbot',
        component: AdminChatbot,
        name: 'admin-chatbot',
        meta: {
          layout: 'admin',
          needsAuth: true
        }
      },
    ]
  },

  {
    path: "/:pathMath(.*)*",
    component: Page404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token');
  const storeUser = useUserStore()
  if (to.meta.needsAuth) {
    if (!token || storeUser.$state.user.role !== 'admin') {
      return next({ name: 'login' })
    }
    return next();
  } else {
    if (!localStorage.getItem('cartId')) {
      const fetchApi = async () => {
        const result = await addCart();
        if (result) {
          localStorage.setItem("cartId", result.cart.id);
        }
        next();
      };
      return fetchApi();
    }
    return next();
  }
}
);

export default router;