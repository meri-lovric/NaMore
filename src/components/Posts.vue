<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Posts</h1>
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
      <SinglePost />
      <SinglePost />
      <SinglePost />
    </div>
  </section>
</template>

<script>
import SinglePost from "./SinglePost.vue";
export default {
  components: { SinglePost },
};
</script>
<style scoped>
.subtitle {
  display: flex;
  justify-content: center;
}
</style>