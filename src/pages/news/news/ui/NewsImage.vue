<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import ImageLoader from '@/shared/ui/ImageLoader.vue'
import NewsImageModal from '@/pages/news/news/ui/NewsImageModal.vue'
import { type INews, type INewsMedia } from '@/entities/news'

interface Props {
  news: INews
}

const props = defineProps<Props>()

const { xs, smAndUp, mdAndUp } = useDisplay()

const dialog = ref(false)
const carousel = ref<number>(0)

// Скрывать управление слайдером
const hideSliderControl = computed((): boolean => {
  return props.news.media.length === 1
})

// Изображения для отображения на странице
const images = computed((): INewsMedia[] => {
  return filterImages(props.news.media)
})

/**
 * Фильтрует список медиа по изображениям
 * @param media
 */
function filterImages(media: INewsMedia[]): INewsMedia[] {
  return media.filter((m) => m.type.startsWith('image'))
}

function onOpenModal(index: number) {
  carousel.value = index
  dialog.value = true
}
</script>

<template>
  <v-card
    v-if="news.media.length"
    elevation="0"
    :rounded="false"
    :max-width="mdAndUp ? 480 : '100%'"
    class="float-md-left w-100 mb-4 mr-md-6"
  >
    <v-carousel
      interval="6000"
      hide-delimiters
      :height="xs ? 240 : 300"
      :cycle="!hideSliderControl"
      :show-arrows="hideSliderControl ? false : 'hover'"
    >
      <v-carousel-item v-for="(img, idx) in images" :key="img.url">
        <v-img :src="img.url" :alt="news.anons" class="cursor-pointer" @click="onOpenModal(idx)">
          <template #placeholder>
            <ImageLoader />
          </template>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-card>

  <!-- image modal -->
  <NewsImageModal
    v-if="smAndUp && news"
    v-model="dialog"
    :images="images"
    :anons="news.anons"
    :active-index="carousel"
    :hide-slider-control="hideSliderControl"
  />
</template>

<style scoped lang="scss"></style>
