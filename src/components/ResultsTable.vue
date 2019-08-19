<template>
  <div class="results-table">
    <vue-progress-bar></vue-progress-bar>
    <table class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th class="th-sm">Title</th>
          <th class="th-sm">Year</th>
          <th class="th-sm">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr @click="goToMovie(movie.imdbID)" v-for="(movie, index) in results" :key="index">
          <!-- sometimes api returns duplicated imdbID so errors occur.
          that's why i used index as a key-->
          <td>{{movie.Title}}</td>
          <td>{{movie.Year}}</td>
          <td>{{movie.Type}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import progress from '@/mixins/progress';

export default {
  name: 'ResultsTable',
  mixins: [progress],
  computed: {
    results() {
      return this.$store.state.results;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'SET_LOADING_STATUS') {
        if (this.isLoading) {
          this.startProgress();
        } else this.finishProgress();
      }
    });
  },
  methods: {
    goToMovie(imdbID) {
      this.$router.push({
        name: 'movie',
        params: {
          id: imdbID,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.results-table {
  tr {
    height: 35px;
    cursor: pointer;

    &:hover {
      td:first-child {
        text-decoration: underline;
      }
    }

    td {
      width: 70%;

      &:nth-child(2) {
        width: 15%;
      }
      &:last-child {
        width: 15%;
      }
    }
  }
}
</style>
