export interface IDeliveryState {
    "city": string,
    "type": string,
    "available": boolean,
    "price": number
}

interface IState {
    delivery: IDeliveryState[]
}

const state: IState = {
    delivery: []
}

const getters = {
    getDelivery: (state: IState) => {
        return state.delivery
    } 
}

const mutations = {
    setDelivery(state: IState, val: IDeliveryState[]) {
        state.delivery = val
    }
}

export default {
    state,
    getters,
    mutations
}