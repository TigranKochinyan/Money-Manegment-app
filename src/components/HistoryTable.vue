<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ 'history-page-historytable-amount' | localize }}</th>
        <th>{{ 'history-page-historytable-date' | localize }}</th>
        <th>{{ 'history-page-historytable-category' | localize }}</th>
        <th>{{ 'history-page-historytable-type' | localize }}</th>
        <th>{{ 'history-page-historytable-open' | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">	
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount | currency }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span 
            class="white-text badge"
            :class="[record.typeClass]"
          >{{record.typeText}}</span>
        </td>
        <td>
          <button 
            class="btn-small btn"
            @click="$router.push(`/detail/${record.id}`)"
            v-tooltip="{value: localizeFilter('watch-detail-record')}"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '@/filters/loacalize.filter';

export default {
  props: {
    records: {
      required: true,
      type: Array,
    }
  },
  methods: {
    localizeFilter,
  }
}
</script>