<template>
  <div>
    <div id="currency-table">
      <md-table md-card>
        <md-table-row id="table-header">
          <md-table-cell class="text-center">
            <b-form-select id="base-select"  v-model="baseCurrencySelected" @change = "onChangeBaseCurrency($event)" :options="$store.state.BaseCurrencyList" class="mb-3" />
          </md-table-cell>

          <md-table-cell class="text-center">
            <b-form-select id="shift-select" @change = "onChangeShiftComponent($event)" v-model="shiftCurrencySelected" :options="$store.state.BaseCurrencyList" class="mb-3" />
          </md-table-cell>
        </md-table-row>

        <md-table-row class="currency-row table-row" @click="onClickRow($event)" v-for="numberToTable in $store.state.numbersToTable" :key="numberToTable.baseNumber">
          <md-table-cell class="base-number">{{numberToTable.baseNumber}}</md-table-cell>
          <md-table-cell class="shift-number">{{numberToTable.shiftNumber}}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <button type="button" @click = "onClickIncrease()"> Aumentar</button>
    <button type="button" @click = "onClickDecrease()"> Disminuir</button>
    <button type="button" @click="onClickExhange()"> 
      Swap<i class="fas fa-arrows-alt-h"></i>
    </button>
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

.currency-row {
  cursor: pointer;

}
.currency-row:hover {
  background-color: #42b983
}
#currency-table{
  text-align: center;
}
#table-header{
  background-color: black;
}
.table-row{
  background-color: #01001E;
  color: darkgrey;
  border-color: #01001E;
}
.form-control{
  background-color: black;
  border-color: black;
  text-align: center;
}
.form-control:hover{
  background-color: black;
  border-color: black;
  text-align: center;
}
.shift-number{
  background-color: #005F33;
}
.base-number{
  
}
.md-table-cell{
  font-size: 24px!important;
}
#base-select{
  color:darkgoldenrod;
}
#shift-select{
  color:darkred;
}
.mb-3{
  margin-bottom: 0!important;
}
</style>
