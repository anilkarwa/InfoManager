<template>
<div id="app">
  <v-app id="inspire">
     <v-navigation-drawer  
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer">
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in DocCategories" :key="item.title" @click="getCloudDocument(item.Id)">
          <v-list-tile-action>
            <v-icon>cloud_queue</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-1"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">{{CompanyName}}</span>
      </v-toolbar-title>
      <v-text-field
      v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        flat
        solo-inverted
        prepend-icon="search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
    
    </v-toolbar>
    <v-content>
    <v-data-table
        :headers="headers"
        :items="CloudFiles"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.fileName }}</td>
          <td class="text-xs-left"><a :href="`http://47.23.106.203/InfoManager/${props.item.fileLink}`" ><v-icon>cloud_download</v-icon></a></td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table> 


      
    </v-content>

    <app-footer></app-footer>
  </v-app>
</div>
</template>
<script>
import axios from './Services/httpClient.js'
export default {
  data () {
    return {
      dialog: false,
      drawer: null,
      search: '',
      CompanyName: '',
      DocCategories: [],
      headers: [
        {text: 'File Name', value: 'name', sortable: false},
        { text: 'Download', value: 'iron', sortable: false }
      ],
      CloudFiles: []
    }
  },
  props: {
    source: String
  },
  beforeMount () {
    this.CompanyName = localStorage.getItem('CompanyName')
    this.getDocCategories()
  },
  methods: {
    getDocCategories () {
      axios.getCloudDocCategroies().then((data) => {
        data.forEach(element => {
          this.DocCategories.push({ title: element.CategoryName, Id: element.CategoryId })
        })
        this.getCloudDocument(this.DocCategories[0].Id)
      })
    },
    getCloudDocument (categroyid) {
      this.CloudFiles = []
      axios.getCloudDocuments(categroyid).then((data) => {
        data.forEach(element => {
          this.CloudFiles.push({fileName: element.DocumentName, fileLink: element.DocumentLink})
        })
      })
    }
  }
}
</script>
<style>

</style>
