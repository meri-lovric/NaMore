<template>
  <div>
    <div class="input-field">
      <div class="title">Sign up</div>
      <div class="subtitle">
        Već imate račun?
        <router-link to="/">Ulogirajte se.</router-link>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="name" placeholder="Ime" v-model="name" />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="user" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="username" v-model="username" placeholder="Korisničko ime" />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="signature" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="email" v-model="email" placeholder="E-mail adresa" />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="envelope" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" v-model="password" placeholder="Lozinka" />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="lock" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left"></p>
        <div class="file">
          <form enctype="multipart/form-data">
            <div class="fields">
              <label>Učitajte sliku</label>
              <input type="file" id="file" ref="file" @change="onSelect()" />
            </div>
            <div class="message">
              <h5>{{message}}</h5>
            </div>
          </form>
        </div>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" @click="onSubmit()">Sign up</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      email: "",
      password: "",
      file: "",
      message: "",
      name: "",
      username: "",
    };
  },
  methods: {
    onSelect() {
      this.file = this.$refs.file.files[0];
    },
    onSubmit() {
      let formData = new FormData();
      formData.append("userImage", this.file);
      formData.append("name", this.name);
      formData.append("username", this.username);
      formData.append("email", this.email);
      formData.append("password", this.password);

      console.log(
        this.name,
        this.username,
        this.password,
        this.email,
        this.file,
        formData
      );
      axios
        .post("http://localhost:3000/users/signup", formData)
        .then(() => {
          console.log("Successfully created new user");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
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
.field {
  width: 45%;
}
</style>