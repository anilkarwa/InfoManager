<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in mainMenuList">
          <v-list-tile :key="item.GrpID">
            <v-list-tile-action>
              <v-icon>book</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.GrpName }}
              </v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 24%" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">{{ displayTitle($route.params.categoryName) }}</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        v-model="search"
          single-line
          hide-details
      ></v-text-field>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://vuetifyjs.com/static/doc-images/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
   
         
      <v-data-table
        :headers="headersData"
        :items="desserts"
        :search="search">

         <template  slot="headers" slot-scope="row">
            <tr>
              <th
                v-for="header in row.headers" v-if="header.selected"
                :key="header.text"
              >
                {{ header.text }}
              </th>
            </tr>
          </template> 

        <template slot="items" slot-scope="row">
          <tr>
            <component  v-for="header in Object.keys(row.item)" :key="header" :is="getComponentByColumnType(header, row.item)"></component>
         </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
 
        
     
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="settings = !settings"
    >
      <v-icon>settings</v-icon>
    </v-btn>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="add = !add"
      style="margin-right:15%"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="add" width="500px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create contact
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
                <v-checkbox
                v-for="name in headersData"
                v-model="name.selected"
                :label="`${name.text.toString()}`"
                color="info"
                hide-details
                :key="name.text">
            </v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="add = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="add = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="settings" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create contact
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>

            <v-flex xs4>
              <v-select
                :items="headersData"
                v-model="ConditionColumnName1"
                label="Coulmn Name"
                single-line
              ></v-select>
            </v-flex>

             <v-flex xs4>
          <v-select
            :items="conditionArray"
            v-model="SelectedConditionOnColumn1"
            label="Condition Type"
            single-line
          ></v-select>
        </v-flex>
          <v-flex xs4>
          <v-text-field
            id="testing"
            name="input-1"
            v-model="ConditionColumnNameValue1"
            label="Condition Value"
          ></v-text-field>
        </v-flex>
          <v-flex xs12>
            <v-radio-group v-model="ConditionalStatement" row :mandatory="false">
            <v-radio label="AND" value="and" ></v-radio>
            <v-radio label="OR" value="or"></v-radio>
          </v-radio-group>
        </v-flex>
         <v-flex xs4>
          <v-select
            :items="headersData"
            v-model="ConditionColumnName2"
            label="Column Name"
            single-line
          ></v-select>
        </v-flex>
             <v-flex xs4>
          <v-select
            :items="conditionArray"
            v-model="SelectedConditionOnColumn2"
            label="Condition Type"
            single-line
          ></v-select>
        </v-flex>
          <v-flex xs4>
          <v-text-field
            id="testing"
            name="input-1"
            v-model="ConditionColumnNameValue2"
            label="Label Text"
          ></v-text-field>
        </v-flex>

      </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="settings = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="applyCondition">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</div>
</template>
<script>
// import router from '../router'
import axios from './Services/httpClient.js'
export default {
  data: () => ({
    ConditionColumnName1: '',
    ConditionColumnNameValue1: '',
    ConditionColumnName2: '',
    ConditionColumnNameValue2: '',
    SelectedConditionOnColumn1: '',
    SelectedConditionOnColumn2: '',
    ConditionalStatement: '',
    add: false,
    settings: false,
    categoryName: '',
    dialog: false,
    drawer: null,
    mainMenuList: [],
    search: '',
    headersData: [],
    desserts: [],
    dynamicTD: [],
    conditionArray: [
      {text: 'equals', value: '='},
      {text: 'does not equal', value: '!='},
      {text: 'is greater than', value: '>'},
      {text: 'is greater than or equal to', value: '>='},
      {text: 'is less than', value: '<'},
      {text: 'is less than or equal to', value: '<='},
      {text: 'begin with', value: ' like \'%'},
      {text: 'does not begin with', value: 'not like \'% '}]
  }),
  props: {
    source: String
  },
  beforeMount () {
    this.getMainMenu()
    this.getTableHeader()
    this.getTableData()
  },
  computed: {
  },
  methods: {
    getComponentByColumnType (header, data) {
      // return the component per your column type here.
      // const tempdata = '<td>' + data.header + '</td>'
      // const showrow = this.headersData.find(h => h.value === header).selected
      if (header !== 'INFOID') {
        const valData = this.headersData.find(h => h.value === header).selected
        if (valData) {
          const rowData = '<td v-show="true">' + data[header] + '</td>'
          return {template: rowData}
        } else {
          const rowData = '<td v-show="false">' + data[header] + '</td>'
          return {template: rowData}
        }
      }
    },
    getMainMenu () {
      axios.getMainMenu().then((data) => {
        // console.log('Home Page Response', data.length)
        data.forEach(element => {
          // console.log('Elements', element.GrpName)
          this.mainMenuList.push(element)
        })
      })
    },
    displayTitle (name) {
      if (!(name === undefined)) {
        localStorage.setItem('categoryName', name)
      }
      return localStorage.getItem('categoryName')
    },
    getTableHeader () {
      axios.getTableHeader().then((data) => {
        // console.log('Table  Header Data', data)
        data.forEach(element => {
          // console.log('lets see the data', element)
          this.headersData.push({text: element.FldTitle, value: element.FldCode, selected: true, sortable: true})
        })
      })
    },
    showColumn (col) {
      alert(col)
      // return this.headersData.find(h => h.value === col).selected
      return true
    },
    getTableData () {
      axios.getTableData().then((data) => {
        this.desserts = data
        // console.log('TRY', data[0])
        // data.forEach(element => {
        //   // this.headers.forEach(element2 => {
        //   //   console.log('KEY', element2.value)
        //   //   let tempArray = {};
        //   //   tempArray.push(element2.value)
        //   // })
        //   console.log('Value', element)
        //   this.desserts.push(element)
        // })
      })
    },
    applyCondition () {
      this.settings = false
      let queryCondition = this.ConditionColumnName1 + ' ' + this.SelectedConditionOnColumn1 + ' ' + '\'' + this.ConditionColumnNameValue1 + '\'' + ' ' + this.ConditionalStatement + ' ' + this.ConditionColumnName2 + ' ' + this.SelectedConditionOnColumn2 + ' ' + '\'' + this.ConditionColumnNameValue2 + '\''
      console.log(queryCondition)
      // axios.getTableDataOnQuery(queryCondition).then((data) => {
      //   this.desserts = data
      // })
    }
  }
}
</script>
<style>

</style>
