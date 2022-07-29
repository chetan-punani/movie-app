<template>
  <div>
    <div class="card">
      <div class="container">
        <img :src="movieList.image" alt="Avatar" style="width: 100%" />
      </div>
      <div class="card-container">
         <h1>{{ movieList.fullTitle }}</h1>
        <p>Genres: {{ movieList.genres }}</p>
        <p>Release Date: {{ movieList.releaseDate }}</p>
        <p>Time: {{ movieList.runtimeStr }}</p>
        <p>Imdb Ratings: {{ movieList.imDbRating }}</p>
        <p>Imdb Votes: {{ movieList.imDbRatingVotes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "moviedetails",
  props: ["movieId"],
  data: () => {
    return {
      movie: null,
      movieList: [],
    };
  },
  methods: {},
  mounted() {
    this.movieList = [];
    this.$http
      .get("https://imdb-api.com/en/API/Title/k_au2t6aps/" + this.movieId)
      .then((response) => {
        if (response.data) {
          this.movieList = response.data;
        }
        console.log(response.data);
      });
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial;
}

.container {
  position: relative;
  margin: 2% auto;
}

.container img {
  vertical-align: middle;
}

.container .content {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0); 
  background: rgba(0, 0, 0, 0.5); 
  color: #f1f1f1;
  width: 100%;
  height: 20%;
  padding: 0.5%;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(5, 5, 5, 1);
  transition: 0.3s;
  margin-left: 10%;
  width: 80%;
}

.card:hover {
  box-shadow: 0 16px 32px 0 rgba(0,0,0,0.2);
}

.card-container {
  padding: 2px 16px;
}
</style>
