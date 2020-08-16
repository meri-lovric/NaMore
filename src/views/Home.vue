<template>
<div>
   <Navigation :isActiveLogo="true"  />
      <section class="section">
        <div class="container">
          <HeroTitle pageName="NaMore" pageSubtitle="Di se kupaš?" />
        </div>
      </section>
      <router-view/>
      <CitiesContainer />
      <body>
        <section class="section">
          <div class="container">
            <h1 class="title">Feed</h1>
            <h2 class="subtitle">
              A simple container to divide your page into
              <strong>sections</strong>, like the one you're currently reading
            </h2>
            
            <SinglePost />
            <SinglePost />
          <SinglePost />
          

          </div>
        </section>
        </body>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroTitle from "../components/HeroTitle";
import CitiesContainer from "../components/CitiesContainer.vue";
import SinglePost from "../components/SinglePost.vue";
import Navigation from "../components/Navigation.vue";

export default {
  name: "App",
  components: {
    HeroTitle,
    CitiesContainer,
    SinglePost,
    Navigation
  },
};
</script>