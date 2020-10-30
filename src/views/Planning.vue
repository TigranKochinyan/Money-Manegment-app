<template>
  <div>
    <div class="page-title">
      <h3>{{'planning' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading"/>
    <p v-else-if="!categories.length" class="center">{{'category-not-found' | localize}} 
      <router-link to="/categories">{{'add-new-category' | localize}}</router-link> 
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency('RUB')}} из {{cat.limit | currency('RUB')}}
          <!-- izzzzz@ targmanel -->
        </p>
        <div class="progress" v-tooltip="{value: cat.tooltip}">
          <div 
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPrecent + '%'}"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';
export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

  this.categories = categories.map(cat => {
    const spend = records
      .filter(r => r.categoryId === cat.id)
      .filter(r => r.type === 'outcome')
      .reduce((total, record) => {
        return total += +record.amount;
      }, 0);
    const precent = 100 * spend / cat.limit;
    const progressPrecent = precent > 100 ? 100 : precent;
    const progressColor = precent < 60
      ? 'green'
      : precent < 100 
        ? 'yellow'
        : 'red';
    const tooltipValue = cat.limit - spend; 
    const tooltip = `${tooltipValue < 0 ? 'Превышене на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`;
    return {
      ...cat,
      progressPrecent,
      progressColor,
      spend,
      tooltip,
    }
  })
    this.loading = false;
  },
}
</script>