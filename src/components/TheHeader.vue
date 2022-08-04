<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand text-white"
          ><h4>MovieFlex</h4></RouterLink
        >

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon white"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link text-white" aria-current="page"
                >Home</RouterLink
              >
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-white"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Gernes
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li v-for="(list, index) in gernes" :key="index" @click="gerneMovie(list.value)">
                  <!-- <RouterLink
                    :to="'/moremovies' + list.value"
                    class="dropdown-item"
                    >{{ list.name }}</RouterLink
                  > -->
                  {{list.name}}
                </li>
                <!-- <li><hr class="dropdown-divider" /></li> -->
              </ul>
            </li>
          </ul>
          <div class="d-flex" >
            <input
              class="form-control me-2"
              type="text"
              v-model="searchMovieName"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-white text-white" @click="searchMovie">Search</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "theheader",
  data() {
    return {
      searchMovieName: "",
      gernes: [
        {
          name: "Action",
          value: "action",
        },
        {
          name: "Animation",
          value: "animation",
        },
         {
          name: "Comedy",
          value: "comedy",
        },
        {
          name: "Crime",
          value: "crime",
        },
         {
          name: "Drama",
          value: "drama",
        },
        {
          name: "Family",
          value: "family",
        },
         {
          name: "Game Show",
          value: "gameshow",
        },
        {
          name: "History",
          value: "history",
        },
         {
          name: "Horror",
          value: "Horror",
        },
        {
          name: "Mystery",
          value: "mystery",
        },
         {
          name: "Romance",
          value: "romance",
        },
        {
          name: "Sci-Fi",
          value: "scifi",
        },
         {
          name: "Thriller",
          value: "thriller",
        },
        {
          name: "War",
          value: "war",
        },
      ],
    };
  },
  methods: {
    searchMovie() {
      this.$router.push({ path: "/moremovies" , query: { search: this.searchMovieName } });
      this.searchMovieName= "";
    },
    gerneMovie(value) {
      this.$router.push({ path: "/moremovies" , query: { gerne: value } });
    }
  },
   beforeRouteUpdate(to, from, next) {
    this.searchMovie();
    next();
  },
};
</script>

<style scoped>
* {
  font-family: "Comfortaa", cursive;
}

.navbar {
  background-color: #131a27;
}

.navbar-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}
.navbar-toggler {
  border-color: rgb(255,255,255);
}
</style>
