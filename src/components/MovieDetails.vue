<template>
  <div>
    <div v-for="(movie, index) in movie" :key="index">
      <div class="card">
        <!-- <img src="img_avatar.png" alt="Avatar" style="width: 100%" /> -->
       
        <div class="container">
          <h4>
            <b>{{ movie.img }}</b>
          </h4>
          <p>{{ movie.name }}</p>
           <p>{{ movie.category }}</p>
        </div>
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
      movieList: [
               { img: "0", name: "batman", category: "action" },
        { img: "1", name: "spiderman", category: "drama" },
        { img: "2", name: "batma", category: "thriller" },
        { img: "3", name: "spiderma", category: "action" },
        { img: "4", name: "batm", category: "drama" },
        { img: "5", name: "spiderm", category: "thriller" },
        { img: "6", name: "bat", category: "action" },
      ],
    };
  },
  methods: {
  },
  created() {
    this.movie = this.movieList.filter((movie) => {
      return movie.img === this.movieId;
    });
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
}

.container {
  padding: 2px 16px;
}
</style>
