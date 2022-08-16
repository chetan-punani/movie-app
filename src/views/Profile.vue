<template>
  <div class="mt-3">
    <h3 class="text-center"><b>User Profile</b></h3>
    <div class="card bg-light">
      <form @submit.prevent="handleUpdate">
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
                disabled
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
                :disabled="disable"
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
       
        <button type="submit" class="btn btn-primary" id="btn">Update</button>
         <button type="button" class="btn btn-success mx-3" @click="handleEditData">
          Edit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
import { getDatabase, ref, child, get, update } from "firebase/database";
import { getAuth } from "firebase/auth";

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
      disable: true,
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
    handleUpdate() {
      if (this.error.email === "" && this.error.password === "") {
        const user = getAuth().currentUser;
        if (user) {
          const data = {
            uid: user.uid,
            email: this.form.email,
            password: this.form.password,
          };

          const db = getDatabase();
          const updates = {};
          updates["/users/" + user.uid] = data;
          update(ref(db), updates);

          alert("* Update Successfully !!!");
        } else {
          // No user is signed in.
        }
      } else {
        alert("* Please Enter valid email and password then try again !!!");
      }
    },
    handleEditData() {
      this.disable = false;
    },
    getUserData() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              this.form.email = snapshot.val().email;
              this.form.password = snapshot.val().password;
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
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

.error-message {
  color: red;
}

#btn{
  background-color: #131a27;
  color: white;
}
</style>
