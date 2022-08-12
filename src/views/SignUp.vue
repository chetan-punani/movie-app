<template>
  <div class="mt-3">
    <h3 class="text-center"><b>SignUp</b></h3>
    <div class="card bg-light">
      <form @submit.prevent="handleSignUp"  @reset="onReset">
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
        </div>

        <div class="mb-3">
          <label for="confirmPassword" class="form-label"
            >Confirm Password</label
          >
          <div class="row">
            <div class="col-11">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="form.confirmPassword"
                class="form-control"
                id="confirmPassword"
              />
            </div>

            <div class="col-1" @click="toggleShowConfirmPassword">
              <i
                class="fas"
                :class="{
                  'fa-eye-slash': showConfirmPassword,
                  'fa-eye': !showConfirmPassword,
                }"
              ></i>
            </div>
          </div>

          <br />
          <span v-if="error.confirmPassword" class="error-message">{{
            error.confirmPassword
          }}</span>
        </div>

        <div class="mb-3 form-check">
          Go back to <router-link to="/login">login</router-link>.
        </div>
        <button type="submit" class="btn btn-primary">Create Account</button>
        <button type="reset" class="btn btn-success mx-3">Reset</button>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "SignUp",
  data() {
    return {
    form: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: [],
      showPassword: false,
      showConfirmPassword: false,
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
    "form.confirmPassword": {
      handler(value) {
        this.validateConfirmPassword(value);
      },
      deep: true,
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
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
    validateConfirmPassword(value) {
      if (value === "") {
        this.error["confirmPassword"] = "";
      } else {
        if (value === this.form.password) {
          if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/.test(
              value
            )
          ) {
            this.error["confirmPassword"] = "";
          } else {
            this.error["confirmPassword"] =
              "* Password between 8 to 15 characters which contain only characters, numeric digits, One upper case, one lower case";
          }
        } else {
          this.error["confirmPassword"] =
            "* Password & Confirm Password should't match";
        }
      }
    },
    handleSignUp() {
      if (this.error.email === "" && this.error.password === "") {
        if (this.password === this.confirmPassword) {
          createUserWithEmailAndPassword(getAuth(), this.form.email, this.form.password)
            .then(() => {
              this.$router.replace("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("* password and confirm password did not match.");
        }
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
</style>
