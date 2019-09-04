<template>
  <div class="home">
    <div class="container">
      <SearchPanel />
      <ResultsTable v-if="results !== undefined && results.length" class="results-table" />
      <Pagination v-if="totalResults > PAGES_PER_REQUEST" />
    </div>
  </div>
</template>

<script>
import SearchPanel from '@/components/SearchPanel.vue';
import ResultsTable from '@/components/ResultsTable.vue';
import Pagination from '@/components/Pagination.vue';
import { PAGES_PER_REQUEST } from '@/config/constants';


export default {
  name: 'Home',
  components: {
    SearchPanel,
    ResultsTable,
    Pagination,
  },
  data() {
    return {
      PAGES_PER_REQUEST,
    };
  },
  computed: {
    results() {
      return this.$store.state.results;
    },
    totalResults() {
      return this.$store.state.totalResults;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .results-table {
    margin-top: 20px;
  }
}
</style>
