<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Plaže</h1>
      <h2 class="subtitle">
        <div class="field has-addons">
          <p class="control">
            <input
              class="input"
              @keyup="search()"
              ref="beachText"
              type="text"
              placeholder="Pretraži dodane plaže"
            />
          </p>
          <p class="control">
            <button class="button" @click="search()">Pretraži</button>
          </p>
        </div>
      </h2>
      <div v-if="requestFinished" class="columns is-multiline">
        <div v-for="(beach, index) in filteredBeaches" :key="index" class="card column is-4">
          <div class="card-image">
            <button
              @click="deleteBeach(beach._id)"
              class="is-pulled-right delete has-background-danger"
            ></button>

            <figure @click="showBeachPage(beach)" class="image is-4by3">
              <img :src="getImage()+beach.beachImage" alt="Placeholder image" />
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
      <strong>
        <p v-if="fetchedPosts == 0">Nema rezultata</p>
      </strong>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import auth from "../auth/index";

export default {
  data() {
    return {
      beaches: [],
      requestFinished: false,
      childMessage: 0,
      fetchedPosts: 1,
      filteredBeaches: [],
      userBeaches: [],
      authToken: "",
    };
  },
  methods: {
    showBeachPage(beach) {
      this.$router.push({ name: "BeachPage", params: { beach } });
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
    deleteBeach(beachId) {
       let confirmation = window.confirm("Izbrisati plažu?");
      if (confirmation) {
      
      const index = this.filteredBeaches.findIndex((el) => el._id == beachId);
      if (index > -1) {
        this.filteredBeaches.splice(index, 1);
      }
      axios
        .delete("https://na-more.netlify.app/beaches/" + beachId, {
          headers: {
            Authorization: this.authToken,
          },
        })
        .then(() => {
          console.log("Successfully deleted beach");
          this.childMessage = this.userBeaches.length;
          this.emitToParent();
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
  },
  mounted() {
    var self = this;
    this.authToken = auth.getAuthHeader();

    axios
      .get("https://na-more.netlify.app/beaches/")
      .then((response) => {
        self.beaches = JSON.parse(JSON.stringify(response.data));
        self.requestFinished = true;
        self.userBeaches = self.beaches.beaches.filter(
          (beach) => beach.author._id == auth.user.userObject._id
        );
        self.filteredBeaches = self.userBeaches;
        self.filteredBeaches.sort(function (a, b) {
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
        self.childMessage = self.userBeaches.length;
        self.emitToParent();
      })
      .catch((error) => {
        console.log(error);
      });
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

.image {
  cursor: pointer;
}
.hidden {
  display: none;
}
div.card-image > button {
  z-index: 1;
}
div.card-image > button:hover {
  transform: scale(1.2);
}
</style>