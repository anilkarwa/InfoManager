<template>
<div id="app">
  <v-app >
    <div>
      <v-toolbar color="pink">
        <v-toolbar-title class="white--text">{{CompanyName}} - Info Manager  </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout row wrap>
             <v-flex xs12 @click="menuSelection(1)">
              <v-card color="blue-grey darken-2" class="white--text" height="100px">
                <v-container fluid grid-list-lg>
                  <v-layout row class="text-lg-center">
                    <v-flex xs12> 
                        <div class="headline"><v-icon  x-large right dark>playlist_add_check</v-icon>  General Category</div>
                        
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs12 @click="menuSelection(2)">
              <v-card color="cyan darken-2" class="white--text" height="100px">
                <v-container fluid grid-list-lg>
                  <v-layout row class="text-lg-center">
                    <v-flex xs12>
                        <div class="headline"><v-icon  x-large right dark>file_copy</v-icon>  Cloud Doc</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs12 @click="menuSelection(3)">
              <v-card color="purple" class="white--text" height="100px">
                <v-container fluid grid-list-lg>
                  <v-layout row class="text-lg-center">
                    <v-flex xs12>
                        <div class="headline"><v-icon  x-large right dark>notification_important</v-icon>  Notification</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </div>
    <app-footer></app-footer>
  </v-app>
</div>
</template>
<script>
import router from '../router'
// import axios from './Services/httpClient.js'
export default {
  data () {
    return {
      categoryName: '',
      CompanyName: ''
    }
  },
  beforeMount () {
    this.CompanyName = localStorage.getItem('CompanyName')
  },
  methods: {
    menuSelection: (id) => {
      if (id === 1) {
        this.categoryName = 'General Category'
      } else if (id === 2) {
        this.categoryName = 'Store Doc'
      } else if (id === 3) {
        this.categoryName = 'Notification'
      }
      router.push({name: 'Home', params: {categoryName: this.categoryName}})
    }
  }
}
</script>
<style>

</style>
