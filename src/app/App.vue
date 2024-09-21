<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import type { Layouts } from '@/app/layouts/ELayouts'

const route = useRoute()

const layoutComponents = {
  default: DefaultLayout,
}

// Текущий шаблон
const layout = computed(() => {
  const currentLayout = route.meta.layout as Layouts
  return layoutComponents[currentLayout]
})
</script>

<template>
  <v-app>
    <component :is="layout" />
  </v-app>
</template>

<style scoped></style>
