<template>
  <div class="tile is-ancestor">
    <div v-if="beaches.count > 0" class="tile is-parent is-12 scrolling-wrapper">
      <div v-for="(beach, index) in beaches.beaches.slice(beaches.beaches.length - 5,beaches.beaches.length).reverse()" :key="index" class="card">
        <div @click="showBeachPage(beach)" class="card-image">
          <figure class="image is-4by3">
            <img :src="getImage() + beach.beachImage" alt="Placeholder image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <span
                v-if="renderComponent && canActivate()"
                class="icon is-small"
                v-bind:class="{ liked: isLikedByUser(beach._id) }"
                @change="reload()"
              >
                <font-awesome-icon  icon="heart" @click="upvote(beach)" />
              </span>
              <strong v-if="renderComponent" class="has-text-info">{{ beach.likes }}</strong>
            </div>
            <div class="media-content">
              <p class="title is-4" @click="showBeachPage(beach)">{{ beach.name }}</p>
              <p class="subtitle is-6">@{{beach.author.username}}</p>
            </div>
          </div>
          <div class="content description">{{ beach.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import auth from "../auth/index";
export default {
  name: "BeachesContainer",
  data() {
    return {
      beaches: [],
      authToken: "",
      renderComponent: true,
    };
  },
  methods: {
    upvote(beach) {
      let liked = auth.user.userObject.liked;
      let found = false;
      liked.forEach((el) => {
        if (el._id == beach._id) {
          found = true;
        }
      });
      if (!found) {
        liked.unshift(beach);

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
                [{ propName: "likes", value: beach.likes + 1 }],
                {
                  headers: {
                    Authorization: this.authToken,
                  },
                }
              )
              .then(() => {
                beach.likes++;

                this.forceRerender();
              })
              .catch((error) => {
                console.log(error);
              });
            console.log(response);
          });
      } else {
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
                beach.likes--;
                this.forceRerender();
              })
              .catch((error) => {
                console.log(error);
              });
            console.log(response);
          });
      }
    },
    showBeachPage(beach) {
      this.$router.push({ name: "BeachPage", params: { beach } });
    },
    getImage() {
      return "https://na-more.netlify.app/";
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
    canActivate(){
      return auth.user.authenticated;
    }
  },
  mounted() {
    var self = this;
    self.authToken = auth.getAuthHeader();
    axios
      .get("https://na-more.netlify.app/beaches")
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
.card-image {
  cursor: pointer;
}
.card-image:hover {
  transform: scale(1.05);
}
.content {
  white-space: break-spaces;
  width: 50vh;
}
.tile.is-ancestor:last-child {
  margin-right: 5%;
}
.title{
  cursor: pointer;
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
  margin-left: 5%;
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
.subtitle {
  color: #00d1b2;
}
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>