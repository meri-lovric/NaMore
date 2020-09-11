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
            <div class="image-shadow-wrapper">
              <div class="image-shadow">
                <img :src="getImage()+user.userImage" />
              </div>
            </div>
          </h1>
          <h2 class="subtitle">
            {{user.name}}
            <br />
            @{{user.username}}
          </h2>
          <ProfileInfo
            :galleryNum="galleryNumfromChild"
            :likedNum="likedNumfromChild"
            :statusNum="statusNumfromChild"
          />

          <input
            class="input is-rounded"
            ref="statusText"
            type="text"
            placeholder="Novi status ..."
            @keyup.enter="submitStatus()"
          />
          <button class="button is-primary is-inverted is-outlined" @click="submitStatus()">Pošalji</button>
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
                <a>{{option.title}}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <div class :class="{hidden: !options.find(option => option.id === 1).isActive}">
      <Posts v-if="renderComponent" @childToParent="onStatusChildMount" />
    </div>
    <div :class="{hidden: !options.find(option => option.id === 2).isActive}">
      <Gallery @childToParent="onGalleryChildMount" />
    </div>
    <div :class="{hidden: !options.find(option => option.id === 3).isActive}">
      <LikedBeaches @childToParent="onLikedChildMount" />
    </div>
  </div>
</template>

<script>
import ProfileInfo from "../components/ProfileInfo";
import Posts from "../components/Posts.vue";
import Gallery from "../components/Gallery";
import LikedBeaches from "../components/LikedBeaches"
import Navigation from "../components/Navigation";
import axios from "axios";
import auth from "../auth/index";
export default {
  components: {
    ProfileInfo,
    Posts,
    Gallery,
    LikedBeaches,
    Navigation,
  },

  data() {
    return {
      options: [
        {
          id: 1,
          title: "Objave",
          isActive: true,
        },
        {
          id: 2,
          title: "Plaže",
          isActive: false,
        },

        {
          id: 3,
          title: "Omiljene",
          isActive: false,
        },
      ],
      // posts,
      isModalActive: false,
      galleryNumfromChild: 0,
      likedNumfromChild: 0,
      statusNumfromChild: 0,
      user: {},
      authToken: "",
      renderComponent: true,
    };
  },
  methods: {
    forceRerender() {
      // remove the my-component component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // add my-component component in DOM
        this.renderComponent = true;
      });
    },
    onGalleryChildMount(value) {
      this.galleryNumfromChild = value;
    },
    onLikedChildMount(value) {
      this.likedNumfromChild = value;
    },
    onStatusChildMount(value) {
      this.statusNumfromChild = value;
    },
    getImage() {
      return "http://localhost:3000/";
    },
    changeTab(optionId) {
      let clickedOption = this.options.find((option) => option.id === optionId);
      clickedOption.isActive = !clickedOption.isActive;
      let disableOptions = this.options.filter(
        (option) => option.id != optionId
      );
      disableOptions.forEach((option) => (option.isActive = false));
    },
    submitStatus() {
      axios
        .post(
          "http://localhost:3000/posts/",
          {
            userId: this.user._id,
            text: this.$refs.statusText.value,
          },
          {
            headers: {
              Authorization: this.authToken,
            },
          }
        )
        .then((response) => {
          this.$refs.statusText.value = "";
          console.log(response);
          this.forceRerender();
        })
        .catch((error) => {
          if (!this.$refs.statusText.value) {
            this.isModalActive = true;
          }
          console.log(error);
        });
    },
    exitModal() {
      this.isModalActive = false;
    },
  },
  mounted() {
    var self = this;
    this.authToken = auth.getAuthHeader();
    self.user = auth.user.userObject;
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  width: 20rem;
  height: 20rem;
}
.title img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.image-shadow-wrapper {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  transition: all 0.4s;
}
.image-shadow-wrapper:hover {
  transform: scale(1.025);
}

.image-shadow {
  position: relative;
  background: var(--image) no-repeat center;
  border-radius: 5px;
  width: 300px;
  height: 300px;
  backface-visibility: hidden;
}
.image-shadow::after {
  content: "";
  position: absolute;
  top: 1%;
  left: 0.5%;
  width: 99%;
  height: 99%;
  background: var(--image) no-repeat center;
  filter: blur(0);
  opacity: 0;
  transition: all 0.4s;
  z-index: -1;
}

.image-shadow:hover::after {
  opacity: 1;
  filter: blur(15px);
}
</style>