<template>
  <div class="tile is-ancestor">
    <div class="modal" :class="{'is-active': isModalActive}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="notification is-danger">
          <button class="delete" @click="exitModal()"></button>
          Nedozvoljena radnja. Ulogirajte se ili napravite profil.
          <div>
            <button class="button is-rounded">
              <router-link to="/signin" class="navbar-item">Sign-in</router-link>
            </button>
            <button class="button is-warning is-rounded">Sign-up</button>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>

    <div v-if="beaches.count > 0" class="tile is-parent is-12 scrolling-wrapper">
      <div v-for="(beach, index) in beaches.beaches" :key="index" class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="getImage() + beach.beachImage" alt="Placeholder image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <span
                v-if="renderComponent"
                class="icon is-small"
                v-bind:class="{ liked: isLikedByUser(beach._id) }"
                @change="reload()"
              >
                <font-awesome-icon icon="heart" @click="upvote(beach._id)" />
                <strong class="has-text-info">{{ beach.likes }}</strong>
              </span>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ beach.name }}</p>
              <p class="subtitle is-6">@{{beach.author.username}}</p>
            </div>
          </div>
          <div class="content">{{ beach.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
import axios from "axios";
import auth from "../auth/index";
export default {
  name: "BeachesContainer",
  data() {
    return {
      beaches: [],
      isModalActive: false,
      authToken: "",
      renderComponent: true,
    };
  },
  methods: {
    upvote(beachId) {
      //console.log(auth.user.userObject.liked.includes(beachId))
      //console.log(auth.user.userObject.liked)
      let found = auth.user.userObject.liked.includes(
        (beach) => beach._id == beachId
      );
      let beach = this.beaches.beaches.find((beach) => beach._id == beachId);
      console.log(found);
      console.log(beach);
      if (found) {
        axios
          .put(
            `http://localhost:3000/users/removeLiked`,
            { beachId: beachId, userId: auth.user.userObject._id },
            {
              headers: {
                Authorization: this.authToken,
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .patch(
            "http://localhost:3000/beaches/" + beachId,
            [{ propName: "likes", value: beach.likes - 1 }],
            {
              headers: {
                Authorization: this.authToken,
              },
            }
          )
          .then(console.log("After patch unlike:" + beach.likes))
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .put(
            `http://localhost:3000/users/addLiked`,
            { beachId: beachId, userId: auth.user.userObject._id },
            {
              headers: {
                Authorization: this.authToken,
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.forceRerender();
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .patch(
            "http://localhost:3000/beaches/" + beachId,
            [{ propName: "likes", value: beach.likes + 1 }],
            {
              headers: {
                Authorization: this.authToken,
              },
            }
          )
          .then(console.log("After patch like:" + beach.likes))
          .catch((error) => {
            console.log(error);
          });
      }
    },
    exitModal() {
      this.isModalActive = false;
    },
    showCardInGallery(index) {
      bus.$emit("showCardInGallery", index);
      this.$router.push({ name: "Beaches" });
    },
    getImage() {
      return "http://localhost:3000/";
    },

    isLikedByUser(clickedBeachId) {
      if (auth.user.userObject.liked.length == 0) {
        return false;
      }
      if (
        auth.user.userObject.liked.find((beach) => beach._id == clickedBeachId)
      ) {
        return true;
      } else {
        return false;
      }
    },
    forceRerender() {
      // remove the my-component component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // add my-component component in DOM
        this.renderComponent = true;
      });
    },
  },
  mounted() {
    var self = this;
    self.authToken = auth.getAuthHeader();
    axios
      .get("http://localhost:3000/beaches")
      .then((response) => {
        self.beaches = JSON.parse(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  margin-right: 5%;
}
.card {
  display: inline-block;
  margin-left: 2%;
  margin-right: 2%;
  width: calc(500px + 6 * ((100vw - 320px) / 680));
}
.content {
  white-space: break-spaces;
  width: 50vh;
}
.tile.is-ancestor:last-child {
  margin-right: 5%;
}
.icon {
  cursor: pointer;
  color: #c9c9c9;
}
.icon:hover {
  color: red;
  transform: scale(1.2);
}
.icon.liked {
  color: red;
}
.has-text-info {
  color: #00d1b2 !important;
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.modal-content {
  display: flex;
  flex-direction: column;
}
</style>