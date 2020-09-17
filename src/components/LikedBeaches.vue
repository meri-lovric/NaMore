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
            <figure @click="showBeachPage(beach)" class="image is-4by3">
              <img :src="getImage()+beach.beachImage" alt="Placeholder image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">
                  {{ beach.name }}
                  <span
                    class="icon is-small has-text-danger"
                    @click="upvote(beach)"
                  >
                    <font-awesome-icon icon="heart" />
                  </span>
                </p>
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
import axios from "axios";
export default {
  data() {
    return {
      childMessage: 0,
      userBeaches: [],
      filteredBeaches: [],
      fetchedPosts: 1,
      authToken: "",
    };
  },
  methods: {
    showBeachPage(beach) {
      this.$router.push({ name: "BeachPage", params: { beach } });
    },
    upvote(beach) {

      let liked = auth.user.userObject.liked;
      const index = liked.findIndex((el) => el._id == beach._id);
      if (index > -1) {
        liked.splice(index, 1);
      }
      axios
        .patch(
          `https://na-more.netlify.app/users/` + auth.user.userObject._id,
          [{ propName: "liked", value: liked }],
          {
            headers: {
              Authorization: this.authToken,
            },
          }
        )
        .then((response) => {
          auth.user.userObject.liked = liked;
          axios
            .patch(
              "https://na-more.netlify.app/beaches/" + beach._id,
              [{ propName: "likes", value: beach.likes - 1 }],
              {
                headers: {
                  Authorization: this.authToken,
                },
              }
            )
            .then(() => {
              this.childMessage--;
              this.emitToParent();
              beach.likes--;
            })
            .catch((error) => {
              console.log(error);
            });
          console.log(response);
        });
    },
    search() {
      this.fetchedPosts = 0;
      this.filteredBeaches = [];
      this.userBeaches.forEach((el) => {
        if (
          el.name
            .toLowerCase()
            .includes(this.$refs.beachText.value.toLowerCase())
        ) {
          this.filteredBeaches.push(el);
        }
      });
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
      this.fetchedPosts = this.filteredBeaches.length;
      if (!this.$refs.beachText.value) {
        this.filteredBeaches = this.userBeaches;
      }
    },
    getImage() {
      return "https://na-more.netlify.app/";
    },
    emitToParent() {
      this.$emit("childToParent", this.childMessage);
    },
  },
  mounted() {
    this.userBeaches = auth.user.userObject.liked;
    this.authToken = auth.getAuthHeader();
    this.filteredBeaches = this.userBeaches;
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
    this.childMessage = this.userBeaches.length;
    this.emitToParent();
  },
};
</script>
<style scoped>
.title {
  color: #6b5ca5 !important;
  font-variant: small-caps;
}
.subtitle {
  display: flex;
  justify-content: center;
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.icon {
  z-index: 1;
  cursor: pointer;
  width: -webkit-fill-available;
  margin-top: 1.5%;
}
.icon:hover {
  transform: scale(1.2);
}
.image{
  cursor: pointer;
}
</style>