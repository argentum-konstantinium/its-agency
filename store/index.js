import axios from 'axios';
export const state = () => ({
    products: [],
    cart: [],
    products_to_remove: [],
    removeLength: 0,
    cartLength: 0,
    cartSum: 0,
});

export const mutations = {
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products;
    },
    PUSH_TO_CART: (state, product) => {
        if (state.cartLength === 0) {
            product.quantity = 1;
            state.cart.push(product);
        } else {
            for(let i of state.cart) {
                if (i.index === product.index) {
                    i.quantity += 1;
                    state.cart.splice(state.cart.indexOf(i), 1, i);
                    return;
                }
            }
            product.quantity = 1;
            state.cart.push(product);
        }
        
        
    },
    SET_PRODUCT_QUANTITY_SUB: (state, product) => {
        product.quantity -= 1;
    },
    SET_PRODUCT_QUANTITY_ADD: (state, product) => {
        product.quantity += 1;
    },
    SET_PRODUCT_REMOVED_STATUS_FALSE: (state, product) => {
        let indexInRemoveList = state.products_to_remove.indexOf(product);
        product.removed = false
        if (indexInRemoveList != -1) {
            state.products_to_remove.splice(indexInRemoveList, 1)
        };
    },
    SET_PRODUCT_REMOVED_STATUS_TRUE: (state, product) => {
        product.removed = true;
        state.products_to_remove.push(product);
    },
    SET_REMOVE_LENGTH: (state) => {
        state.removeLength = state.products_to_remove.length;
    },
    SET_CART_RESET: (state) => {
        for (let i of state.cart) {
            if (state.products_to_remove.indexOf(i) != -1) {
                continue;
            } else {
                i.removed = true;
                state.cart.splice(state.cart.indexOf(i), 1, i);
                state.products_to_remove.push(i);
            }
        }
        state.cartSum = 0;
    },
    SET_CART_SUM_SUB: (state, product) => {
        state.cartSum -= product.cost;
    }, 
    SET_CART_SUM_ADD: (state, product) => {
        state.cartSum += product.cost;
    }, 
    SET_CART_SUM_ON_REMOVE: (state, product) => {
        if (product.removed) {
            state.cartSum -= product.quantity * product.cost;
        } else {
            state.cartSum += product.quantity * product.cost;
        }
        
    }, 
    SET_CART_LENGTH: (state) => {
        state.cartLength = state.cart.length;
    },
    SET_CART_REFRESH_PRODUCT: (state, product) => {
        let indexInCartList = state.cart.indexOf(product);
        state.cart.splice(indexInCartList, 1, product);
    },
    SET_CART_REMOVE_PRODUCTS: (state) => {
        if (state.removeLength > 0) {
            for (let i of state.products_to_remove) {
                let index = state.cart.indexOf(i);
                state.cart.splice(index, 1);
            }
            state.products_to_remove = [];
            
        }
    },
    SAVE_CART_TO_STORAGE: (state) => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
        localStorage.setItem('cartSum', JSON.stringify(state.cartSum));

    },
    SET_CART_FROM_STORAGE: (state) => {
        let cartExist = true;
        try {
            JSON.parse(localStorage.cart);
        } catch (e) {
            cartExist = false;
        }
        if (cartExist) {
            state.cart =  JSON.parse(localStorage.cart);
            state.cartSum = Number(localStorage.cartSum);
        }
    },
     
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
        commit('SET_PRODUCT_REMOVED_STATUS_FALSE', product);
        commit('SET_CART_SUM_ADD', product);
        commit('SET_CART_LENGTH');
        commit('SAVE_CART_TO_STORAGE');

    },
    SUB_PRODUCT_QUANTITY({ commit }, product) {
        commit('SET_PRODUCT_QUANTITY_SUB', product);
        commit('SET_CART_REFRESH_PRODUCT', product);
        commit('SET_CART_SUM_SUB', product);
        commit('SAVE_CART_TO_STORAGE');
    },
    ADD_PRODUCT_QUANTITY({ commit }, product) {
        commit('SET_PRODUCT_QUANTITY_ADD', product);
        commit('SET_CART_REFRESH_PRODUCT', product);
        commit('SET_CART_SUM_ADD', product);
        commit('SAVE_CART_TO_STORAGE');
    },
    ADD_PRODUCT_TO_REMOVE({ commit }, product) {
        commit('SET_PRODUCT_REMOVED_STATUS_TRUE', product);
        commit('SET_CART_REFRESH_PRODUCT', product);
        commit('SET_CART_SUM_ON_REMOVE', product);
        commit('SET_REMOVE_LENGTH');

    },
    CANCEL_REMOVE({ commit }, product) {
        commit('SET_PRODUCT_REMOVED_STATUS_FALSE', product);
        commit('SET_CART_REFRESH_PRODUCT', product);
        commit('SET_CART_SUM_ON_REMOVE', product);
        commit('SET_REMOVE_LENGTH');

    },
    RESET_CART({ commit }) {
        commit('SET_CART_RESET');
        commit('SET_REMOVE_LENGTH');
    },

    REMOVE_ALL_PRODUCTS({ commit }) {
        commit('SET_CART_REMOVE_PRODUCTS');
        commit("SET_CART_LENGTH");
        commit('SET_REMOVE_LENGTH');
        commit('SAVE_CART_TO_STORAGE');
    },
    GET_CART_FROM_STORAGE({commit}) {
        commit("SET_CART_FROM_STORAGE");
        commit('SET_CART_LENGTH')
    },
     

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
    CART_SUM(state) {
        return state.cartSum;
    },
    REMOVE_LENGTH(state) {
        return state.removeLength;
    }
}