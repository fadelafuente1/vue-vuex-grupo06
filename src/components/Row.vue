
    <template >
      <md-table-row class="table-row" v-bind:class="{currencySubrow: baseStyle, currencyRow: !baseStyle}" @click= "onClickRow(index)" >
        <md-table-cell class="base-number" v-bind:style="{fontSize: '18px'}" v-bind:class="{ baseItem: baseStyle && (index === 0 || index == 10)}">{{numberToTable.baseNumber}}</md-table-cell>
        <md-table-cell class="shift-number-background shift-number">{{numberToTable.shiftNumber}}</md-table-cell>
        <div id="clear"></div>
      </md-table-row>
    </template>

<script>
export default {
  name: 'Row',
  props: ['numberToTable', 'index', "baseStyle"],
  methods: {
    async onClickRow(index) {
      var subrowShow = this.$store.state.subrowShow
      subrowShow = subrowShow ? subrowShow = null : this.$store.state.numbersToTable[index].subrowNumbers
      await this.$store.commit('updateSubrowShow', subrowShow)
      
    },
  }
}
</script>
<style scoped>
.currencyRow {
  cursor: pointer;
}
.currencyRow:hover {
  background-color: lightseagreen;
  color: white;
}
.table-row{
  overflow:hidden;
  background-color: white;
  border-color: white;
  font-size: 24px!important;
}
.shift-number{
  color: white!important;
  font-weight: bold;
  text-shadow: -0.7px 0 black;
  font-size:  24px!important
  
}
.shift-number-background{
  background-color: gray;
}
.base-number{
  font-weight: bold;
  border-top-color: black;
  font-size: 24px!important;
}
.baseItem{
  background-color: lightseagreen;
  color: white;
  border-color: white;
  cursor: pointer;
}
.currencySubrow{
  font-size: 18px!important;
}
.md-table-cell{
  width: 50%;
  padding: 0!important;
}
#clear{
  clear:right;
}
</style>