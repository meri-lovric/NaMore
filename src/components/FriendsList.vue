<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Friends</h1>
      <h2 class="subtitle">
        <div class="field has-addons">
          <p class="control">
            <input
              class="input"
              ref="friendsText"
              @keyup.enter="searchPosts()"
              type="text"
              placeholder="Find a friend"
            />
          </p>
          <p class="control">
            <button class="button" @click="searchPosts()">Search</button>
          </p>
        </div>
      </h2>
      <div class="friends-container">
        <div
          class="level-left"
          v-for="(user,index) in users"
          :key="index"
          :class="{hidden: user.isHidden}"
        >
          <div class="level-item image is-128x128">
            <img class="is-rounded" :src="user.photo" />
          </div>
          <div class="level-item">
            <strong>{{user.name}}</strong>
          </div>
          <div class="level-item">@{{user.username}}</div>
        </div>
      </div>
      <strong>
        <p>{{searchResult}}</p>
      </strong>
    </div>
  </section>
</template>
<script>
import { users } from "../users.js";
export default {
  data() {
    return { users, searchResult: "" };
  },
  methods: {
    searchPosts() {
      this.users.forEach((user) => {
        if (!user.name.includes(this.$refs.friendsText.value)) {
          user.isHidden = true;
          this.searchResult = "Nema rezultata";
        } else {
          this.searchResult = "";
        }
      });
      if (this.$refs.friendsText.value === "") {
        this.users.forEach((user) => {
          user.isHidden = false;
        });
      }
    },
  },
};
</script>
<style scoped>
.section img {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.level-left {
  margin-top: 2rem;
}
.subtitle {
  display: flex;
  justify-content: center;
}
.friends-container {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 20rem);
}
@media only screen and (max-width: 1000px) {
  .friends-container {
    display: flex;
    flex-direction: row;
  }
}

@media only screen and (max-width: 1500px) {
  .friends-container {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 20rem);
  }
}

.hidden {
  display: none;
}
</style>
