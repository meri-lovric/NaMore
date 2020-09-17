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

      <div class="modal" :class="{'is-active': isModalEditActive}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="notification is-primary is-inverted">
            <button class="delete" @click="exitModal()"></button>
            Učitajte novu sliku profila
            <input
              type="file"
              id="file"
              ref="file"
              @change="editImage()"
            />
            <button class="button is-primary is-inverted" @click="submitNewImage()">Učitaj sliku</button>
            <div class="container">
              <div class="field">
                <label class="label">Ime</label>
                <div class="control">
                  <input class="input" ref="name" type="text" placeholder="Novo ime" />
                  <button class="button is-primary is-inverted" @click="editInfoName()">
                    <font-awesome-icon icon="check" />
                  </button>
                </div>
              </div>
              <div class="field">
                <label class="label">Korisničko ime</label>
                <div class="control">
                  <input class="input" ref="username" type="text" placeholder="Novo korisničko ime" />
                  <button class="button is-primary is-inverted" @click="editInfoUsername()">
                    <font-awesome-icon icon="check" />
                  </button>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Delete user</label>
              <div class="control">
                <button class="button is-danger" @click="deleteUser()">
                  <font-awesome-icon icon="user-slash" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <font-awesome-icon class="edit" icon="edit" @click="isModalEditActive=true"/>

          <div class="card profile-card-1">
            <img
              src="https://images.unsplash.com/photo-1599055540469-ffb3b416c72c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
              alt="profile-sample1"
              class="background"
            />

            <img class="profile image" :src="getImage()+user.userImage" alt="profile-image" />

            <div class="card-content">
              <h2>
                {{user.name}}
                <small>@{{user.username}}</small>
              </h2>
            </div>
          </div>

          <ProfileInfo
            @childToParent="onChangeTabMount"
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
          <button class="button active-tab" @click="submitStatus()">Pošalji</button>
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
                <a :class="{'active-tab': option.isActive}" class="option">{{option.title}}</a>
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
import LikedBeaches from "../components/LikedBeaches";
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
      isModalEditActive: false,
      galleryNumfromChild: 0,
      likedNumfromChild: 0,
      statusNumfromChild: 0,
      user: {},
      authToken: "",
      renderComponent: true,
      file: "",
    };
  },
  methods: {
    deleteUser() {
      if (window.confirm("Želite li sigurno izbrisati korisnički račun?")) {
        axios
          .delete("https://na-more.netlify.app/users/" + auth.user.userObject._id, {
            headers: {
              Authorization: this.authToken,
            },
          })
          .then(() => {
            console.log("Successfully deleted user");
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("Action cancelled by user");
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
    onGalleryChildMount(value) {
      this.galleryNumfromChild = value;
    },
    onLikedChildMount(value) {
      this.likedNumfromChild = value;
    },
    onStatusChildMount(value) {
      this.statusNumfromChild = value;
    },
    onChangeTabMount(value) {
      this.changeTab(value);
    },
    getImage() {
      return "https://na-more.netlify.app/";
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
          "https://na-more.netlify.app/posts/",
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
      this.isModalEditActive = false;
    },
    editImage() {
      this.file = this.$refs.file.files[0];
    },
    submitNewImage() {
      let formData = new FormData();
      formData.append("userImage", this.file);
      console.log(auth.user.userObject.userImage);

      axios
        .patch(
          "https://na-more.netlify.app/users/" +
            auth.user.userObject._id +
            "/userImage",
          formData,
          {
            headers: {
              Authorization: this.authToken,
            },
          }
        )
        .then((response) => {
          console.log("Successfully changed image");
          console.log(auth.user.userObject.userImage);
          auth.user.userObject.userImage = response.data.userImage;
          this.isModalEditActive = false;
          this.forceRerender();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editInfoName() {
      axios
        .patch(
          "https://na-more.netlify.app/users/" + auth.user.userObject._id,
          [{ propName: "name", value: this.$refs.name.value }],
          {
            headers: {
              Authorization: this.authToken,
            },
          }
        )
        .then(() => {
          auth.user.userObject.name = this.$refs.name.value;
          console.log("After patch unlike:" + auth.user.userObject.name);
          this.isModalEditActive = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editInfoUsername() {
      axios
        .patch(
          "https://na-more.netlify.app/users/" + auth.user.userObject._id,
          [{ propName: "username", value: this.$refs.username.value }],
          {
            headers: {
              Authorization: this.authToken,
            },
          }
        )
        .then(() => {
          auth.user.userObject.username = this.$refs.username.value;
          console.log("After patch unlike:" + auth.user.userObject.username);
          this.isModalEditActive = false;
        })
        .catch((error) => {
          console.log(error);
        });
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
.edit {
  position: relative;
  left: 5%;
  top: 55px;
  z-index: 1;
  cursor: pointer;
}
.edit:hover {
  transform: scale(1.2);
}
.title img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.icon {
  position: relative;
  z-index: 1;
  bottom: -15px;
  cursor: pointer;
}
.is-active {
  display: none;
}

.active-tab {
  background-color: #f5e5fc;
  border-radius: 0px 10px;
  color: #6b5ca5 !important;
  font-variant: small-caps;
  font-weight: bold;
}
button.active-tab {
  border-radius: 10px 10px;
  box-shadow: 0 0 5px 1px rgba(52, 52, 52, 0.224);
}
button.active-tab:hover {
  transform: scale(1.1);
}

.profile-card-1 {
  position: relative;
  float: left;
  overflow: hidden;
  width: 100%;
  color: #ffffff;
  text-align: center;
  height: 368px;
  border: none;
}
.profile-card-1 .background {
  width: 100%;
  vertical-align: top;
  opacity: 0.9;
  -webkit-filter: blur(2px);
  filter: blur(2px);
  -webkit-transform: scale(1.8);
  transform: scale(1.2);
}
.profile-card-1 .card-content {
  width: 100%;
  padding: 15px 25px;
  position: absolute;
  left: 0;
  top: 50%;
}
.profile-card-1 .profile {
  border-radius: 50%;
  position: absolute;
  bottom: 50%;
  left: 50%;
  height: 150px;
  width: 150px;
  /* width: 20%; */
  object-fit: cover;
  opacity: 1;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
}
.profile-card-1 h2 {
  margin: 0 0 5px;
  font-weight: 600;
  font-size: 25px;
}
.profile-card-1 h2 small {
  display: block;
  font-size: 15px;
  margin-top: 10px;
}
.profile-card-1 i {
  display: inline-block;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  border: 1px solid #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  margin: 0 5px;
}
.profile-card-1 .icon-block {
  float: left;
  width: 100%;
  margin-top: 15px;
}
.profile-card-1 .icon-block a {
  text-decoration: none;
}
.profile-card-1 i:hover {
  background-color: #fff;
  color: #2e3434;
  text-decoration: none;
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
@media screen and (max-width: 1023px) {
  .navbar-menu {
    display: block !important;
  }
}

</style>