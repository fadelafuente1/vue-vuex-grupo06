<template>
  <div id="full-container">
    <Sidebar title="Vue Grupo06" v-on:clickExhange="onClickExhange()" ></Sidebar>
    <div class="page-container md-layout-column" id="currency-table">
      <v-touch v-on:swipeleft="swipeLeftHandler" v-on:swiperight="swipRightHandler">
        <md-table md-card>
          <md-table-row id="table-header">
            <md-table-cell class="text-center">
              <span class="menu-button" @click="onClickMenu()">
                <MenuIcon/>
              </span>  
              <b-form-select id="base-select"  v-model="baseCurrencySelected" @change = "onChangeBaseCurrency($event)" :options="$store.state.BaseCurrencyList" class="mb-3" />
            </md-table-cell>
            <md-table-cell class="text-center">
              <b-form-select id="shift-select" @change = "onChangeShiftComponent($event)" v-model="shiftCurrencySelected" :options="$store.state.BaseCurrencyList" class="mb-3" />
            </md-table-cell>
          </md-table-row>
            <template  v-if="!subrowShow" v-for="(numberToTable, index) in $store.state.numbersToTable" >
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
      </v-touch>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Sidebar from './Sidebar'
export default {
  name: 'Table',
  components: {
    Sidebar
  },
  data () {
    return {
      baseCurrencySelected: null,
      shiftCurrencySelected: null,
      subrowShow: null,
    }
  },
  async mounted () {
    await this.getSelectedCurrencies()
    await this.getCurrency()
  },
  methods: {
    async onClickMenu() {
      await this.$store.commit('changeShowNavigation')
    },
    async onClickExhange() {
      await this.$store.dispatch('exchangeCurrenciesAndLoadNumberToTable')
      this.baseCurrencySelected = this.$store.state.baseCurrency
      this.shiftCurrencySelected = this.$store.state.shiftCurrency
      this.$store.commit('changeShowNavigation')
    },
    swipRightHandler() {
      this.$store.dispatch('increasePowerOf10AndLoadNumberToTable')
    },
    swipeLeftHandler(){
      this.$store.dispatch('decreasePowerOf10AndLoadNumberToTable')
    },
    onClickRow(index) {
      this.subrowShow = this.subrowShow ? this.subrowShow = null : this.$store.state.numbersToTable[index].subrowNumbers
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
#full-container{
  background-color: lightseagreen;
  height: 100vh;
}
.menu-item{
  padding-left: 1%;
}
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
}
.md-table-cell{
  width: 50%;
  font-size: 24px!important;
  padding: 0!important;
}
#base-select{
  color: white;
  width: 78%;
  font-weight: bold;
}
#shift-select{
  color:lightgray;
  width: 80%;
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
.menu-button{
  cursor: pointer;
  color: white;
}
.currency-subrow{
  font-size: 18px!important;
}
</style>

<style lang="css">
.md-table-cell-container {
    padding: 0px !important;
  }
</style>