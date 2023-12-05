<script setup lang="ts">
  import BaseLoading from 'shared/components/BaseLoading.vue';
import {RouterView} from 'vue-router';
</script>

<template>
  <BaseLoading />
  <RouterView />
</template>