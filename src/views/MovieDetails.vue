<template>
  <div class="movie-details">
    <vue-progress-bar></vue-progress-bar>
    <div v-if="!isLoading" class="container">
      <div class="row pt-5">
        <div class="col-lg-4 col-md-6 col-sm-7 col-xs-6">
          <img
            :src="movieDetails.Poster !== NOT_AVAILABLE ? movieDetails.Poster : defaultPoster"
            alt="Poster"
          />
        </div>
        <div class="col-lg-8 col-md-6 col-sm-5 col-xs-6">
          <h1>{{movieDetails.Title}}</h1>
          <p>
            <span class="font-weight-bold">Year:&nbsp;</span>
            {{movieDetails.Year}}
          </p>
          <p>
            <span class="font-weight-bold">Genre:&nbsp;</span>
            {{movieDetails.Genre}}
          </p>
          <p>
            <span class="font-weight-bold">Language:&nbsp;</span>
            {{movieDetails.Language}}
          </p>
          <p>
            <span class="font-weight-bold">Country:&nbsp;</span>
            {{movieDetails.Country}}
          </p>
          <p>
            <span class="font-weight-bold">Runtime:&nbsp;</span>
            {{movieDetails.Runtime}}
          </p>
          <p>
            <span class="font-weight-bold">Director:&nbsp;</span>
            {{movieDetails.Director}}
          </p>
          <p>
            <span class="font-weight-bold">Actors:&nbsp;</span>
            {{movieDetails.Actors}}
          </p>
          <p>
            <span class="font-weight-bold">Released:&nbsp;</span>
            {{movieDetails.Released}}
          </p>
          <p>
            <span class="font-weight-bold">Awards:&nbsp;</span>
            {{movieDetails.Awards}}
          </p>
          <p>
            <span class="font-weight-bold">imdbRating:&nbsp;</span>
            {{movieDetails.imdbRating}}
          </p>
          <p>
            <span class="font-weight-bold">imdbVotes:&nbsp;</span>
            {{movieDetails.imdbVotes}}
          </p>
          <p>
            <span class="font-weight-bold">Plot:&nbsp;</span>
            {{movieDetails.Plot}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moviesApi from '@/api/movies';
import defaultPoster from '@/assets/media/images/default_poster.jpg';
import progress from '@/mixins/progress';
import NOT_AVAILABLE from '@/config/constants';

export default {
  name: 'MovieDetail',
  mixins: [progress],
  data() {
    return {
      movieDetails: {},
      defaultPoster,
      isLoading: false,
      NOT_AVAILABLE,
    };
  },
  watch: {
    isLoading(status) {
      if (status) {
        this.startProgress();
      } else this.finishProgress();
    },
  },
  created() {
    const { id } = this.$route.params;
    this.getMovieDetails(id);
  },
  methods: {
    async getMovieDetails(id) {
      this.isLoading = true;
      this.movieDetails = await moviesApi.getMovieDetails(id);
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.movie-details {
  .row {
    p {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
