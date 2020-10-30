<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ 'home-page-homebill-account-in-currency' | localize }}</span>
        <p class="currency-line">
          <span>{{this.$store.getters.info.bill}} &#1423;</span>
        </p>
        <p :key="cur" v-for="cur of currencies" class="currency-line">
          <span>{{get_currency(cur) | currency(cur)}} </span>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .bill-card {
    height: 360px;
  }
</style>
<script>
export default {
  props: ['rates'],
  data: () => ({
    defaultCurr : 'AMD',
    currencies: ['RUB','USD','EUR']
  }),
  computed: {
    base() {
      return this.rates.AMD.Value / this.rates.AMD.Nominal;
    }
  },
  methods: {
    get_currency(currency) {
      return Math.floor(this.base * this.$store.getters.info.bill / this.rates[currency].Value); 
    }
  }
}
</script>