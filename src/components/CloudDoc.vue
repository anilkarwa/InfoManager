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
        <router-link to="/appointments"><v-icon>event</v-icon></router-link>
        <router-link to="/menu"><v-icon>home</v-icon></router-link>
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
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" scrollable persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">New Doc</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="File Name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="File Type" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    name="Description"
                    label="Description"
                    required>
                  </v-text-field>
                </v-flex>
                  <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <img :src="imageUrl" height="150" v-if="imageUrl"/>
                  <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                  >
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
      CloudFiles: [],
      imageName: '',
      imageUrl: '',
      imageFile: ''
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
      this.drawer = !this.drawer
      this.CloudFiles = []
      axios.getCloudDocuments(categroyid).then((data) => {
        data.forEach(element => {
          this.CloudFiles.push({fileName: element.DocumentName, fileLink: element.DocumentLink})
        })
      })
    },
    /**
    * Method for taking file from device
    */
    pickFile () {
      this.$refs.image.click()
    },
    /**
    * Method for taking file from device
    */
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  }
}
</script>
<style>

</style>
