<template>
  <div class="movie-details">
    <div class="container">
      <h1>MovieDetails</h1>
    </div>
  </div>
</template>

<script>
import moviesApi from '@/api/movies';

export default {
  name: 'MovieDetail',
  data() {
    return {
      movieDetails: {},
    };
  },
  methods: {
    async getMovieDetails(id) {
      this.movieDetails = await moviesApi.getMovieDetails(id);
      console.log(this.movieDetails);
    },
  },
  created() {
    const { id } = this.$route.params;
    this.getMovieDetails(id);
  },
};
</script>

<style lang="scss" scoped>
</style>
