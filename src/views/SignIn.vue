<template>
  <div>
    <Navigation :isActiveLogo="true" />
    <div class="input-field">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email" ref="email" />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="envelope" />
          </span>
          <span class="icon is-small is-right">
            <font-awesome-icon icon="check" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" ref="password" placeholder="Password" />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="lock" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" @click="submitLogin">Login</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Navigation from "../components/Navigation";
import axios from "axios";
export default {
  components: {
    Navigation,
  },
  methods: {
    submitLogin() {
      console.log( this.$refs.email.value + "\n"+ this.$refs.password.value)
      axios
        .post("http://localhost:3000/users/login", {
          email: this.$refs.email.value,
          text: this.$refs.password.value,
        })
        .then((response) => {
          console.log("Successful login" + response.data);
          console.log(response.data.token);
        })
        .catch(() => {
          console.log("Failed login");
        });
    },
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
</style>