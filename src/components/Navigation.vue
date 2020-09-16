<template>
  <div>
    <nav class="navbar level" role="navigation" aria-label="main navigation">
      <div class="navbar-brand level-left">
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link
              :class="{'active':this.$route.path=='/home'}"
              to="/home"
              class="navbar-item"
            >Home</router-link>
          </a>

          <router-link
            :class="{'active':this.$route.path=='/profile'}"
            v-if="canActivate()"
            to="/profile"
            class="navbar-item"
          >Profile</router-link>

          <router-link
            :class="{'active':this.$route.path=='/beaches'}"
            to="/beaches"
            class="navbar-item"
          >Plaže</router-link>
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
      auth.checkAuth();
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
</style>
