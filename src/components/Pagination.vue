<template>
  <nav class="pagination">
    <button
      @click="turnPage(currentPage, -1)"
      :disabled="currentPage <= 1"
      class="btn">Previous</button
    >
    <span>{{currentPage}} of {{totalPages}}</span>
    <button
      @click="turnPage(currentPage, 1)"
      :disabled="isLastPage"
      class="btn">Next</button
    >
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  computed: {
    currentPage() {
      return Number(this.$route.query.page) || 1;
    },
    totalPages() {
      return this.$store.getters.totalPages;
    },
    isLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    turnPage(pageNumber, direction) {
      const page = Number(pageNumber) + direction;

      const query = {
        ...this.$route.query,
      };

      query.page = page;
      if (this.$route.query.s) {
        query.s = this.$route.query.s;
      }

      if (this.$route.query.y) {
        query.y = this.$route.query.y;
      }

      if (this.$route.query.page !== page) {
        this.$router.push({
          query,
        });
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
