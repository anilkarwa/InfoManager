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
          <v-list-tile :key="item.GrpID" @click="loadTable(item.GrpID)">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>

            <v-list-tile-content >
              <v-list-tile-title>
                {{ item.GrpName }}
              </v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-1"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 24%" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">{{CompanyName}}</span>
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
      <v-tooltip bottom> <router-link slot="activator" to="/appointments"><v-icon>event</v-icon></router-link><span>Appointment</span></v-tooltip>
      <v-tooltip bottom><router-link  slot="activator" style="margin-left:10px;" to="/menu"><v-icon>home</v-icon></router-link><span>Home</span></v-tooltip>
    </v-toolbar>
    <v-content>
   
      <v-progress-circular :size="50" indeterminate color="primary" v-if="loading"></v-progress-circular>   
      <v-data-table
        :headers="headersData"
        :items="desserts"
        :search="search"
        :loading="tableLoading">

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
          <tr style="cursor:pointer" @click="loadSelectedRowData(row.item)">
            <component  v-for="header in Object.keys(row.item)" :key="header" :is="getComponentByColumnType(header, row.item)"></component>
         </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
  
     
    </v-content>
     <v-tooltip top><v-btn
      slot="activator"
      fab
      bottom
      right
      color="indigo"
      dark
      fixed
      @click.stop="settings = !settings"
      style="margin-bottom:22px;z-index:100"
    >
      <v-icon>settings</v-icon>
    </v-btn><span>Query Table</span></v-tooltip>
    <v-tooltip top><v-btn
      fab
      slot="activator"
      bottom
      right
      color="indigo"
      dark
      fixed
      @click.stop="add = !add"
      style="margin-right:17%;margin-bottom:22px; z-index:100"
     >
      <v-icon>add</v-icon>
     </v-btn><span>show/hide columns</span></v-tooltip>
     <v-dialog v-model="add" scrollable max-width="400px">
        <v-card>
          <v-card-title>Enable/Disable Columns</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 400px;">
            <v-checkbox
                v-for="name in headersData"
                v-model="name.selected"
                :label="`${name.text.toString()}`"
                color="info"
                hide-details
                :key="name.text">
            </v-checkbox>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" flat @click="add = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
     <v-dialog v-model="settings" scrollable max-width="800px">
        <v-card>
          <v-card-title>Query Data</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout row wrap>
              <v-flex xs4>
                <v-select
                  :items="headersData"
                  v-model="ConditionColumnName1"
                  label="Coulmn Name"
                  single-line 
                  autocomplete
                  required
                  :rules="[v => !!v || 'Please select column name']"
                ></v-select>
              </v-flex>

              <v-flex xs4>
            <v-select
              :items="conditionArray"
              v-model="SelectedConditionOnColumn1"
              label="Condition Type"
              single-line 
              autocomplete
              required
              :rules="[v => !!v || 'Please select condition type']"
            ></v-select>
          </v-flex>
            <v-flex xs4>
            <v-text-field
              id="testing"
              name="input-1"
              v-model="ConditionColumnNameValue1"
              label="Condition Value" 
              required 
              :rules="ConditionColumnNameValue1Rules"
            ></v-text-field>
          </v-flex>
            <v-flex xs12>
              <v-radio-group v-model="ConditionalStatement" row :mandatory="false" required>
              <v-radio label="AND" value="and" selected></v-radio>
              <v-radio label="OR" value="or"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs4>
            <v-select
              :items="headersData"
              v-model="ConditionColumnName2"
              label="Column Name"
              single-line 
              autocomplete
              required 
              :rules="[v => !!v || 'Please select column name']"
            ></v-select>
          </v-flex>
              <v-flex xs4>
            <v-select
              :items="conditionArray"
              v-model="SelectedConditionOnColumn2"
              label="Condition Type"
              single-line 
              autocomplete
              required 
              :rules="[v => !!v || 'Please select condition type']"
            ></v-select>
          </v-flex>
            <v-flex xs4>
            <v-text-field
              id="testing"
              name="input-1"
              v-model="ConditionColumnNameValue2"
              label="Label Text" 
              required 
              :rules="ConditionColumnNameValue2Rules"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" flat @click="settings = false">Close</v-btn>
            <v-btn color="blue darken-1" flat :disabled="!valid" @click="applyCondition">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-dialog v-model="rowdialoge" scrollable="" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Details</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-list two-line>
                   <template v-for="rowitems in Object.keys(editedItem)">
                     <v-list-tile :key="rowitems">
                      <v-list-tile-content >
                         <v-list-tile-title v-html="rowitems"></v-list-tile-title>
                         <v-list-tile-sub-title v-html="editedItem[rowitems]"></v-list-tile-sub-title>
                      </v-list-tile-content></v-list-tile>
                   </template>
                </v-list>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="rowdialoge = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <app-footer></app-footer>
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
    ConditionalStatement: 'and',
    ConditionColumnNameValue1Rules: [
      v => !!v || 'Enter some condition ',
      v => (v && v.length >= 0) || 'Please enter some condition value'
    ],
    ConditionColumnNameValue2Rules: [
      v => !!v || 'Enter some condition',
      v => (v && v.length >= 0) || 'Please enter some condition value'
    ],
    add: false,
    valid: true,
    settings: false,
    SelectedGroupId: 0,
    FirstGroupid: 0,
    categoryName: '',
    dialog: false,
    drawer: null,
    CompanyName: '',
    editedItem: [],
    editedIndex: 0,
    rowdialoge: false,
    mainMenuList: [],
    search: '',
    loading: false,
    headersData: [],
    desserts: [],
    dynamicTD: [],
    tableLoading: false,
    conditionArray: [
      {text: 'equals', value: '='},
      {text: 'does not equal', value: '!='},
      {text: 'is greater than', value: '>'},
      {text: 'is greater than or equal to', value: '>='},
      {text: 'is less than', value: '<'},
      {text: 'is less than or equal to', value: '<='},
      {text: 'begin with', value: ' like \''},
      {text: 'does not begin with', value: 'not like \''}]
  }),
  props: {
    source: String
  },
  beforeMount () {
    this.CompanyName = localStorage.getItem('CompanyName')
    this.getMainMenu()
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
          const rowData = '<td align="center" v-show="true">' + data[header] + '</td>'
          return {template: rowData}
        } else {
          const rowData = '<td align="center" v-show="false">' + data[header] + '</td>'
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
        this.FirstGroupid = this.mainMenuList[0].GrpID
        this.getTableHeader(this.FirstGroupid)
        this.getTableData(this.FirstGroupid)
      })
    },
    displayTitle (name) {
      if (!(name === undefined)) {
        localStorage.setItem('categoryName', name)
      }
      return localStorage.getItem('categoryName')
    },
    getTableHeader (groupid) {
      this.loading = true
      this.headersData = []
      axios.getTableHeader(groupid).then((data) => {
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
    getTableData (groupid) {
      this.tableLoading = true
      axios.getTableData(groupid).then((data) => {
        this.desserts = data
        this.tableLoading = false
        this.loading = false
      })
    },
    applyCondition () {
      if (this.$refs.form.validate()) {
        this.settings = false
        let queryCondition = ''
        if ((this.SelectedConditionOnColumn1.trim() === "like '" && this.SelectedConditionOnColumn2.trim() === "like '") || (this.SelectedConditionOnColumn1.trim() === "not like '" && this.SelectedConditionOnColumn2.trim() === "not like '")) {
          queryCondition = this.ConditionColumnName1 + ' ' + this.SelectedConditionOnColumn1 + this.ConditionColumnNameValue1 + '%\'' + ' ' + this.ConditionalStatement + ' ' + this.ConditionColumnName2 + ' ' + this.SelectedConditionOnColumn2 + this.ConditionColumnNameValue2 + '%\''
          console.log(queryCondition)
        } else {
          if (this.SelectedConditionOnColumn1.trim() === "like '" || this.SelectedConditionOnColumn1.trim() === "not like '") {
            queryCondition = this.ConditionColumnName1 + ' ' + this.SelectedConditionOnColumn1 + this.ConditionColumnNameValue1 + '%\'' + ' ' + this.ConditionalStatement + ' ' + this.ConditionColumnName2 + ' ' + this.SelectedConditionOnColumn2 + '\'' + this.ConditionColumnNameValue2 + '\''
            console.log(queryCondition)
          } else {
            if (this.SelectedConditionOnColumn2.trim() === "like '" || this.SelectedConditionOnColumn2.trim() === "not like '") {
              queryCondition = this.ConditionColumnName1 + ' ' + this.SelectedConditionOnColumn1 + '\'' + this.ConditionColumnNameValue1 + '\'' + ' ' + this.ConditionalStatement + ' ' + this.ConditionColumnName2 + ' ' + this.SelectedConditionOnColumn2 + this.ConditionColumnNameValue2 + '%\''
              console.log(queryCondition)
            } else {
              queryCondition = this.ConditionColumnName1 + ' ' + this.SelectedConditionOnColumn1 + '\'' + this.ConditionColumnNameValue1 + '\'' + ' ' + this.ConditionalStatement + ' ' + this.ConditionColumnName2 + ' ' + this.SelectedConditionOnColumn2 + '\'' + this.ConditionColumnNameValue2 + '\''
              console.log(queryCondition)
            }
          }
        }
        axios.getTableDataOnQuery(this.SelectedGroupId, queryCondition).then((data) => {
          this.desserts = data
          this.$refs.form.reset()
        })
      }
    },
    loadSelectedRowData (item) {
      this.rowdialoge = true
      console.log('row id=', item)
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(JSON.stringify(this.editedItem))
    },
    loadTable (groupid) {
      this.drawer = !this.drawer
      this.SelectedGroupId = groupid
      this.getTableHeader(groupid)
      this.getTableData(groupid)
    }
  }
}
</script>
<style>
.progress-circular{
  position: absolute;
  z-index: 10;
  top: 100px;
  left: 200px;

}
  
</style>
