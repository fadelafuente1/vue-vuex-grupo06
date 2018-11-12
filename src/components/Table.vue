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
          <Row v-if="!$store.state.subrowShow" 
          v-for="(numberToTable, index) in $store.state.numbersToTable"
          v-bind:key="index" v-bind:index="index"
          v-bind:numberToTable="numberToTable" v-bind:baseStyle="false"></Row>
          <Row v-if="$store.state.subrowShow!==[]"
          v-for="(subrowNumberToTable, i) in $store.state.subrowShow"
          v-bind:key="i" v-bind:index ="i"
          v-bind:numberToTable="subrowNumberToTable" v-bind:baseStyle="true"></Row>
        </md-table>
      </v-touch>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Sidebar from './Sidebar'
import Row from './Row'

export default {
  name: 'Table',
  components: {
    Sidebar,
    Row
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

#currency-table{
  text-align: center;
}
#table-header{
  background-color: lightseagreen;
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
.menu-button{
  cursor: pointer;
  color: white;
  font-size: 18px;
}
</style>

<style lang="css">
.md-table-cell-container {
    padding: 0px !important;
  }
</style>