<template>
  <div>
    <Navigation />
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
            <div v-if="canActivate()" class="divider">
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
        <div class="control options">
          <nav class="level">
            <div class="field">
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    ref="beachBar"
                    @change="handleRadioClick('bar')"
                  />
                  <p class="heading">Beach Bar</p>
                  <p class="title">
                    <font-awesome-icon icon="coffee" />
                  </p>
                </label>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    ref="beachShade"
                    @change="handleRadioClick('shade')"
                  />
                  <p class="heading">Hlad</p>
                  <p class="title">
                    <font-awesome-icon icon="umbrella-beach" />
                  </p>
                </label>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    ref="beachKids"
                    @change="handleRadioClick('kids')"
                  />
                  <p class="heading">Djeca</p>
                  <p class="title">
                    <font-awesome-icon icon="child" />
                  </p>
                </label>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    ref="beachPets"
                    @change="handleRadioClick('pets')"
                  />
                  <p class="heading">Životinje</p>
                  <p class="title">
                    <font-awesome-icon icon="dog" />
                  </p>
                </label>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    ref="beachParking"
                    @change="handleRadioClick('parking')"
                  />
                  <p class="heading">Parking</p>
                  <p class="title">
                    <font-awesome-icon icon="parking" />
                  </p>
                </label>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    ref="beachFood"
                    @change="handleRadioClick('food')"
                  />
                  <p class="heading">Hrana</p>
                  <p class="title">
                    <font-awesome-icon icon="utensils" />
                  </p>
                </label>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
    <div class="columns">
      <div class="column">
        <div class="subtitle is-5">
          <strong>Sortirajte prema "Sviđa mi se"</strong>
          <font-awesome-icon
            class="icon"
            :style="{'color': '#3298dc'}"
            @click="sortByLikes()"
            icon="sort"
          />
        </div>
        <div class="beach-card" v-for="(beach,index) in filteredBeaches" :key="index">
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
import axios from "axios";
import auth from "../auth/index";
export default {
  components: { BeachCard, Navigation },
  data() {
    return {
      searchResult: "",
      beaches: [],
      isModalActive: false,
      fetchedPosts: 1,
      filteredBeaches: [],
      isClickedSort: false,
    };
  },

  methods: {
    sortByLikes() {
      if (this.isClickedSort) {
        this.beaches.beaches.sort(function (a, b) {
          return a.likes - b.likes;
        });
      } else {
        this.beaches.beaches.sort(function (a, b) {
          return b.likes - a.likes;
        });
      }
      this.isClickedSort = !this.isClickedSort;
    },
    handleRadioClick(value) {
      this.filteredBeaches = [];
      switch (value) {
        case "bar": {
          this.beaches.beaches.forEach((el) => {
            if (el.bar == true) {
              this.filteredBeaches.push(el);
            }
          });
          break;
        }
        case "pets": {
          this.beaches.beaches.forEach((el) => {
            if (el.pets == true) {
              this.filteredBeaches.push(el);
            }
          });
          break;
        }
        case "kids": {
          this.beaches.beaches.forEach((el) => {
            if (el.kids == true) {
              this.filteredBeaches.push(el);
            }
          });
          break;
        }
        case "parking": {
          this.beaches.beaches.forEach((el) => {
            if (el.parking == true) {
              this.filteredBeaches.push(el);
            }
          });
          break;
        }
        case "food": {
          this.beaches.beaches.forEach((el) => {
            if (el.food == true) {
              this.filteredBeaches.push(el);
            }
          });
          break;
        }
        case "shade": {
          this.beaches.beaches.forEach((el) => {
            if (el.shade == true) {
              this.filteredBeaches.push(el);
            }
          });
          break;
        }
      }
      this.filteredBeaches.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    },
    searchBeaches() {
      this.fetchedPosts = 0;
      this.filteredBeaches = [];
      this.beaches.beaches.forEach((el) => {
        if (
          el.name
            .toLowerCase()
            .includes(this.$refs.beachText.value.toLowerCase())
        ) {
          this.filteredBeaches.push(el);
        }
      });

      this.fetchedPosts = this.filteredBeaches.length;
      this.filteredBeaches.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      if (!this.$refs.beachText.value) {
        this.filteredBeaches = this.beaches.beaches;
      }
    },
    exitModal() {
      this.isModalActive = false;
    },
    canActivate() {
      return auth.user.authenticated;
    },
  },
  mounted() {
    var self = this;
    axios
      .get("https://na-more.netlify.app/beaches")
      .then((response) => {
        self.beaches = JSON.parse(JSON.stringify(response.data));
        self.filteredBeaches = self.beaches.beaches;
        self.filteredBeaches.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://na-more.netlify.app/users")
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
  color: white;
}
.divider {
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
.options {
  position: relative;
  margin: 0px 10rem;
}

</style>
