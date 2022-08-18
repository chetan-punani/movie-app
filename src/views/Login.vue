<template>
  <div class="mt-3">
    <h3 class="text-center"><b>Login</b></h3>
    <div class="card bg-light">
      <form @submit.prevent="handleLogin" @reset="onReset">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <div class="row">
            <div class="col-11">
              <input
                type="email"
                v-model="form.email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
          </div>

          <br />
          <span v-if="error.email" class="error-message">{{
            error.email
          }}</span>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword" class="form-label">Password</label>
          <div class="row">
            <div class="col-11">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                class="form-control"
                id="exampleInputPassword"
              />
            </div>

            <div class="col-1" @click="toggleShow">
              <i
                class="fas"
                :class="{
                  'fa-eye-slash': showPassword,
                  'fa-eye': !showPassword,
                }"
              ></i>
            </div>
          </div>

          <br />
          <span v-if="error.password" class="error-message">{{
            error.password
          }}</span>

          <br />
          <span v-if="error.submit" class="error-message">{{
            error.submit
          }}</span>
        </div>
        <div class="mb-3 form-check">
          Don't have an account? You can
          <router-link to="/signup">create one</router-link>.
        </div>

        <button type="submit" class="btn btn-primary" id="btn">LogIn</button>
        <button type="reset" class="btn btn-success mx-3">Reset</button>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
import { loginWithFirebase } from "../api/auth";
import Cookies from "js-cookie";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: [],
      showPassword: false,
    };
  },
  watch: {
    "form.email": {
      handler(value) {
        this.validateEmail(value);
      },
      deep: true,
    },
    "form.password": {
      handler(value) {
        this.validatePassword(value);
      },
      deep: true,
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    validateEmail(value) {
      if (value === "") {
        this.error["email"] = "";
      } else {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          this.error["email"] = "";
        } else {
          this.error["email"] = "* Not valid email";
        }
      }
    },
    validatePassword(value) {
      if (value === "") {
        this.error["password"] = "";
      } else {
        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/.test(
            value
          )
        ) {
          this.error["password"] = "";
        } else {
          this.error["password"] =
            "* Password between 8 to 15 characters which contain only characters, numeric digits, One upper case, one lower case";
        }
      }
    },
    handleLogin() {
      if (this.error.email === "" && this.error.password === "") {
       loginWithFirebase(this.form.email, this.form.password)
        .then((response) => {
          Cookies.set("idToken", response.data.idToken, { expires: 1 / 1440 });
          Cookies.set("refreshToken", response.data.refreshToken, { expires: 365 });
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        alert("* Please Enter valid email and password then try again !!!");
      }
    },
    onReset() {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = "";
      });
    },
  },
};
</script>

<style scoped>
.card {
  width: 80%;
  margin: 30px auto;
  padding: 20px;
}

.error-message {
  color: red;
}

#btn{
  background-color: #131a27;
  color: white;
}
</style>
