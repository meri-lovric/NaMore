<template>
  <div>
    <nav class="navbar level" role="navigation" aria-label="main navigation">

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link
              :class="{'active':this.$route.path=='/home'}"
              to="/home"
              class="navbar-item"
            >Home</router-link>
          </a>
          <a class="navbar-item" v-if="canActivate()">
            <router-link
              :class="{'active':this.$route.path=='/profile'}"
              to="/profile"
              class="navbar-item"
            >Profile</router-link>
          </a>
          <a class="navbar-item">
            <router-link
              :class="{'active':this.$route.path=='/beaches'}"
              to="/beaches"
              class="navbar-item"
            >Plaže</router-link>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import auth from "../auth/index";
export default {
  name: "Navigation",
  props: {
    isActiveLogo: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return { isModalActive: false };
  },
  methods: {
    exitModal() {
      this.isModalActive = false;
    },
    canActivate() {
      return auth.user.authenticated;
    },
  },
};
</script>
<style scoped>
.disabled {
  display: none;
}
.active {
  text-transform: uppercase;
  font-weight: bolder;
}
.navbar-item:hover {
  transform: scale(1.2);
  color: #00d1b2;
}
@media screen and (max-width: 1023px) {
  .navbar-menu {
    display: block !important;
  }
}
</style>
