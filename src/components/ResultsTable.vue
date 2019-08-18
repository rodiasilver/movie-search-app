<template>
  <div class="results-table">
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
export default {
  name: 'ResultsTable',
  computed: {
    results() {
      return this.$store.state.results;
    },
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
  }
}
</style>
