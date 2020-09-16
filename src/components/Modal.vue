<template>
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
</template>
<script>
export default {
  data() {
    return { isModalActive: false };
  },
  methods: {
    exitModal() {
      this.isModalActive = false;
    },
  },
};
</script>