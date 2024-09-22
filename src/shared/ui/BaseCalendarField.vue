<script setup lang="ts"></script>

<template>
  <v-text-field
    type="date"
    rounded="lg"
    variant="outlined"
    class="date-field"
    density="comfortable"
  />
</template>

<style scoped lang="scss">
.date-field {


  :deep(.v-field__field .v-field__input) {
    height: 48px;
    display: block;
  }
}
</style>
