<template>
  <div>
    <div class="tile is-ancestor">
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

    <Navigation :isActiveLogo="true" />
    <section class="hero is-info is-large">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Plaže Jadrana</h1>
          <nav class="level">
            <!-- Left side -->
            <div class="level-left column">
              <div class="level-item">
                <p class="subtitle is-5">
                  <strong>Pregledajte sve dodane plaže</strong>
                </p>
              </div>
              <div class="level-item">
                <div class="field has-addons">
                  <p class="control">
                    <input
                      class="input"
                      type="text"
                      @keyup="searchBeaches()"
                      placeholder="Pregledaj plaže..."
                      ref="beachText"
                    />
                  </p>
                  <p class="control">
                    <button class="button is-dark" @click="searchBeaches()">Search</button>
                  </p>
                </div>
              </div>
            </div>
            <div v-if="canActivate()" class="icon">
              <font-awesome-icon icon="slash" />
            </div>
            <!-- Right side -->
            <div v-if="canActivate()" class="level-right column">
              <p class="level-item subtitle is-5">
                <strong>dodajte novu</strong>
              </p>
              <router-link to="/newbeachform" class="icon">
                <font-awesome-icon icon="plus-circle" />
              </router-link>
            </div>
          </nav>
        </div>
      </div>
    </section>
    <div class="columns">
      <div class="column">
        <div
          class="beach-card"
          v-for="(beach,index) in beaches.beaches"
          :key="index"
          :class="{hidden: beach.isHidden}"
        >
          <BeachCard :beach="beach" />
        </div>
        <div>
          <strong>{{searchResult}}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import BeachCard from "../components/BeachCard";
import { bus } from "../main";
import axios from "axios";
import auth from "../auth/index";
export default {
  components: { BeachCard, Navigation },
  data() {
    return { searchResult: "", bus, beaches: [], isModalActive: false };
  },

  methods: {
    searchBeaches() {
      this.beaches.forEach((beach) => {
        if (!beach.name.includes(this.$refs.beachText.value)) {
          beach.isHidden = true;
          this.searchResult = "Nema rezultata";
        } else {
          this.searchResult = "";
        }
      });
      if (this.$refs.beachText.value === "") {
        this.beaches.forEach((beach) => {
          beach.isHidden = false;
        });
      }
    },
    exitModal() {
      this.isModalActive = false;
    },
     canActivate() {
      auth.checkAuth();
      return auth.user.authenticated;
    },
  },
  created() {},
  mounted() {
    var self = this;
    axios
      .get("http://localhost:3000/beaches")
      .then((response) => {
        self.beaches = JSON.parse(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
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
.icon {
  cursor: pointer;
  font-size: x-large;
  transform: rotate(90deg);
  color:white;
}
.hidden {
  display: none;
}
.modal-background {
  background: white;
}
</style>
