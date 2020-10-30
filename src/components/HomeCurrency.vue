<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'home-page-homecurrency-exchange-rates' | localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{'home-page-homecurrency-currency' | localize}}</th>
              <th>{{'home-page-homecurrency-rates' | localize}}</th>
              <th>{{'home-page-homecurrency-date' | localize}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur of currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{get_currency_procent(cur)}}</td>
              <td>{{date | date('date')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bill-card {
  height: auto;
}
</style>
<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB','USD','EUR'],
  }),
  computed: {
    base() {
      return this.rates.AMD.Nominal / this.rates.AMD.Value;
    }
  },
  methods: {
    get_currency_procent(currency) {
      return (this.base * this.rates[currency].Value).toFixed(2); 
    }
  }
}
</script>