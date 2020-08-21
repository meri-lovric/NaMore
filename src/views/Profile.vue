<template>
  <div>
    <section class="hero is-primary is-medium">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
              </a>
              <span class="navbar-burger burger" data-target="navbarMenuHeroA">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item is-active">
                  <router-link to="/">Home</router-link>
                </a>
                <a class="navbar-item">Gallery</a>
                <span class="navbar-item">
                  <a class="button is-primary is-inverted">
                    <span class="icon">
                      <i class="fab fa-github"></i>
                    </span>
                    <span>Sign out</span>
                  </a>
                </span>
              </div>
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
        <button class="modal-close is-large"  aria-label="close"></button>
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
export default {
  components: {
    ProfileInfo,
    FriendsList,
    Posts,
    Gallery,
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
      user: {
        id: 1,
        name: "Meri",
        username: "merixo",
        photo:
          "https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1090&q=80",
      },
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
        id: 1,
        postBody: this.$refs.statusText.value,
        username: this.user.username,
        name: this.user.name,
        profilePhoto: this.user.photo,
        isHidden: false,
      };
      if (this.$refs.statusText.value) {
        posts.push(newPost);
      } else {
        this.isModalActive = true;
      }
    },
    exitModal() {
      this.isModalActive = false;
    }
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