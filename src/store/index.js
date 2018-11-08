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
