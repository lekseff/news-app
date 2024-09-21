<script setup lang="ts">
import BaseContainer from '@/shared/ui/BaseContainer.vue'
import logImg from '@/shared/assets/images/logo.webp'
</script>

<template>
  <v-app-bar>
    <template #title>
      <BaseContainer>
        <v-sheet class="d-flex align-center justify-space-between">
          <span class="text-h3">Новости</span>
          <!-- logo -->
          <RouterLink :to="{ name: 'newsList' }">
            <v-img :src="logImg" width="90" alt="Логотип" />
          </RouterLink>
        </v-sheet>
      </BaseContainer>
    </template>
  </v-app-bar>
</template>

<style scoped></style>
