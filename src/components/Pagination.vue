<template>
  <nav class="pagination">
    <button
      @click="turnPage(currentPage, 'previous')"
      :disabled="currentPage <= 1"
      class="btn"
    >Previous</button>
    <span>{{currentPage}} of {{totalPages}}</span>
    <button
      @click="turnPage(currentPage, 'next')"
      :disabled="!hasNextPage"
      class="btn"
    >Next</button>
  </nav>
</template>

<script>
const PREVIOUS = 'previous';
const NEXT = 'next';

export default {
  name: 'Pagination',
  computed: {
    currentPage() {
      return this.$store.state.currentPage;
    },
    totalPages() {
      return this.$store.getters.totalPages;
    },
    hasNextPage() {
      return this.$store.getters.hasNextPage;
    },
  },
  methods: {
    turnPage(pageNumber, direction) {
      switch (direction) {
        case PREVIOUS:
          this.$store.dispatch('turnPage', (pageNumber -= 1));
          break;
        case NEXT:
          this.$store.dispatch('turnPage', (pageNumber += 1));
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  @include flex-space-between;
}
</style>
