<template>
  <div>
    <div class="input-field">
      <div class="wrapper">
        <a class="btn" href="#">
          <span>NaMore</span>
        </a>
      </div>
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
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      users: [],
    };
  },
  methods: {
    submitLogin() {
      const formData = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("https://na-more.netlify.app/users/login", {
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          console.log("Successful login");
          console.log(response.data.email);
          localStorage.setItem("token", response.data.token);
          auth.user.authenticated = true;
          let user = this.users.users.find(
            (user) => user.email == response.data.email
          );
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
      .get("https://na-more.netlify.app/users/")
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

.btn {
  color: #00d1b2;
  text-decoration: none;
  border: 3px solid #00d1b2;
  border-radius: 18px;
  font-family: Helvetica;
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
  letter-spacing: 2px;
  z-index: 1;
  padding: 25px 60px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  transition: all 0.3s;
}

.btn:before {
  content: "";
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 140px;
  background-color: #3298dc;

  top: 70px;
  left: 50%;
  /*transform: translateX(-50%);*/

  animation: wave 5s infinite linear;
  transition: all 1s;
}
@keyframes wave {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}
.btn:hover {
  color: #d1a1ff;
  /*transition: all 0.3s;*/
}
.btn:hover:before {
  top: 25px;
  /*transition: all 1s;*/
}
</style>