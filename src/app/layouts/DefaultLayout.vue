<script setup lang="ts">
import { TheHeader } from '@/widgets/header'
import BaseContainer from '@/shared/ui/BaseContainer.vue'
</script>

<template>
  <v-main>
    <TheHeader />
    <BaseContainer>
      <RouterView />
    </BaseContainer>
  </v-main>
</template>

<style scoped></style>
