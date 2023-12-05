<template>
    <div class="delivery_cost">
        <div class="delivery_cost__header">
            <BaseIcon :src="FastServiceIcon" />
            <div class="delivery_cost__header_title">FastService</div> 
        </div>
        <div class="delivery_cost__body">
            <div class="delivery_cost__body_title">Delivery cost</div>
            <div class="delivery_cost__body_text">Enter name of the city to count delivery cost</div>
            <div class="delivery_cost__body_search">
                {{ error }}
                <BaseInputField v-model="search" :onerror="error">
                    <template #icon-right>
                        <BaseButton v-if="geDelivery.length === 0" style="height: 48px;" class="btn" size="lg" @click="submitForm">
                            ENTER
                        </BaseButton>
                        <div v-else style="margin-right: 30px; cursor: pointer;" @click="store.commit('setDelivery', []); search = ''">x</div>
                    </template>
                </BaseInputField>
            </div>
            <div class="delivery_cost__body_cities">
                <div class="delivery_cost__body_cities_header">Most popular cities</div>
                <div class="delivery_cost__body_cities_box">
                    <div class="delivery_cost__body_cities_item" v-for="city in popularCities" :key="city">{{ city }}</div>
                </div>
            </div>
        </div>
        <div class="delivery_cost__footer">
            <div class="delivery_cost__footer_text">
                All rights reserved
                <br>Fast service 2021
            </div>
            <div class="delivery_cost__footer_svgs">
                <BaseIcon :src="MasterIcon" />
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseIcon from 'shared/components/BaseIcon.vue';
import BaseButton from 'shared/components/BaseButton.vue'
import BaseInputField from 'shared/components/BaseInputField.vue'
import { ref, computed } from 'vue';

// icons 
import FastServiceIcon from 'app/assets/icons/fast-service.svg?raw'
import MaestroIcon from 'app/assets/icons/maestro.svg?raw'
import MasterIcon from 'app/assets/icons/master.svg?raw'
import { Executor } from 'shared/request/executor';
import { DeliveryRequest } from 'shared/api/delivery.respository'
import { useGlobalLoading } from 'shared/composables/useLoadingState';
import { store } from 'app/providers';

const popularCities = ['Nur-Sultan', 'Almaty', 'Shymkent', 'Atyrau', 'Aktau', 'Zhana Turmis', 'Kentau', 'Aitei', 'Pavlodar']

const search = ref('')
const error = ref('')

const loadingState = useGlobalLoading()

const geDelivery = computed(() => {
    return store.getters.getDelivery
})

async function submitForm() {
    await Executor.run({
        request: DeliveryRequest.getCityRequest(search.value),
        loadingState,
        onResult(json) {
            store.commit('setDelivery', json)
        },
        onError: (error) => {
            error.value = error
        },
    })
}
</script>

<style lang="scss" scoped>
.delivery_cost {
    width: 550px;
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    color: #283044;
    &__header {
        display: flex;
        align-items: center;
        margin-bottom: 70px;
        &_title {
            font-family: Roboto;
            font-size: 24px;
            font-weight: 700;
            line-height: 28px;
            letter-spacing: 0em;
            text-align: left;
        }
    }
    &__body {
        &_title {
            font-family: Roboto;
            font-size: 48px;
            font-weight: 700;
            line-height: 56px;
            letter-spacing: 0em;
            text-align: left;
            margin-bottom: 15px;
        }
        &_text {
            font-family: Roboto;
            font-size: 24px;
            font-weight: 400;
            line-height: 28px;
            letter-spacing: 0em;
            text-align: left;
            color: #28304480;
            margin-bottom: 80px;
        }
        &_search {
            margin-bottom: 80px;
        }
        &_cities {
            margin-bottom: 80px;
            &_header {
                font-size: 24px;
                font-weight: 400;
                line-height: 28px;
                letter-spacing: 0em;
                text-align: left;
            }
            &_box {
                display: grid;
                grid-template-columns: 140px 140px;
                grid-template-rows: 1fr 1fr;
                grip: 75px;
            }
            &_item {
                position: relative;
                cursor: pointer;
                font-size: 20px;
                font-weight: 400;
                line-height: 23px;
                letter-spacing: 0em;
                text-align: left;
                color: #28304480;
                &::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background: #E9F0EB;
                    width: 100px;
                    height: 1px;
                }
            }
        }
    }
    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &_text {
            color: #283044;
        }
        &_svgs {
            display: flex;
            align-items: center;
        }
    }
}
</style>