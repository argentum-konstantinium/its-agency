import axios from 'axios';
export const state = () => ({
    products: [],
    cart: [],
    products_to_remove: [],
    removeLength: 0,
    cartLength: 0,
});

export const mutations = {
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products;
    },
    PUSH_TO_CART: (state, product) => {

        if (state.cartLength > 0) {
            let new_arr = [];
            for (let i of state.cart) {
                new_arr.push(i);
                if (i.index == product.index) {
                    i.quantity += 1;
                    state.cart.splice(state.cart.indexOf(i), 1, i);
                    return;
                }
            }

        }
        product.quantity = 1;
        product.removed = false;

        state.cart.push(product);
        state.cartLength = state.cart.length;
    },
    SET_PRODUCT_IN_STATE_SUB: (state, product) => {
        product.quantity -= 1;
        state.cart.splice(state.cart.indexOf(product), 1, product);
    },
    SET_PRODUCT_IN_STATE_ADD: (state, product) => {
        product.quantity += 1;
        state.cart.splice(state.cart.indexOf(product), 1, product);
    },
    SET_PRODUCTS_TO_REMOVE: (state, product) => {
        state.products_to_remove.push(product);
        state.removeLength = state.products_to_remove.length;
        product.removed = true;
        state.cart.splice(state.cart.indexOf(product), 1, product);

    },
    SET_CART_REMOVE: (state) => {
        for (let i of state.products_to_remove) {
            state.cart.splice(state.cart.indexOf(i), 1);
        }
    },
    SET_REMOVE_AGAIN: (state, product) => {
        for (let i of state.products_to_remove) {
            state.products_to_remove.splice(state.products_to_remove.indexOf(product), 1);
        }
        state.removeLength = state.products_to_remove.length;
        product.removed = false;
        state.cart.splice(state.cart.indexOf(product), 1, product);

    },
    SET_REMOVE_ALL_PRODUCTS: (state) => {
        for (let i of state.cart) {
            if (state.products_to_remove.indexOf(i) === -1) {
                i.removed = true;
                state.products_to_remove.push(i);
                state.cart.splice(state.cart.indexOf(i), 1, i);

            }

        }
    }
}

export const actions = {
    GET_PRODUCTS_FROM_API({ commit }) {
        return axios('./products.json', {
            method: 'GET'
        }).then((products) => {
            commit('SET_PRODUCTS_TO_STATE', products.data.products)
        })
    },
    ADD_TO_CART({ commit }, product) {
        commit('PUSH_TO_CART', product);
    },
    SUB_PRODUCT_QUANTITY({ commit }, product) {
        commit('SET_PRODUCT_IN_STATE_SUB', product)
    },
    ADD_PRODUCT_QUANTITY({ commit }, product) {
        commit('SET_PRODUCT_IN_STATE_ADD', product)
    },
    ADD_PRODUCT_TO_REMOVE({ commit }, product) {
        commit('SET_PRODUCTS_TO_REMOVE', product);
    },
    RESET_CART({ commit }) {
        commit('SET_CART_REMOVE');
    },
    REPEAT_REMOVE({ commit }, product) {
        commit('SET_REMOVE_AGAIN', product);
    },
    REMOVE_ALL_PRODUCTS({ commit }) {
        commit('SET_REMOVE_ALL_PRODUCTS');
    }

}

export const getters = {
    PRODUCTS(state) {
        return state.products;
    },
    CART(state) {
        return state.cart;
    },
    CART_LENGTH(state) {
        return state.cartLength;
    },
    REMOVE_LENGTH(state) {
        return state.removeLength;
    }
}