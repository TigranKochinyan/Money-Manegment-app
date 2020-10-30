<template>
  <div>
    <div class="page-title">
      <h3>{{'categories' | localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit 
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center">{{'category-not-found' | localize}}</p>
      </div>
      
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate' 
import CategoryEdit from '@/components/CategoryEdit' 
import Loader from '@/components/app/Loader';

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      // console.log(this.categories);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex( cat => cat.id === category.id );
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    }
  },
  components : { CategoryCreate, CategoryEdit, Loader },
}
</script>
