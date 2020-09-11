<template>
  <div>
    <nav class="navbar level" role="navigation" aria-label="main navigation">
      <div class="navbar-brand level-left" :class="{disabled: !isActiveLogo }">
        <a class="navbar-item" href>
          <img src="../assets/banner.jpg" width="56" />
        </a>

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
            <router-link :class="{'active':this.$route.path=='/home'}" to="/home" class="navbar-item">Home</router-link>
          </a>

          <router-link :class="{'active':this.$route.path=='/profile'}" v-if="canActivate()" to="/profile" class="navbar-item">Profile</router-link>

          <router-link :class="{'active':this.$route.path=='/beaches'}" to="/beaches" class="navbar-item">Plaže</router-link>
        </div>
      </div>
    </nav>
    <div class="modal" :class="{'is-active': isModalActive}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="notification is-danger">
          <button class="delete" @click="exitModal()"></button>
          Nedozvoljena radnja. Ulogirajte se ili napravite profil.
          <div>
            <button class="button is-rounded">
              <router-link to="/signin" class="navbar-item">Sign-in</router-link>
            </button>
            <button class="button is-warning is-rounded">Sign-up</button>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
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
    return { isModalActive: false, loggedUser: Object, users: [] };
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
  mounted() {
    var self = this;
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        self.users = JSON.parse(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.disabled {
  display: none;
}
.active{
  text-transform: uppercase;
  font-weight: bolder;
}
.navbar-item:hover{
  transform: scale(1.2);
  color:#00d1b2;
}
</style>
