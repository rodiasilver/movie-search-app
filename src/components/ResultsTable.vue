<template>
  <div class="results-table">
    <table class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th @click="searchBy('Title')" class="th th-sm">
            <span>Title</span>
            <img
              class="arrow"
              :class="columns.Title.order === 'asc' ? 'asc' : 'desc'"
              :src="arrow"
              alt="arrow"
            />
          </th>
          <th @click="searchBy('Year')" class="th th-sm">
            <span>Year</span>
            <img
              class="arrow"
              :class="columns.Year.order === 'asc' ? 'asc' : 'desc'"
              :src="arrow"
              alt="arrow"
            />
          </th>
          <th @click="searchBy('Type')" class="th th-sm">
            <span>Type</span>
            <img
              class="arrow"
              :class="columns.Type.order === 'asc' ? 'asc' : 'desc'"
              :src="arrow"
              alt="arrow"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr @click="goToMovie(movie.imdbID)" v-for="(movie, index) in sortedResults" :key="index">
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
import arrow from '@/assets/media/images/arrow.png';

const TITLE = 'Title';
const YEAR = 'Year';
const TYPE = 'Type';
const ASC = 'asc';
const DESC = 'desc';

export default {
  name: 'ResultsTable',
  data() {
    return {
      columns: {
        Title: {
          order: ASC,
        },
        Year: {
          order: ASC,
        },
        Type: {
          order: ASC,
        },
      },
      criteria: null,
      arrow,
    };
  },
  computed: {
    results() {
      return this.$store.state.results;
    },
    sortedResults() {
      let order = ASC;
      if (this.criteria) {
        // eslint-disable-next-line prefer-destructuring
        order = this.columns[this.criteria].order;
      }
      return this.lodash.orderBy(this.results, this.criteria, order);
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
    searchBy(criteria) {
      switch (criteria) {
        case TITLE:
          this.criteria = TITLE;
          this.columns.Title.order = this.setOrder(TITLE);
          break;
        case YEAR:
          this.criteria = YEAR;
          this.columns.Year.order = this.setOrder(YEAR);
          break;
        case TYPE:
          this.criteria = TYPE;
          this.columns.Type.order = this.setOrder(TYPE);
          break;
        default:
          this.criteria = TITLE;
          this.columns.Title.order = ASC;
          break;
      }
    },
    setOrder(criteria) {
      this.resetOrders(criteria);
      return this.columns[criteria].order === ASC ? DESC : ASC;
    },
    resetOrders(criteria) {
      // eslint-disable-next-line no-restricted-syntax
      for (const el in this.columns) {
        if (el !== criteria) {
          this.columns[el].order = ASC;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.results-table {
  thead tr {
    height: 35px;

    th {
      @include flex-space-between;

      .arrow {
        width: 15px;
        height: 11px;

        &.asc {
          transform: rotate(180deg);
        }
      }
    }
  }
  tr {
    display: flex;
    height: 35px;
    cursor: pointer;

    &:hover {
      td:first-child {
        text-decoration: underline;
      }
    }

    td,
    th {
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
