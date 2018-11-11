<template>
  <div>
    <div class="page-container md-layout-column" id="currency-table">
      <md-table md-card>
        <md-drawer :md-active.sync="showNavigation">
          <md-toolbar class="md-transparent" md-elevation="0">
            <span class="md-title">Vue Grupo 06</span>
          </md-toolbar>
          <md-list>
            <md-list-item>
              <PlusIcon/>
              <span class="md-list-item-text" @click = "onClickIncrease()">Aumentar x10</span>
            </md-list-item>

            <md-list-item>
              <MinusIcon/>
              <span class="md-list-item-text" @click = "onClickDecrease()">Disminuir x10</span>
            </md-list-item>

            <md-list-item>
              <SwapIcon/>
              <span class="md-list-item-text" @click="onClickExhange()">Intercambiar monedas</span>
            </md-list-item>
          </md-list>
        </md-drawer>
        <md-table-row id="table-header">
          <md-table-cell class="text-center">
            <span class="menu-button" @click="showNavigation = !showNavigation">
              <MenuIcon/>
            </span>  
            <b-form-select id="base-select"  v-model="baseCurrencySelected" @change = "onChangeBaseCurrency($event)" :options="$store.state.BaseCurrencyList" class="mb-3" />
          </md-table-cell>

          <md-table-cell class="text-center">
            <b-form-select id="shift-select" @change = "onChangeShiftComponent($event)" v-model="shiftCurrencySelected" :options="$store.state.BaseCurrencyList" class="mb-3" />
          </md-table-cell>
        </md-table-row>
        <template v-if="!subrowShow" v-for="(numberToTable, index) in $store.state.numbersToTable"  >
          <md-table-row :key="numberToTable.baseNumber" class="currency-row table-row" @click= "onClickRow(index)" >
            <md-table-cell class="base-number">{{numberToTable.baseNumber}}</md-table-cell>
            <md-table-cell class="shift-number">{{numberToTable.shiftNumber}}</md-table-cell>
          </md-table-row>
        </template>
        <template v-if="subrowShow!== []" v-for="(subrowNumberToTable, i) in subrowShow" >
          <md-table-row @click= "onClickRow(0)" :key="subrowNumberToTable.baseNumber">
            <md-table-cell class="currency-subrow base-number" v-bind:class="{ baseItem: (i === 0 || i == 10)  }" >{{subrowNumberToTable.baseNumber}}</md-table-cell>
            <md-table-cell class="currency-subrow shift-number">{{subrowNumberToTable.shiftNumber}}</md-table-cell>
          </md-table-row>
        </template>
      </md-table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Table',
  data () {
    return {
      baseCurrencySelected: null,
      shiftCurrencySelected: null,
      showNavigation: false,
      subrowShow: null,
    }
  },
  async mounted () {
    // this.subrowShow[0] = false
    await this.getSelectedCurrencies()
    await this.getCurrency()

  },
  methods: {
    onClickRow(index) {
      this.subrowShow = this.subrowShow ? this.subrowShow = null : this.$store.state.numbersToTable[index].subrowNumbers
    },
  async onClickExhange() {
      await this.$store.dispatch('exchangeCurrenciesAndLoadNumberToTable')
      this.baseCurrencySelected = this.$store.state.baseCurrency
      this.shiftCurrencySelected = this.$store.state.shiftCurrency
      this.showNavigation = false
    },
    onClickIncrease() {
      this.$store.dispatch('increasePowerOf10AndLoadNumberToTable')
      this.showNavigation = false
    },
    async onClickDecrease() {
      this.$store.dispatch('decreasePowerOf10AndLoadNumberToTable')
      this.showNavigation = false
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
  background-color: lightseagreen;
  color: white;
}
#currency-table{
  text-align: center;
}
#table-header{
  background-color: lightseagreen;
}
.table-row{
  background-color: white;
  color: black;
  border-color: #01001E;
}
.form-control{
  background-color: lightseagreen;
  border-color: lightseagreen;
  text-align: center;
}
.form-control:hover{
  background-color: lightseagreen;
  border-color: lightseagreen;
  color: white;
  text-align: center;
}
.shift-number{
  background-color: gray;
  color: white;
  font-weight: bold;
  text-shadow: -0.7px 0 black;
}
.base-number{
  font-weight: bold;
  /* color: white; */
}
.md-table-cell{
  font-size: 24px!important;
}
#base-select{
  color:darkgoldenrod;
  width: 90%;
  font-weight: bold;
}
#shift-select{
  color:darkred;
  font-weight: bold;
}
.mb-3{
  margin-bottom: 0!important;
}
.menu{
  color: white;
}
.baseItem{
  background-color: lightseagreen;
  color: white;
  border-color: #01001E;
  cursor: pointer;
  font-size: 24px!important;
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  background-color: white;
}
.md-content {
  padding: 16px;
}
.page-container{
  overflow: hidden;
}
.menu-button{
  cursor: pointer;
  color: white;
}
.md-list-item{
  border-bottom: 1px solid black;
  cursor: pointer;
}
.currency-subrow{
  font-size: 18px!important;
}
</style>
