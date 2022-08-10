<template>
  <div class="mt-3">
    <h3 class="text-center"><b>SignUp</b></h3>
    <div class="card bg-light">
      <form @submit.prevent="handleSignUp">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Confirm Password</label
          >
          <input
            type="password"
            v-model="confirmPassword"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3 form-check">
          Go back to <router-link to="/login">login</router-link>.
        </div>
        <button type="submit" class="btn btn-primary">Create Account</button>
      </form>
    </div>
  </div>

  <!-- <div>
        <input type="text" placeholder="email" v-model="email" />
        <input type="password" placeholder="password" v-model="password" />
        <input type="password" placeholder="confirm password" />
        <button @click="signup()">SignUp</button>
         <p>
            Go back to <router-link to="/login">login</router-link>.
        </p>
    </div> -->
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleSignUp() {
      if (this.password === this.confirmPassword) {
        createUserWithEmailAndPassword(getAuth(), this.email, this.password)
          .then(() => {
            this.$router.replace("/login");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert('password and confirm password did not match.')
      }
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
</style>
