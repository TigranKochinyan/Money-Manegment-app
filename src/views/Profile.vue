<template>
  <div>
    <div class="page-title">
      <h3>{{ 'profileTitle' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submit_handler">
      <div class="input-field">
        <input 
          id="description"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="description">{{'name' | localize}}</label>
        <span 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'write-your-name'}}</span>
      </div>

      <div class="input-field margin-t">
        <select v-model="localeSelect" ref="select">
          <option
            v-for="loc of locales"
            :key="loc.type"
            :value="loc.title"
          >{{loc.title}}</option>
        </select>
        <label>{{'choose-language' | localize}}</label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{'refresh' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<style scoped>
.margin-t {
  margin-top: 2rem;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from "vuelidate/lib/validators";

export default {
  name: 'profile',
  data: () => ({
    select: null,
    name: '',
    localeSelect: '',
    locales: [
      {
        title: 'Русский',
        type: 'ru-RU'
      },
      {
        title: 'English',
        type: 'en-US'
      },
      {
        title:'Հայերեն',
        type: 'am-AM'
      }
    ]
    
  }),
  computed: {
    ...mapGetters(['info'])
  },
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.info.name;
    this.localeSelect = this.locales.find(elem => elem.type === this.info.locale).title;
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submit_handler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      // console.log((this.locales.find(elem => elem.title === this.localeSelect)).type);
      try {
        await this.updateInfo({
          name: this.name,
          locale: (this.locales.find(elem => elem.title === this.localeSelect)).type,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
