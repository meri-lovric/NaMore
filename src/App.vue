<template>
<div id="app">
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>NaMore</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css" />
    </head>
    <body>
      <Navigation :isActiveLogo="true"  />
      <section class="section">
        <div class="container">
          <HeroTitle pageName="NaMore" pageSubtitle="Di se kupaš?" />
        </div>
      </section>
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
      <Footer />
    </body>
  </html>
</div>
</template>

<script>
import HeroTitle from "./components/HeroTitle.vue";
import CitiesContainer from "./components/CitiesContainer.vue";
import Footer from "./components/Footer.vue";
import SinglePost from "./components/SinglePost.vue";
import Navigation from "./components/Navigation.vue";



export default {
  name: "App",
  components: {
    HeroTitle,
    CitiesContainer,
    Footer,
    SinglePost,
    Navigation
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
