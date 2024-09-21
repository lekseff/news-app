<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  total: number
  itemsPerPage: number
}

const props = defineProps<Props>()

const currentPage = defineModel<number>('page',{ default: 1 })

const totalPages = computed(() => {
  return Math.ceil(props.total / props.itemsPerPage)
})
</script>

<template>
  <v-pagination v-model="currentPage" :length="totalPages" total-visible="6" />
</template>

<style scoped></style>
