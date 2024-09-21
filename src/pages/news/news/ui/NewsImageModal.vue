<script setup lang="ts">
import ButtonCloseModal from '@/pages/news/news/ui/ButtonCloseModal.vue'
import type { INewsMedia } from '@/entities/news'

interface Props {
  activeIndex: number
  hideSliderControl: boolean
  images: INewsMedia[]
  anons: string
}

defineProps<Props>()

const dialog = defineModel<boolean>({ default: false })

</script>

<template>
  <v-dialog v-model="dialog" height="80%" max-width="90%">
    <!-- close button -->
    <ButtonCloseModal class="position-absolute close_button" @click="dialog = false" />

    <v-carousel
      :model-value="activeIndex"
      hide-delimiters
      :show-arrows="hideSliderControl ? false : 'hover'"
      class="h-100"
    >
      <v-carousel-item v-for="img in images" :key="img.url" :src="img.url" :alt="anons" />
    </v-carousel>
  </v-dialog>
</template>

<style scoped lang="scss">
.close_button {
  top: 0;
  right: 20px;
  opacity: 0.8;
  cursor: pointer;
  z-index: 1;
  transition: all 110ms ease-in;

  &:hover {
    transform: scale(1.2);
    transition: all 110ms ease-in;
  }
}
</style>
