<template>
  <div>
    <div class="input-field">
      <img src="../assets/logo.jpg" width="128" height="48" />

      <div class="title">Sign in</div>
      <div class="subtitle">
        Nemate račun?
        <router-link to="/signup">Kreirajte novi.</router-link>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email" v-model="email" />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="envelope" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" v-model="password" placeholder="Password" />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="lock" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" @click="submitLogin()">Login</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import auth from "../auth";
import axios from "axios"
export default {
  data() {
    return {
      email: "",
      password: "",
      users:[]
    };
  },
  methods: {
    submitLogin() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      
      axios
        .post("http://localhost:3000/users/login", {
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          console.log("Successful login");
          console.log(response.data.email);
          localStorage.setItem("token", response.data.token);
          auth.user.authenticated = true;
          let user = this.users.users.find(user => user.email == response.data.email);
          auth.user.userObject = user;
          this.$router.push("/home");
        })
        .catch(() => {
          console.log("Failed login");
          window.alert("Failed login.");
        });
    },
  },
  mounted() {
    var self = this;
    axios
      .get("http://localhost:3000/users/")
      .then((response) => {
        self.users = JSON.parse(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.input-field {
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
img {
  margin-bottom: 1.75rem;
  width: 20%;
}
</style>