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
            <div class="icon">
              <font-awesome-icon icon="slash" />
            </div>
            <!-- Right side -->
            <div class="level-right column">
              <p class="level-item subtitle is-5">
                <strong>dodajte novu</strong>
              </p>
              <div class="icon">
                <router-link to="/newbeachform" class="navbar-item">
                  <font-awesome-icon icon="plus-circle" />
                </router-link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
    <div class="columns">
      <div class="column">
        <div
          class="beach-card"
          v-for="(beach,index) in beaches"
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
import { beaches } from "../seed.js";
import BeachCard from "../components/BeachCard";
import { bus } from "../main";
export default {
  components: { BeachCard, Navigation },
  data() {
    return { beaches, searchResult: "", bus };
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
    scrollToCard() {
      let cards = this.$el.querySelectorAll(".beach-card");
    
      cards[1].scrollIntoView();
    },
  },
  created() {
    bus.$on("showCardInGallery", (beach) => {
      this.scrollToCard(beach);
    });
  },
  mounted() {
    this.scrollToCard();
  },
};
</script>
<style scoped>
.icon {
  cursor: pointer;
  font-size: x-large;
  transform: rotate(90deg);
}
.hidden {
  display: none;
}
.modal-background {
  background: white;
}
</style>
