import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import CurrencyService from '../services/CurrencyService'

Vue.use(Vuex)
export default new Vuex.Store(
  {
    state: {
      baseCurrency: 'USD',
      shiftCurrency: 'EUR',
      currentShiftCurrencyAmount: null,
      selectedNumber: null,
      firstTableNumber: 1,
      powerOf10Number: 1,
      calculatedCurrencies: {},
      BaseCurrencyList: [],
      numbersToTable: []
    },
    actions: {
      async getCurrencyFromApiAndUpdateEverything (store) {
        return CurrencyService.getCurrency(store.state.baseCurrency).then(
          async response => {
            console.log('success')
            const shiftCurrencies = response.data.rates
            await store.commit('LoadBaseCurrencyList', shiftCurrencies)
            await store.commit('addCurrencyToCurrencyList', store.state.baseCurrency) // add the baseCurrency if it's not in the array
            await store.commit('addCalculatedCurrency', shiftCurrencies)
            await store.commit('loadCurrentShiftCurrencyAmount')
            await store.commit('loadNumbersToTable')
          }, error => {
            console.log(error)
          })
      },
      async increasePowerOf10AndLoadNumberToTable (store) {
        await store.commit('increasePowerOf10')
        store.commit('loadNumbersToTable')
      },
      async decreasePowerOf10AndLoadNumberToTable (store) {
        await store.commit('decreasePowerOf10')
        store.commit('loadNumbersToTable')
      },
      async exchangeCurrenciesAndLoadNumberToTable (store) {
        await store.commit('exchangeCurrencies')
        if (!store.state.calculatedCurrencies[store.state.baseCurrency]) {
          return store.dispatch('getCurrencyFromApiAndUpdateEverything')
        }
        await store.commit('loadCurrentShiftCurrencyAmount')
        return store.commit('loadNumbersToTable')
      },
      async updateShiftCurrencyAndLoadNumberToTable (store, selectedCurrency) {
        await store.commit('updateshiftCurrency', selectedCurrency)
        await store.commit('loadCurrentShiftCurrencyAmount')
        await store.commit('loadNumbersToTable')
      }
    },
    mutations: {
      updateBaseCurrency (state, baseCurrency) {
        state.baseCurrency = baseCurrency
      },
      updateshiftCurrency (state, shiftCurrency) {
        state.shiftCurrency = shiftCurrency
      },
      exchangeCurrencies (state) {
        const baseCurrency = state.baseCurrency
        const shiftCurrency = state.shiftCurrency
        state.baseCurrency = shiftCurrency
        state.shiftCurrency = baseCurrency
      },
      LoadBaseCurrencyList (state, rates) {
        if (!state.currentShiftCurrencyAmount) {
          const BaseCurrencyList = Object.keys(rates)
          state.BaseCurrencyList = BaseCurrencyList
        }
      },
      addCurrencyToCurrencyList (state, currency) {
        if (!state.BaseCurrencyList.includes(state.baseCurrency)) {
          state.BaseCurrencyList.push(currency)
        }
      },
      addCalculatedCurrency (state, shiftCurrencies) {
        if (!state.calculatedCurrencies || !state.calculatedCurrencies[state.baseCurrency]) {
          state.calculatedCurrencies[state.baseCurrency] = shiftCurrencies
        }
      },
      increasePowerOf10 (state) {
        state.powerOf10Number += 1
      },
      decreasePowerOf10 (state) {
        state.powerOf10Number -= 1
      },
      loadCurrentShiftCurrencyAmount (state) {
        state.currentShiftCurrencyAmount = state.calculatedCurrencies[state.baseCurrency][state.shiftCurrency]
      },
      loadNumbersToTable (state) {
        state.numbersToTable = []
        for (let value of _.range(10)) {
          const numbers = {}
          const unit = value + 1
          const baseNumber = unit * state.firstTableNumber * Math.pow(10, state.powerOf10Number)
          const shiftNumber = baseNumber * state.currentShiftCurrencyAmount
          numbers['baseNumber'] = baseNumber
          numbers['shiftNumber'] = shiftNumber.toFixed(2)
          console.log(numbers)
          state.numbersToTable.push(numbers)
        }
      }
    }
  }
)
