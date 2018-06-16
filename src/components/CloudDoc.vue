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
        <router-link style="margin-left:10px;" to="/menu"><v-icon>home</v-icon></router-link>
    </v-toolbar>
    <v-content>
    <v-data-table
        :headers="headers"
        :items="CloudFiles"
        :search="search"
        :loading="tableLoading"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.fileName }}</td>
          <td class="text-xs-left">{{ props.item.fileType }}</td>
          <td class="text-xs-left">{{ props.item.fileDescription }}</td>
          <td class="text-xs-left"><a :href="`http://47.23.106.203/InfoManager/Uploads/${props.item.fileLink}`" ><v-icon>cloud_download</v-icon></a></td>
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
      color="indigo"
      dark
      fixed
      @click.stop="dialog = !dialog"
      style="margin-bottom:22px">
      <v-icon>add</v-icon>
    </v-btn>
    <v-layout row justify-center>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>New Cloud Doc</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat :disabled="!valid" @click="saveCloudDoc">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
           <v-card-text>
            <v-container grid-list-md>
              <v-list two-line subheader>
            <v-subheader>Create New Category</v-subheader>
             <v-form ref="form" v-model="valid2" lazy-validation>
              <v-layout wrap>
                <v-flex xs6>
                  <v-text-field label="Category Name" v-model="NewCategory" required :rules="[v => !!v || 'Please enter new category name ']"></v-text-field>
                </v-flex>
                <v-flex  xs3>
                   <v-btn color="blue darken-1" :disabled="!valid2" flat @click="createCloudCategory">Save Category</v-btn>
                </v-flex>
              </v-layout>
               </v-form>
              </v-list>
             <v-list two-line subheader>
            <v-subheader>Upload New File On Cloud</v-subheader> 
             <v-form ref="form" v-model="valid" lazy-validation>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="File Name" v-model="fileName" required :rules="[v => !!v || 'Please enter file name']"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="File Type" v-model="fileType" required :rules="[v => !!v || 'Please enter file type']"></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-select
                  :items="fileCategoryDropdownList"
                  v-model="fileCategory"
                  label="Select file category"
                  item-text="title"
                  item-value="Id"
                  required
                  :rules="[v => !!v || 'Please select file category']"
                ></v-select>
              </v-flex>
                <v-flex xs12>
                  <v-text-field
                    name="Description"
                    label="Description"
                    v-model="fileDescription"
                    required>
                  </v-text-field>
                </v-flex>
                  <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <v-text-field label="Select file" @click='pickFile' v-model='imageName' prepend-icon='attach_file' required  :rules="[v => !!v || 'Please select one file']"></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    @change="onFilePicked"                  
                  >
                </v-flex>
              </v-layout>
             </v-form>
             </v-list>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
        </v-card>
      </v-dialog>
          <v-snackbar
            :timeout="timeout"
            :top="y === 'top'"
            :bottom="y === 'bottom'"
            :right="x === 'right'"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :vertical="mode === 'vertical'"
            v-model="snackbar"
          >
          {{snackbarText}}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>


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
      valid: true,
      valid2: true,
      fileName: '',
      fileType: '',
      fileCategory: '',
      fileDescription: '',
      NewCategory: '',
      tableLoading: false,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      snackbarText: '',
      DocCategories: [],
      fileCategoryDropdownList: [],
      headers: [
        {text: 'File Name', value: 'name', sortable: false},
        {text: 'File Type', value: 'fileType', sortable: false},
        {text: 'File Description', value: 'description', sortable: false},
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
      this.DocCategories = []
      axios.getCloudDocCategroies().then((data) => {
        data.forEach(element => {
          this.DocCategories.push({ title: element.CategoryName, Id: element.CategoryId })
        })
        this.fileCategoryDropdownList = this.DocCategories
        this.getCloudDocument(this.DocCategories[0].Id)
      })
    },
    getCloudDocument (categroyid) {
      this.tableLoading = true
      this.CloudFiles = []
      this.drawer = !this.drawer
      this.CloudFiles = []
      axios.getCloudDocuments(categroyid).then((data) => {
        data.forEach(element => {
          this.CloudFiles.push({fileName: element.DocumentName, fileLink: element.DocumentLink, fileType: element.DocumentType, fileDescription: element.DocumentDescription})
        })
        this.tableLoading = false
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
    },
    saveCloudDoc () {
      var formData = new FormData()
      formData.append('fileName', this.fileName)
      formData.append('fileType', this.fileType)
      formData.append('fileCategory', this.fileCategory)
      formData.append('fileDescription', this.fileDescription)
      formData.append('cloudDocfile', this.imageFile)
      formData.append('cloudDocfileName', this.imageName)
      formData.append('cloudDocfileUrl', this.imageUrl)
      axios.saveNewCloudDoc(formData).then((data) => {
        console.log(data)
        this.snackbar = true
        this.snackbarText = data
        this.fileName = ''
        this.fileType = ''
        this.fileCategory = ''
        this.fileDescription = ''
        this.imageName = ''
        this.dialog = false
      })
    },
    createCloudCategory () {
      axios.createCloudCategory(this.NewCategory).then((data) => {
        console.log(data)
        this.snackbar = true
        this.snackbarText = data
        this.$refs.form.reset()
        this.getDocCategories()
      })
    }
  }
}
</script>
<style>

</style>
