<template>
  <div>
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
          v-for="(beach,index) in filteredBeaches.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;})"
          :key="index"
        >
          <BeachCard :beach="beach" />
        </div>
        <div>
          <strong>
            <p v-if="fetchedPosts == 0">Nema rezultata</p>
          </strong>
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
    return {
      searchResult: "",
      bus,
      beaches: [],
      isModalActive: false,
      fetchedPosts: 1,
      filteredBeaches: [],
    };
  },

  methods: {
    searchBeaches() {
      this.fetchedPosts = 0;
      this.filteredBeaches = [];
      for (let i = 0; i < this.beaches.beaches.length; i++) {
        if (
          this.beaches.beaches[i].name
            .toLowerCase()
            .includes(this.$refs.beachText.value.toLowerCase())
        ) {
          this.filteredBeaches.push(this.beaches.beaches[i]);
        }
      }
      this.fetchedPosts = this.filteredBeaches.length;
      if (!this.$refs.beachText.value) {
        this.filteredBeaches = this.beaches.beaches;
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
  mounted() {
    var self = this;
    axios
      .get("http://localhost:3000/beaches")
      .then((response) => {
        self.beaches = JSON.parse(JSON.stringify(response.data));
        self.filteredBeaches = self.beaches.beaches;
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
  color: white;
}
.hidden {
  display: none;
}
.modal-background {
  background: white;
}
</style>
