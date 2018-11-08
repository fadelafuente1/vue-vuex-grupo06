import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

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
      LoadBaseCurrencyList (state, BaseCurrencyList) {
        state.BaseCurrencyList = BaseCurrencyList
      },
      addCurrencyToCurrencyList (state, currency) {
        state.BaseCurrencyList.push(currency)
      },
      addCalculatedCurrency (state, calculatedCurrency) {
        const baseCurrency = calculatedCurrency.baseCurrency
        const shiftCurrencies = calculatedCurrency.shiftCurrencies
        if (!state.calculatedCurrencies[baseCurrency]) {
          state.calculatedCurrencies[baseCurrency] = shiftCurrencies
        }
      },
      increasePowerOf10 (state) {
        state.powerOf10Number += 1
      }
    }
  }
)
