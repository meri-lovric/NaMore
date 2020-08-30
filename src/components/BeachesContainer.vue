<template>
  <div class="tile is-ancestor">
    <div class="modal" :class="{'is-active': isModalActive}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="notification is-danger">
          <button class="delete" @click="exitModal()"></button>
          Nedozvoljena radnja. Ulogirajte se ili napravite profil.
          <div>
            <router-link to="/signin" class="navbar-item">
              <button class="button is-rounded">Sign-in</button>
            </router-link>

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
                class="icon is-small"
                v-bind:class="{ liked: beach.isClicked }"
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
export default {
  name: "BeachesContainer",
  data() {
    return {
      beaches: [],
      isModalActive: false,
    };
  },
  methods: {
    upvote(beachId) {
      axios.get("http://localhost:3000/beaches/" + beachId).then((response) => {
        let likes = response.data.likes;
        likes++;
        console.log(response.data);
        this.$forceUpdate();

        axios
          .patch(
            `http://localhost:3000/beaches/` + beachId,
            [
              { propName: "likes", value: likes },
              { propName: "isClicked", value: !response.data.isClicked },
            ],
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lcmkubG92cmljQG1haWwuY29tIiwidXNlcklkIjoiNWY0YWM0MWU2NzI3N2YzMzQwM2JmODY1IiwiaWF0IjoxNTk4ODAwOTY0LCJleHAiOjE1OTg4MDQ1NjR9.RSVAT8-XLLpXLKP02WzfCGqYTVa6pt2HVCUmRmKCAfg",
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            this.isModalActive = true;
          });
      });
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
  },
  mounted() {
    var self = this;
    axios
      .get("http://localhost:3000/beaches")
      .then((response) => {
        self.beaches = JSON.parse(JSON.stringify(response.data));
        console.log(self.beaches);
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