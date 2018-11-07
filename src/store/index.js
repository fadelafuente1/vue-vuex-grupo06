import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store(
  {
    state: {
      baseCurrency: 'USD',
      changeCurrency: 'EUR',
      selectedNumber: null,
      calculatedCurrencies: {},
      BaseCurrencyList: []
    },
    mutations: {
      updateBaseCurrency (state, baseCurrency) {
        state.baseCurrency = baseCurrency
      },
      updateChangeCurrency (state, changeCurrency) {
        state.changeCurrency = changeCurrency
      },
      exchangeCurrencies (state) {
        const baseCurrency = state.baseCurrency
        const changeCurrency = state.changeCurrency
        state.baseCurrency = changeCurrency
        state.changeCurrency = baseCurrency
      },
      LoadBaseCurrencyList (state, BaseCurrencyList) {
        state.BaseCurrencyList = BaseCurrencyList
      },
      addCurrencyToCurrencyList (state, currency) {
        state.BaseCurrencyList.push(currency)
      },
      addCalculatedCurrency (state, calculatedCurrency) {
        if (!state.calculatedCurrencies[calculatedCurrency['baseCurrency']]) {
          state.calculatedCurrencies.push({
            baseCurrency: calculatedCurrency['baseCurrency'],
            changeCurrencies: calculatedCurrency['changeCurrencies']
          })
        }
      }
    }
  }
)
