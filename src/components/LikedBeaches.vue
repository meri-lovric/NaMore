<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Omiljene plaže</h1>
      <h2 class="subtitle">
        <div class="field has-addons">
          <p class="control">
            <input
              class="input"
              @keyup="search()"
              ref="beachText"
              type="text"
              placeholder="Pretraži omiljene plaže"
            />
          </p>
          <p class="control">
            <button class="button" @click="search()">Pretraži</button>
          </p>
        </div>
      </h2>
      <div class="columns is-multiline">
        <div v-for="(beach, index) in filteredBeaches" :key="index" class="card column is-4">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="getImage()+beach.beachImage" alt="Placeholder image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ beach.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <strong>
        <p v-if="fetchedPosts == 0">Nema rezultata</p>
      </strong>
    </div>
  </section>
</template>

<script>
import auth from "../auth/index";
export default {
  data() {
    return { childMessage: 0, userBeaches: [], filteredBeaches: [], fetchedPosts:1 };
  },
  methods: {
    search() {
      this.fetchedPosts = 0;
      this.filteredBeaches = [];
      for (let i = 0; i < this.userBeaches.length; i++) {
        if (
          this.userBeaches[i].name
            .toLowerCase()
            .includes(this.$refs.beachText.value.toLowerCase())
        ) {
          this.filteredBeaches.push(this.userBeaches[i]);
        }
      }
      this.fetchedPosts = this.filteredBeaches.length;
      if (!this.$refs.beachText.value) {
        this.filteredBeaches = this.userBeaches;
      }
    },
    getImage() {
      return "http://localhost:3000/";
    },
    emitToParent() {
      this.$emit("childToParent", this.childMessage);
    },
  },
  mounted() {
    this.userBeaches = auth.user.userObject.liked;
    console.log(this.userBeaches);
    this.filteredBeaches = this.userBeaches;
    console.log(this.filteredBeaches);
    this.childMessage = this.userBeaches.length;
    this.emitToParent();
  },
};
</script>
<style scoped>
.subtitle {
  display: flex;
  justify-content: center;
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>