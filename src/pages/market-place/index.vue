<template>
  <div class="marketplace">
    <DeliveryCost />
    <FastService />
  </div>
</template>

<script setup lang="ts">
import { DeliveryCost } from 'features/delivery-cost';
import { FastService } from 'features/fast-service';

</script>

<style lang="scss" scoped>
.marketplace {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100vh;
}
</style>