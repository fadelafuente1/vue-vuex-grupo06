<template>
  <div>
    
   <!-- <b-table  :bordered= "bordered"
             :hover= "hover"
             :dark= "dark"
             :items= "items"
             >
    </b-table> -->
    <table style="width:100%">
      <tr>
        <th>
          <b-form-select  v-model="baseCurrencySelected" @change = "onChangeBaseCurrency($event)" :options="BaseCurrencyList" class="mb-3" />
        </th>
        <th>
          <b-form-select @change = "onChangeShiftComponent($event)" v-model="shiftCurrencySelected" :options="BaseCurrencyList" class="mb-3" />
        </th> 
      </tr>
      <tr>
        <td>Jill</td>
        <td>Smith</td> 
      </tr>
      <tr>
        <td>Eve</td>
        <td>Jackson</td> 
      </tr>
    </table>
</div>

<!-- card-1.vue -->
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
      // fields: [ 'first_name', 'last_name', 'age' ],
      // items: [
      //   { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      //   { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      //   { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
      // ]
    }
  },
  mounted () {
    this.getSelectedCurrencies()
    this.getCurrency(true)

  },
  methods: {
    async onChangeBaseCurrency(selectedCurrency) {
      this.baseCurrency = selectedCurrency
      await this.$store.commit('updateBaseCurrency', this.baseCurrency)
      await this.getCurrency(false)
      const amount = this.$store.state.calculatedCurrencies[this.baseCurrency][this.shiftCurrency]
      console.log(this.$store.state.calculatedCurrencies)
      console.log(amount)
    },
    onChangeShiftComponent(selectedCurrency) {
      this.shiftCurrency = selectedCurrency
      this.$store.commit('updateshiftCurrency', this.shiftCurrency)
      const amount = this.$store.state.calculatedCurrencies[this.baseCurrency][this.shiftCurrency]
      console.log(amount)
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
