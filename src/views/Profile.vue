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
                <a class="navbar-item is-active"><router-link to="/">Home</router-link></a>
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

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Title</h1>
          <h2 class="subtitle">Subtitle</h2>
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
                class="is-active"
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
      <ProfileInfo />
    </div>
    <div  :class="{hidden: !options.find(option => option.id === 2).isActive}">
      <FriendsList />
    </div>
    <div  :class="{hidden: !options.find(option => option.id === 3).isActive}">
        Collection
    </div>
  </div>
</template>

<script>
import ProfileInfo from "../components/ProfileInfo";
import FriendsList from "../components/FriendsList";
export default {
  components: {
    ProfileInfo,
    FriendsList
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
    };
  },
  methods: {
      changeTab(optionId){
          let clickedOption = this.options.find(option => option.id === optionId)
          clickedOption.isActive = !clickedOption.isActive;
          let disableOptions =this.options.filter(option => option.id != optionId)
          disableOptions.forEach( option => option.isActive=false)
      }
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>