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

      <!-- <SocialLogin/> -->
      <div style="display: flex">
        <div id="google_signin"></div>
        <div
          class="fb-login-button"
          style="width: 100%"
          data-size="large"
          data-button-type="continue_with"
          data-layout="default"
          data-auto-logout-link="true"
          data-use-continue-as="false"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
import { loginWithFirebase } from "../api/auth";
import Cookies from "js-cookie";
import { loginWithGoogle, loginWithFacebook } from "../api/auth";
// import { oauth } from "../mixins/oauth.js";

export default {
  name: "Login",
  // mixins: [oauth],
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
            Cookies.set("idToken", response.data.idToken, {
              expires: 1 / 1440,
            });
            Cookies.set("refreshToken", response.data.refreshToken, {
              expires: 365,
            });
            this.$store.commit("SET_AUTH");
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
    handleCredentialResponse(response) {
      // eslint-disable-next-line no-unused-vars
      const responsePayload = this.decodeJwtResponse(response.credential);
      loginWithGoogle(response.credential)
        .then((res) => {
          console.log("donnnnnne", res);
          Cookies.set("idToken", res.data.idToken, { expires: 1 / 1440 });
          Cookies.set("refreshToken", res.data.refreshToken, { expires: 365 });
          this.$store.commit("SET_AUTH");
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    decodeJwtResponse(token) {
      let base64Url = token.split(".")[1];
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    },
    getLoginWithFacebook(token) {
      loginWithFacebook(token)
        .then((res) => {
          Cookies.set("idToken", res.data.idToken, { expires: 1 / 1440 });
          Cookies.set("refreshToken", res.data.refreshToken, {
            expires: 365,
          });
          this.$store.commit("SET_AUTH");
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted: function () {
     window.google.accounts.id.initialize({
        client_id: "76230496021-jqvhsrae5tvdjnp9uu730489lup1cfpi.apps.googleusercontent.com",
        cancel_on_tap_outside: false,
        callback: this.handleCredentialResponse,
      });
       window.google.accounts.id.renderButton(
        document.getElementById("google_signin"),
        { theme: "outline", size: "large",text:"continue_with" } // customization attributes
      );
  
      // google.accounts.id.prompt();
       window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // try next provider if OneTap is not displayed or skipped
            console.log("not displayed")
        }
       });
  
      function loadFBsdk(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        console.log("loaded")
      }
  
      loadFBsdk(document, 'script', 'facebook-jssdk')
    // eslint-disable-next-line no-undef
     FB.init({
      appId: "1512950625807496",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v14.0",
    });
    //   console.log(this.$store);
    // eslint-disable-next-line no-undef
    FB.getLoginStatus((response) => {
      try {
        if (response?.authResponse?.accessToken) {
          this.getLoginWithFacebook(response?.authResponse?.accessToken);
        }
      } catch (error) {
        console.log(error);
      }
    });
    // eslint-disable-next-line no-undef
     FB.Event.subscribe("auth.login", (response) => {
      try {
        this.getLoginWithFacebook(response?.authResponse?.accessToken);
      } catch (error) {
        console.log(error);
      }
    });
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

#btn {
  background-color: #131a27;
  color: white;
}
</style>
