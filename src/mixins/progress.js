export default {
  methods: {
    startProgress() {
      this.$Progress.start();
    },
    finishProgress() {
      this.$Progress.finish();
    },
  },
};
