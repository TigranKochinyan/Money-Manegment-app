<template>
  <div>
    <Loader v-if="this.loading" />
    <div v-else class="app-main-layout">
      <Navbar @burger_click="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" :key="locale" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <Navbar @burger_click="isOpen = !isOpen" />

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons" v-tooltip="{value: localizeFilter('add-record'), pos: 'top'}" >add</i>
        </router-link>
      </div>
    </div>
  </div> 
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";
import Loader from "@/components/app/Loader.vue";
import messages from '@/utils/messages';
import localizeFilter from '@/filters/loacalize.filter';


export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || localizeFilter('something-went-wrong'));
      this.$router.push('/');//maybe its true
    },
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetch_info");
    }
    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar,
    Loader,
  },
  methods: {
    localizeFilter
  },
};
</script>
