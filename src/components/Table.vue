<template>
  <div>
   <b-table  :bordered= "bordered"
             :hover= "hover"
             :dark= "dark"
             :items= "items"
             :fields= "fields"
             >
    </b-table>
    <button @click= "getCurrency('EUR','USD')" >get data</button>
</div>

<!-- card-1.vue -->
</template>

<script>
import CurrencyService from '../services/CurrencyService'
export default {
  name: 'Table',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hover: true,
      dark: true,
      bordered: true,
      baseCurrency:  'usd',
      changeCurrency: 'chp',
      fields: [ 'first_name', 'last_name', 'age' ],
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
      ]
    }
  },
  mounted () {
    this.baseCurrency = this.$store.state.baseCurrency
    this.changeCurrency = this.$store.state.changeCurrency
    this.fields = [ this.baseCurrency, this.changeCurrency]
    this.items = []
    const dict = {}
    dict[this.changeCurrency] = 4
    dict[this.baseCurrency] = 5
    this.items.push(dict)

  },
  methods: {

    getCurrency(baseCurrency, changeCurrency) {
      CurrencyService.getCurrency(baseCurrency).then(
        response => {
          console.log('success')
          
          const currenciesNames = Object.keys(response.data.rates)
          console.log(currenciesNames)
          const exchangedCurrencyAmount = response.data.rates[changeCurrency]
          console.log(exchangedCurrencyAmount);
          console.log(allCurrencies)
        }
      )
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
