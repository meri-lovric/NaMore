<template>
  <div id="app">
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Adriatico</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
  </head>
  <body>
  <section class="section">
    <div class="container">
    <HeroTitle pageName="Travel" />
    </div>
  </section>
  <CitiesContainer/>
  <Footer/>
  </body>
</html>
</div>
</template>

<script>
import HeroTitle from './components/HeroTitle.vue'
import CitiesContainer from './components/CitiesContainer.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    HeroTitle,
    CitiesContainer,
    Footer
  }
}
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
