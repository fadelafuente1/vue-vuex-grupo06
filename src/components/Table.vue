<template>
  <div>
    <div class="page-container md-layout-column" id="currency-table">
      <md-table md-card>
        <md-table-row id="table-header">
          <md-table-cell class="text-center">
            <!-- <md-button class="md-icon-button" @click="showNavigation = !showNavigation">
              <md-icon class="menu">menu</md-icon>
            </md-button> -->
            <!-- <md-drawer :md-active.sync="showNavigation">
              <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title">My App name</span>
              </md-toolbar>

              <md-list>
                <md-list-item>
                  <md-icon>move_to_inbox</md-icon>
                  <span class="md-list-item-text">Inbox</span>
                </md-list-item>

                <md-list-item>
                  <md-icon>send</md-icon>
                  <span class="md-list-item-text">Sent Mail</span>
                </md-list-item>

                <md-list-item>
                  <md-icon>delete</md-icon>
                  <span class="md-list-item-text">Trash</span>
                </md-list-item>

                <md-list-item>
                  <md-icon>error</md-icon>
                  <span class="md-list-item-text">Spam</span>
                </md-list-item>
              </md-list>
            </md-drawer> -->
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
          <md-table-row @click= "onClickRow(0)" class="currency-subrow" :key="subrowNumberToTable.baseNumber">
            <md-table-cell  v-bind:class="{ baseItem: (i === 0 || i == 10)  }" class="base-number">{{subrowNumberToTable.baseNumber}}</md-table-cell>
            <md-table-cell class="shift-number">{{subrowNumberToTable.shiftNumber}}</md-table-cell>
          </md-table-row>
        </template>
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
  background-color: #42b983;
  color: black;
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
  color: white;
}
.base-number{
  /* color: white; */
}
.md-table-cell{
  font-size: 24px!important;
}
#base-select{
  color:darkgoldenrod;
  width: 90%;
}
#shift-select{
  color:darkred;
}
.mb-3{
  margin-bottom: 0!important;
}
.menu{
  color: white;
}
.baseItem{
  background-color: #01001E;
  color: darkgrey;
  border-color: #01001E;
  cursor: pointer;
}
</style>
