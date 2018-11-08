<template>
  <div>
    <table style="width:100%">
      <tr>
        <th>
          <b-form-select  v-model="baseCurrencySelected" @change = "onChangeBaseCurrency($event)" :options="$store.state.BaseCurrencyList" class="mb-3" />
        </th>
        <th>
          <button type="button" @click="onClickExhange()"> 
            <i class="fas fa-arrows-alt-h"></i>
          </button>
        </th>
        <th>
          <b-form-select @change = "onChangeShiftComponent($event)" v-model="shiftCurrencySelected" :options="$store.state.BaseCurrencyList" class="mb-3" />
        </th> 
      </tr>
      <tr class="currency-row" @click="onClickRow($event)" v-for="numberToTable in $store.state.numbersToTable" :key="numberToTable.baseNumber">
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
export default {
  name: 'Table',
  data () {
    return {
      baseCurrencySelected: null,
      shiftCurrencySelected: null,
    }
  },
  async mounted () {
    this.getSelectedCurrencies()
    await this.getCurrency()

  },
  methods: {
    onClickRow(event) {
      const choosenNumber = event.target.parentElement.firstChild.textContent
      console.log(choosenNumber)
      
    },
    onClickExhange() {
      this.$store.dispatch('exchangeCurrenciesAndLoadNumberToTable')
      this.baseCurrencySelected = this.$store.state.baseCurrency
      this.shiftCurrencySelected = this.$store.state.shiftCurrency
    },
    onClickIncrease() {
      this.$store.dispatch('increasePowerOf10AndLoadNumberToTable')
    },
    async onClickDecrease() {
      this.$store.dispatch('decreasePowerOf10AndLoadNumberToTable')
    },
    async onChangeBaseCurrency(selectedCurrency) {
      await this.$store.commit('updateBaseCurrency', selectedCurrency)
      await this.getCurrency()
    },
    async onChangeShiftComponent(selectedCurrency) {
      await this.$store.dispatch('updateShiftCurrencyAndLoadNumberToTable', selectedCurrency)
    },
    getSelectedCurrencies() {
      this.baseCurrencySelected = this.$store.state.baseCurrency
      this.shiftCurrencySelected = this.$store.state.shiftCurrency
    },
    getCurrency() {
      if (!this.$store.state.calculatedCurrencies[this.$store.state.baseCurrency]) {
        return this.$store.dispatch('getCurrencyFromApiAndUpdateEverything')
      }
    },
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
.currency-row {
  cursor: pointer;

}
.currency-row:hover {
  background-color: #42b983
}
</style>
