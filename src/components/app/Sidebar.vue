<template>
  <ul class="sidenav app-sidenav" :class='{open: value}'>
    <router-link
      v-for='link in links'
      :key='link.url'
      tag='li'
      active-class='active'
      :to='link.url'
      :exact='link.exact'
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/loacalize.filter';

export default {
  props: ['value'],
  data: () => ({
    links: [
      {
        title: localizeFilter('home-page-score'),
        url: '/',
        exact: true,
      },
      {
        title: localizeFilter('history'),
        url: '/history',
      },
      {
        title: localizeFilter('planning'),
        url: '/planning',
      },
      {
        title: localizeFilter('new-record'),
        url: '/record',
      },
      {
        title: localizeFilter('categories'),
        url: '/categories',
      },
    ],
  }),
};
</script>
