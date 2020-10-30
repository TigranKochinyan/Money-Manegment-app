<template>
  <div>
    <div class="page-title">
      <h3>{{ 'home-page-score' | localize }}</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons" @click.prevent="refresh">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div v-else class="row">
      <HomeBill
        :rates="currency"
      />
      <HomeCurrency
        :rates="currency"
        :date="dateCurrency"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

// @ is an alias to /src
export default {
  name: 'Home',
  data: () => ({
    loading: true,
    currency: null,
    dateCurrency: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetch_currency');
    this.dateCurrency = this.currency.Date;
    this.currency = this.currency.Valute;
    
    // console.log(this.currency);
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetch_currency');
      this.dateCurrency = this.currency.Date;
      this.currency = this.currency.Valute;
      this.loading = false;
    },
  },
  components: { HomeBill, HomeCurrency},
};
</script>
