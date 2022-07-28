<template>
  <div id="bgcolor">
    <!-- <h1 id="title">Latest Movies on MovieFlex</h1> -->
    <div class="grid-container-field">
      <input
        type="text"
        id="searchbar"
        v-model="searchMovieName"
        placeholder="Search movies..."
      />

      <select name="cars_id" @change="onChange($event)" class="category">
        <option value="null">Filtered By Category</option>
        <option value="action">Action</option>
        <option value="drama">Drama</option>
        <option value="thriller">Thriller</option>
      </select>
    </div>

    <div v-if="searchMovieName">
      <section class="grid-container">
        <RouterLink
          v-for="(movie, index) in searchList"
          :key="index"
          :to="'/moviedetails/' + index"
        >
          <div class="card">
            <div class="container">
              <h4>
                <b>{{ movie.img }}</b>
              </h4>
              <h4>
                <b>{{ movie.name }}</b>
              </h4>
              <p>Architect & Engineer</p>
            </div>
          </div>
        </RouterLink>
      </section>

      <div class="item error" v-if="searchMovieName && searchList.length === 0">
        <p>No results found!</p>
      </div>
    </div>

    <section class="grid-container" v-else>
      <RouterLink
        v-for="(movie, index) in movieRender()"
        :key="index"
        :to="'/moviedetails/' + index"
      >
        <div class="card">
          <!-- <img :src="movie.img" alt="Avatar" style="width: 100%" /> -->

          <div class="container">
            <h4>
              <b>{{ movie.img }}</b>
            </h4>
            <h4>
              <b>{{ movie.name }}</b>
            </h4>
            <p>{{ movie.category }}</p>
          </div>
        </div>
      </RouterLink>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => {
    return {
      searchMovieName: null,
      filteredMovie: [],
      movieList: [
        { img: "0", name: "batman", category: "action" },
        { img: "1", name: "spiderman", category: "drama" },
        { img: "2", name: "batma", category: "thriller" },
        { img: "3", name: "spiderma", category: "action" },
        { img: "4", name: "batm", category: "drama" },
        { img: "5", name: "spiderm", category: "thriller" },
        { img: "6", name: "bat", category: "action" },
      ],

      onChange(e) {
        const category = e.target.value;

        if (category !== "null") {
          this.movieList = this.movieList.filter((item) =>
            item.category.includes(category)
          );
        } else {
          this.movieList = [
            { img: "0", name: "batman", category: "action" },
            { img: "1", name: "spiderman", category: "drama" },
            { img: "2", name: "batma", category: "thriller" },
            { img: "3", name: "spiderma", category: "action" },
            { img: "4", name: "batm", category: "drama" },
            { img: "5", name: "spiderm", category: "thriller" },
            { img: "6", name: "bat", category: "action" },
          ];
        }
        this.movieRender();
      },
    };
  },
  computed: {
    searchList() {
      return this.movieList.filter((item) =>
        item.name.toLowerCase().includes(this.searchMovieName.toLowerCase())
      );
    },
  },
  methods: {
    movieRender() {
      return this.movieList;
    },

  },
};
</script>

<style scoped>
#bgcolor {
  background-color: #d1d1d1;
  height: 100vh;
}

#title {
  margin-top: 0;
  color: #454571;
  text-align: center;
}

.a :focus,
:hover,
:visited,
:link,
:active {
  text-decoration: none;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  transition: 0.3s;
  height: 150px;
  margin: 5%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  background-color: #454571;
  color: #fff;
}

.container {
  padding: 2px 16px;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(229, 229, 229, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}

input {
  display: block;
  width: auto;
  max-width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("@/assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.error {
  background-color: tomato;
}

.category {
  display: block;
  width: auto;
  max-width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.grid-container-field {
  display: grid;
  grid-template-columns: auto auto;
  padding: 10px;
}

@media (max-width: 675px) {
  .grid-container-field {
    display: grid;
    grid-template-columns: auto;
    padding: 10px;
  }
}
</style>
