<template>
  <div>
    <section class="hero is-primary is-medium">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div id="navbarMenuHeroA" class="navbar-menu">
              <Navigation />
            </div>
          </div>
        </nav>
      </div>
      <div class="modal" :class="{'is-active': isModalActive}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="notification is-danger">
            <button class="delete" @click="exitModal()"></button>
            Greška! Ne možete poslati prazan status.
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <img :src="user.photo" />
          </h1>
          <h2 class="subtitle">
            {{user.name}}
            <br />
            @{{user.username}}
          </h2>
          <ProfileInfo :userId="user.id" />

          <input
            class="input is-rounded"
            ref="statusText"
            type="text"
            placeholder="Novi status ..."
            @keyup.enter="submitStatus()"
          />
          <button class="button is-primary is-inverted is-outlined" @click="submitStatus()">Submit</button>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <nav class="tabs">
          <div class="container">
            <ul>
              <li
                v-for="(option, index) in options"
                :key="`option-${index}`"
                @click="changeTab(option.id)"
              >
                <a>{{option.title}}{{index}}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <div class :class="{hidden: !options.find(option => option.id === 1).isActive}">
      <Posts :userId="user.id" />
    </div>
    <div :class="{hidden: !options.find(option => option.id === 2).isActive}">
      <FriendsList />
    </div>
    <div :class="{hidden: !options.find(option => option.id === 3).isActive}">
      <Gallery />
    </div>
  </div>
</template>

<script>
import ProfileInfo from "../components/ProfileInfo";
import FriendsList from "../components/FriendsList";
import Posts from "../components/Posts.vue";
import Gallery from "../components/Gallery";
import { posts } from "../posts.js";
import { user } from "../user.js";
import Navigation from "../components/Navigation";
export default {
  components: {
    ProfileInfo,
    FriendsList,
    Posts,
    Gallery,
    Navigation,
  },
  data() {
    return {
      options: [
        {
          id: 1,
          title: "Overview",
          isActive: true,
        },
        {
          id: 2,
          title: "Friends",
          isActive: false,
        },
        {
          id: 3,
          title: "Collection",
          isActive: false,
        },
      ],
      user,
      posts,
      isModalActive: false,
    };
  },
  methods: {
    changeTab(optionId) {
      let clickedOption = this.options.find((option) => option.id === optionId);
      clickedOption.isActive = !clickedOption.isActive;
      let disableOptions = this.options.filter(
        (option) => option.id != optionId
      );
      disableOptions.forEach((option) => (option.isActive = false));
    },
    submitStatus() {
      let newPost = {
        id: this.user.id,
        postBody: this.$refs.statusText.value,
        username: this.user.username,
        name: this.user.name,
        photo: this.user.photo,
        isHidden: false,
      };
      if (this.$refs.statusText.value) {
        posts.push(newPost);
        this.$refs.statusText.value = "";
      } else {
        this.isModalActive = true;
      }
    },
    exitModal() {
      this.isModalActive = false;
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
.button {
  margin-top: 0.75rem;
}
.title img {
  width: 35%;
  height: 35%;
}
</style>