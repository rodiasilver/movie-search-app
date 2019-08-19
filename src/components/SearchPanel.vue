<template>
  <div class="search-panel">
    <vue-progress-bar></vue-progress-bar>
    <h1 class="text-center">Search movies</h1>
    <form @submit.prevent="onSubmit(title, year)" class="search-form">
      <input v-model="title" id="title" class="form-control" type="text" placeholder="Title" />
      <input
        v-model.number="year"
        id="year"
        class="form-control"
        type="number"
        min="1888"
        :max="`${new Date().getFullYear() + 5}`"
        placeholder="Year(optional)"
      />
      <button class="btn btn-primary" type="submit">Search</button>
    </form>
    <p v-if="hasNoMovies" class="no-movie-msg text-center">
      <span>"No results found for {{notFoundTitle}}"</span>
      <span v-if="notFoundYear">&nbsp;in {{notFoundYear}}</span>
    </p>
  </div>
</template>

<script>
import progress from '@/mixins/progress';

export default {
  name: 'SearchPanel',
  mixins: [progress],
  data() {
    return {
      title: null,
      year: null,
      notFoundTitle: null,
      notFoundYear: null,
    };
  },
  computed: {
    hasNoMovies() {
      return this.$store.getters.hasNoMovies;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
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
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'SET_LOADING_STATUS') {
        if (this.isLoading) {
          this.startProgress();
        } else this.finishProgress();
      }
    });
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
      setTimeout(() => {
        if (this.hasNoMovies) {
          this.setNotFoundMessage(this.title, this.year);
        } else {
          this.notFoundTitle = '';
          this.notFoundYear = '';
        }
      }, 500);
    },
    setNotFoundMessage(title, year) {
      this.notFoundTitle = title;
      this.notFoundYear = year;
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

    .btn {
      width: 20%;
      align-self: flex-end;
    }
  }

  .no-movie-msg {
    color: #202020;
    font-size: 1.5rem;

    span {
      color: #333;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}
</style>
