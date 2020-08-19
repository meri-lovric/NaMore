<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Plaže</h1>
      <h2 class="subtitle">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" placeholder="Find a friend" />
          </p>
          <p class="control">
            <button class="button">Search</button>
          </p>
        </div>
      </h2>
      <div class="columns is-multiline">
        <div v-for="(beach, index) in beaches" :key="index" class="card column is-4">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="beach.url" alt="Placeholder image" />
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
    </div>
  </section>
</template>

<script>
import { beaches } from "../seed";

export default {
  data() {
    return { beaches };
  },
};
</script>
<style scoped>
.subtitle {
  display: flex;
  justify-content: center;
}
</style>