<template>
  <div>
    <table style="width:100%">
      <tr>
        <th>
          <b-form-select  v-model="baseCurrencySelected" @change = "onChangeBaseCurrency($event)" :options="BaseCurrencyList" class="mb-3" />
        </th>
        <th>
          <button type="button" @click="onClickExhange()"> 
            <i class="fas fa-arrows-alt-h"></i>
          </button>
        </th>
        <th>
          <b-form-select @change = "onChangeShiftComponent($event)" v-model="shiftCurrencySelected" :options="BaseCurrencyList" class="mb-3" />
        </th> 
      </tr>
      <tr v-for="numberToTable in $store.state.numbersToTable" :key="numberToTable.baseNumber">
        <th class="text-center">{{numberToTable.baseNumber}}</th>
        <th></th>
        <th class="text-center">{{numberToTable.shiftNumber}}</th>
      </tr>
    </table>
    <button type="button" @click = "onClickIncrease()"> Aumentar</button>
    <button type="button" @click = "onClickDecrease()"> Disminuir</button>
</div>

</template>

<script>
import CurrencyService from '../services/CurrencyService'
export default {
  name: 'Table',
  data () {
    return {
      baseCurrency:  '',
      shiftCurrency: '',
      BaseCurrencyList: [],
      baseCurrencySelected: null,
      shiftCurrencySelected: null,
    }
  },
  async mounted () {
    this.getSelectedCurrencies()
    await this.getCurrency(true)
    await this.$store.commit('loadCurrentShiftCurrencyAmount')
    await this.$store.commit('loadNumbersToTable')

  },
  methods: {
    onClickIncrease() {
      console.log('incrementar')
      this.$store.dispatch('increasePowerOf10AndLoadNumberToTable')
    },
    async onClickDecrease() {
      this.$store.dispatch('decreasePowerOf10AndLoadNumberToTable')
    },
    async onChangeBaseCurrency(selectedCurrency) {
      this.baseCurrency = selectedCurrency
      await this.$store.commit('updateBaseCurrency', this.baseCurrency)
      await this.getCurrency(false)
      await this.$store.commit('loadCurrentShiftCurrencyAmount')
      await this.$store.commit('loadNumbersToTable')
      console.log(this.$store.state.numbersToTable)
    },
    async onChangeShiftComponent(selectedCurrency) {
      this.shiftCurrency = selectedCurrency
      this.$store.commit('updateshiftCurrency', this.shiftCurrency)
      await this.$store.commit('loadCurrentShiftCurrencyAmount')
      await this.$store.commit('loadNumbersToTable')
      console.log(this.$store.state.numbersToTable)

    },
    getSelectedCurrencies() {
      this.baseCurrency = this.$store.state.baseCurrency
      this.baseCurrencySelected = this.baseCurrency
      this.shiftCurrency = this.$store.state.shiftCurrency
      this.shiftCurrencySelected = this.shiftCurrency
      this.BaseCurrencyList = this.$store.state.BaseCurrencyList
    },
    getCurrencyFromApi(isMounted, params) {
      return CurrencyService.getCurrency(params).then(
        async response => {
          console.log('success')
          if(isMounted) {
            const currenciesNames = Object.keys(response.data.rates)
            await this.$store.commit('LoadBaseCurrencyList', currenciesNames)
          }
          this.checkBaseCurrencyInBaseCurrencyList()
          const exchangedCurrencyAmount = response.data.rates[params.shiftCurrency]
          this.BaseCurrencyList = this.$store.state.BaseCurrencyList
          return await this.addCalculatedCurrencyToStore(params.baseCurrency, response.data.rates)
        }, error => {
          console.log(error)
        }
      )
    },
    getCurrency(isMounted) {
      const params = {baseCurrency: this.$store.state.baseCurrency,
                      shiftCurrency: this.$store.state.shiftCurrency}
      if (!this.$store.state.calculatedCurrencies[params.baseCurrency]) {
        return this.getCurrencyFromApi(isMounted, params)
      }
    },
    async checkBaseCurrencyInBaseCurrencyList() {
      if(!this.$store.state.BaseCurrencyList.includes(this.$store.state.baseCurrency)) {
            return await this.$store.commit('addCurrencyToCurrencyList',this.$store.state.baseCurrency) //add the baseCurrency if it's not in the array
          }
    },
    async addCalculatedCurrencyToStore(baseCurrency, rates) {
      const calculatedCurrency = {}
      calculatedCurrency['baseCurrency'] = baseCurrency
      calculatedCurrency['shiftCurrencies'] = rates
      return await this.$store.commit('addCalculatedCurrency', calculatedCurrency)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
