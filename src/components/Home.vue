<template>
  <div id="bgcolor">
    <!-- <h1 id="title">Latest Movies on MovieFlex</h1> -->
    <div class="grid-container-field">
      <input
        type="text"
        id="searchbar"
        v-on:keyup.enter="seatchMovie"
        v-model="searchMovieName"
        placeholder="Search movies..."
      />

      <select name="cars_id" @change="onChange($event)" class="category">
        <option value="null">Filtered By Category</option>
        <option value="action">Action</option>
        <option value="animation">animation</option>
        <option value="comedy">comedy</option>
        <option value="crime">crime</option>
        <option value="drama">drama</option>
        <option value="family">family</option>
        <option value="game_show">Game Show</option>
        <option value="history">history</option>
        <option value="horror">horror</option>
        <option value="music">music</option>
        <option value="mystery">mystery</option>
        <option value="romance">romance</option>
        <option value="sci_fi">sci_fi</option>
        <option value="thriller">thriller</option>
        <option value="war">war</option>
      </select>
    </div>

    <!-- <div v-if="searchMovieName">
      <section class="grid-container">
        <RouterLink
          v-for="movie in movieList"
          :key="movie.id"
          :to="'/moviedetails/' + movie.id"
        >
          <div class="card">
            <img :src="movie.image" alt="Avatar" id="image" />
            <div class="container">
              <h4>
                <b>{{ movie.title }}</b>
              </h4>
              <h5>
                <b>Year: {{ movie.year }}</b>
              </h5>
              <p>IMDB Rating: {{ movie.imDbRating }}</p>
            </div>
          </div>
        </RouterLink>
      </section>

      <div class="item error" v-if="searchMovieName && movieList.length === 0">
        <p>No results found!</p>
      </div>
    </div> -->

    <section class="grid-container">
      <RouterLink
        v-for="movie in movieList"
        :key="movie.id"
        :to="'/moviedetails/' + movie.id"
      >
        <div class="card">
          <img :src="movie.image" alt="Avatar" id="image" />
          <div class="container">
            <h4>
              <b>{{ movie.title }}</b>
            </h4>
            <h5>
              <b>Year: {{ movie.year }}</b>
            </h5>
            <p>IMDB Rating: {{ movie.imDbRating }}</p>
          </div>
        </div>
      </RouterLink>
    </section>
  </div>
</template>

<script>
import data from "../api/data.js";

export default {
  name: "home",
  data: () => {
    return {
      searchMovieName: null,
      filteredMovie: [],
      movieList: [],

      onChange(e) {
        const category = e.target.value;
        console.log(category);
        this.movieList = data;
        this.movieList = this.movieList.filter(
          (item) => item.genres === category
        );
        // this.$http
        //   .get(
        //     "https://imdb-api.com/API/AdvancedSearch/k_au2t6aps/?genres=" +
        //       category
        //   )
        //   .then((response) => {
        //     if (response.data.results) {
        //       this.movieList = response.data.results;
        //     }
        //     console.log(response.data.results);
        //   });
      },
    };
  },
  methods: {
    seatchMovie() {
      if (this.searchMovieName === " ") {
        this.movieList = data;
      } else {
        this.movieList = this.movieList.filter((item) =>
          item.title.toLowerCase().includes(this.searchMovieName.toLowerCase())
        );
      }

      // this.$http
      //   .get(
      //     "https://imdb-api.com/en/API/Search/k_au2t6aps/" +
      //       this.searchMovieName
      //   )
      //   .then((response) => {
      //     if (response.data.results) {
      //       this.movieList = response.data.results;
      //     }
      //     console.log(response.data.results);
      //   });
    },
  },
  mounted() {
    this.movieList = data;
    // this.$http
    //   .get("https://imdb-api.com/en/API/Top250Movies/k_au2t6aps")
    //   .then((response) => {
    //     if (response.data.items) {
    //       this.movieList = response.data.items;
    //     }
    //     console.log(response.data.items);
    //   });
  },
};
</script>

<style scoped>
#bgcolor {
  background-color: #d1d1d1;
  height: auto;
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

#image {
  padding-top: 10px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  transition: 0.3s;
  height: 350px;
  text-align: center;
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
  grid-template-columns: auto auto auto auto auto;
  padding: 10px;
  grid-column-gap: 50px;
  grid-row-gap: 10px;
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
  .grid-container {
    display: grid;
    grid-template-columns: auto auto;
    padding: 10px;
  }
  .grid-container-field {
    display: grid;
    grid-template-columns: auto;
    padding: 10px;
  }
}
</style>
