<template>
  <div class="search-panel">
    <h1 class="text-center">Search movies</h1>
    <form @submit.prevent="onSubmit(title, year)" class="search-form">
      <input v-model="title" id="title" class="form-control" type="text" placeholder="Title" />
      <input
        v-model.number="year"
        id="year"
        class="form-control"
        type="number"
        placeholder="Year(optional)"
      />
      <button class="btn btn-primary" type="submit">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchPanel',
  data() {
    return {
      title: null,
      year: null,
    };
  },
  watch: {
    '$route.query': 'runSearch',
  },
  created() {
    if (this.$route.query.s) {
      this.runSearch();
      this.title = this.$route.query.s;
      this.year = this.$route.query.y;
    }
  },

  methods: {
    runSearch() {
      const criteria = {
        title: this.$route.query.s,
        year: this.$route.query.y,
        page: this.$route.query.page,
      };

      this.$store.dispatch('getMovies', criteria);
    },
    onSubmit(title, year) {
      const query = {};

      if (title) {
        query.s = title;
      }

      if (year) {
        query.y = year;
      }

      if (this.$route.query.y !== query.y || this.$route.query.s !== query.s) {
        this.$router.push({
          query,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.search-panel {
  .search-form {
    @include flex-column;

    .form-control {
      margin-bottom: 1%;
    }
  }

  .btn {
    width: 20%;
    align-self: flex-end;
  }
}
</style>