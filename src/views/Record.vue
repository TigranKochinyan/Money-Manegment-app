<template>
  <div>
    <div class="page-title">
      <h3>{{'new-record' | localize}}</h3>
    </div>
    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">{{'category-not-found' | localize}} 
      <router-link to="/categories">{{'add-new-category' | localize}}</router-link>
    </p>

    <form @submit.prevent="submitHandler" class="form" v-else>
      <div class="input-field">
        <select ref="select" v-model="categorySelect">
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
          >{{category.title}}</option>
        </select>
        <label>{{'choose-category' | localize}}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" v-model="type" name="type" type="radio" value="income" />
          <span>{{'income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" v-model="type" name="type" type="radio" value="outcome" />
          <span>{{'outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input 
          id="amount"
          v-model.number="amount" 
          type="number" 
          :class="{ invalid: (($v.amount.$dirty && !$v.amount.minValue) || ($v.amount.$dirty && !$v.amount.required))}"
        />
        <label for="amount">{{'history-page-historytable-amount' | localize}}</label>
        <span
          class="helper-text invalid"
          v-if="($v.amount.$dirty && !$v.amount.minValue)"
        >{{'minimal-value' | localize}} {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input 
          v-model="description" 
          id="description" 
          type="text"
          :class="{ invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">{{'description' | localize}}</label>
        <span 
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Ввидите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'create' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
export default {
  name: 'record',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    categotyperySelect: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),
  validations: {
    amount: { minValue: minValue(1), required },
    description: { required }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.categorySelect,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON(),
          });
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;
          debugger;//
          await this.$store.dispatch('updateInfo', {bill})
          
          this.$message('Запись успешно создана');
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } catch (error) {
          // console.log(error);
        }
      } else {
        this.$message(`Недостаточно средств на счёте (${this.amount - this.info.bill})`);
      } 
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
    if (this.categories.length) {
      this.categorySelect = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();

    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
  
}
</script>
