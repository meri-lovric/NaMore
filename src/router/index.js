import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Beach from "../views/Beach.vue";
import NewBeachForm from "../views/NewBeachForm.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import BeachPage from "../views/BeachPage.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    props: true,
  },
  {
    path: "/beaches",
    name: "Beaches",
    component: Beach,
  },
  {
    path: "/beachPage",
    name: "BeachPage",
    component: BeachPage,
    props: true,
  },

  {
    path: "/newbeachform",
    name: "NewBeach",
    component: NewBeachForm,
    props: true,
  },
  {
    path: "/",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
