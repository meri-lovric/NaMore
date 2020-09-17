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
      <router-view />
      <div v-show="signIn" class="logout-icon" @click="logout">
        <font-awesome-icon icon="sign-out-alt" />
      </div>
      <Footer />
    </body>
  </html>
  <link href="https://fonts.googleapis.com/css?family=Archivo+Black|Judson:400,700" rel="stylesheet">
</div>
</template>

<script>
import Footer from "./components/Footer.vue";
import auth from "./auth/index"
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Footer,
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      auth.user.authenticated = false;
      this.$router.push('/')
    },
  },
  computed: {
    signIn() {
      if (this.$route.path == "/" || this.$route.path == "/signup") {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style>
body, p {
 font-family: 'Work Sans', sans-serif;
 font-weight: 300 !important;
}

h1, h2, h3, h4, h5, h6 {
 font-family: 'Montserrat', sans-serif;
 font-weight: 900 !important;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logout-icon {
  cursor: pointer;
  font-size: xx-large;
}
.logout-icon:hover{
  transform: scale(1.2)
}
</style>
