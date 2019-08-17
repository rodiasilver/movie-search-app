<template>
  <div class="search-panel">
    <h1 class="text-center">Search movies</h1>
    <form @submit.prevent="onSubmit(title, year)" class="search-form">
      <input 
        v-model="title"
        id="title" class="form-control"
        type="text"
        placeholder="Title"
      />
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
  methods: {
    onSubmit(title, year) {
      const criteria = {
        title,
        year,
      };
      if (title) {
        this.$store.dispatch('resetPages');
        this.$store.dispatch('getMovies', criteria);
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
