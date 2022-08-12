<template>
  <div class="mt-3">
    <h3 class="text-center"><b>User Profile</b></h3>
    <div class="card bg-light">
      <form>
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
      
        <div v-if="errorMessage">
          <p>{{ errorMessage }}</p>
        </div>

        <!-- <button type="submit" class="btn btn-primary">LogIn</button> -->
      </form>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
    };
  },
  methods: {
    handleLogin() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(() => {
          this.$router.replace("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "Invalid Email";
              break;
            case "auth/user-not-found":
              this.errorMessage = "No account with that email was found";
              break;
            case "auth/wrong-password":
              this.errorMessage = "Incorrect Password";
              break;
            default:
              this.errorMessage = "Invalid Email or Password";
              break;
          }
        });
    },
    getUserData() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        this.email = user.email;
      } else {
        // No user is signed in.
      }
    },
  },
  mounted() {
    this.getUserData();
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
