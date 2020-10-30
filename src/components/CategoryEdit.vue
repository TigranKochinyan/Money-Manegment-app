<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'edit' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option 
              :key="category.id"
              v-for="category of categories"
              :value="category.id"
            >{{category.title}}</option>
          </select>
          <label>{{'choose-category' | localize}}</label>
        </div>

        <div class="input-field">
          <input 
            id="name" 
            type="text"
            v-model="title"
            :class="{invalid : $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">{{'title' | localize}}</label>
          <span
            v-if="($v.title.$dirty && !$v.title.required)"
            class="helper-text invalid"
          >
            {{'write-catgory-title' | localize}}
          </span>
        </div>

        <div class="input-field">
          <input 
            id="limit" 
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">{{'limit' | localize}}</label>
          <span 
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
            
          >
            {{'min-value' | localize}} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'refresh' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null,
  }),
  props: {
    categories: {
      type: Array,
      required: true,
    }
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    current(currentId) {
      console.log(currentId);
      const { title, limit } = this.categories.find(c => c.id === currentId)
      this.title = title;
      this.limit = limit;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категоря успешно обнавлена')
        this.$emit('updated', categoryData);
      } catch (error) {}
    }
  },
  created() {
    const {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title,
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>