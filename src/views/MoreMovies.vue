<template>
  <div>
    <div id="resultshow">
      <div v-if="this.gernesList">
        <ShowResults call-fun="searchGerneList"></ShowResults>
      </div>
       <div v-if="this.searchList">
        <ShowResults call-fun="searchMovieList"></ShowResults>
      </div>
       <div v-if="this.list">
        <ShowResults call-fun="listMovies"></ShowResults>
      </div>

    </div>
  </div>
</template>

<script>
import ShowResults from "@/components/ShowResults.vue";

export default {
  name: "moremovies",
  props: ["category"],
  components: {
    ShowResults
  },
  data: () => {
    return {
      movieList: [],
      gernesList: [],
      searchList: [],
      list: [],
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.$router.go(0);
  },
  mounted() {
    this.gernesList = this.$route.query.gerne;
    this.searchList = this.$route.query.search;
    this.list = this.$route.query.type;
  },
};
</script>

<style scoped>
#resultshow {
  margin: 20px 30px;
}
</style>