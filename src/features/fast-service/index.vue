<template>
    <div class="fast_service">
        <img v-if="!geDelivery.length" style="width: 200px; height: 200px" src="assets/images/machine.png" alt="">
        <div v-else>
            <div v-for="item in geDelivery" :key="item.type" class="fast_service__box">
                <div class="fast_service__type">{{ item.type }}</div>
                <div class="fast_service__price">${{ item.price }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseIcon from 'shared/components/BaseIcon.vue';
import MachineIcon from 'app/assets/icons/machine.svg?raw'
import { store } from 'app/providers';
import type { IDeliveryState } from 'app/providers/store/marketplace';
import { computed } from 'vue';

const geDelivery = computed((): IDeliveryState[] => {
    return store.getters.getDelivery
})
</script>

<style lang="scss" scoped>
.fast_service {
    background: #F7F7F7;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__box {
    margin-left: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        background: #fff;
        border-radius: 6px;
    }
    &_type {

    }
}
</style>