<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand" :class="{disabled: !isActiveLogo }">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
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
        <a class="navbar-item">        <router-link to="/" class="navbar-item">Home</router-link>
</a>

        <router-link to="/profile" class="navbar-item">Profile</router-link>

        <router-link to="/beaches" class="navbar-item">Plaže</router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">More</a>

          <div class="navbar-dropdown">
            <a class="navbar-item">About</a>
            <a class="navbar-item">Jobs</a>
            <a class="navbar-item">Contact</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
            <a class="navbar-item"></a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navigation",
  props: {
    isActiveLogo: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style scoped>
.disabled {
  display: none;
}
</style>
