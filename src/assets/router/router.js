import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../../components/HomeComponent.vue";
import NavBarComponent from "../../components/caisse/NavBarComponent.vue";
import OnboardComponent from "../../components/caisse/OnboardComponent.vue";
import OpenCloseCaisseComponent from "../../components/caisse/OpenCloseCaisseComponent.vue";
import ProductListComponent from "../../components/products/ProductListComponent.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeComponent,
  },
  {
    path: "/caisse",
    components: OpenCloseCaisseComponent,
    meta: { requiresAuth: true },
  },
  {
    path: "/Acceuil",
    component: NavBarComponent,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        components: {
          default: NavBarComponent,
          one: OnboardComponent,
        },
      },
            {
        path: "/Produits",
        components: {
          default: NavBarComponent,
          one: ProductListComponent,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const jwtToken = localStorage.getItem("jwtToken");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!jwtToken) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    if (to.name === "Home" && jwtToken) {
      next({ path: "/Acceuil" });
    } else {
      next();
    }
  }
});

export default router;
