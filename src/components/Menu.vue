<template>
<div id="app">
  <v-app >

    <div>
      <v-toolbar color="blue darken-1">
        <v-toolbar-title class="white--text">{{CompanyName}} - Info Manager  </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
   
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout row wrap>
             <v-flex xs12 sm6 md4 lg4 xl4 @click="menuSelection(1)">
              <v-card color="blue-grey darken-1" class="white--text" height="60px">
                <v-container fluid grid-list-lg>
                  <v-layout row class="text-lg-center">
                    <v-flex xs12> 
                        <div class="headline" style="cursor:pointer;"><v-icon  x-large right dark>playlist_add_check</v-icon>  General Category</div>
                        
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4 xl4 @click="menuSelection(2)">
              <v-card color="blue-grey darken-1" class="white--text" height="60px">
                <v-container fluid grid-list-lg>
                  <v-layout row class="text-lg-center">
                    <v-flex xs12>
                        <div class="headline" style="cursor:pointer;"><v-icon  x-large right dark>file_copy</v-icon>  Cloud Doc</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4 xl4 @click="menuSelection(3)">
              <v-card color="blue-grey darken-1" class="white--text" height="60px">
                <v-container fluid grid-list-lg>
                  <v-layout row class="text-lg-center">
                    <v-flex xs12>
                        <div class="headline" style="cursor:pointer;"><v-icon  x-large right dark>notification_important</v-icon>  Notification</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
           <v-flex xs12 sm6 md4 lg4 xl4 @click="menuSelection(4)">
              <v-card color="blue-grey darken-1" class="white--text" height="60px">
                <v-container fluid grid-list-lg>
                  <v-layout row class="text-lg-center">
                    <v-flex xs12>
                        <div class="headline" style="cursor:pointer;"><v-icon  x-large right dark>event</v-icon>  Appointments</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4 xl4 @click="dialog=!dialog">
              <v-card color="blue-grey darken-1" class="white--text" height="60px">
                <v-container fluid grid-list-lg>
                  <v-layout row class="text-lg-center">
                    <v-flex xs12>
                        <div class="headline" style="cursor:pointer;"><v-icon  x-large right dark>settings</v-icon>  Settings</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4 xl4 @click="menuSelection(5)">
              <v-card color="blue-grey darken-1" class="white--text" height="60px">
                <v-container fluid grid-list-lg>
                  <v-layout row class="text-lg-center">
                    <v-flex xs12>
                        <div class="headline" style="cursor:pointer;"><v-icon  x-large right dark>settings_power</v-icon>  Logout</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

           <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click.native="dialog = false">
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark flat :disabled="!valid" @click="saveSMSGatewayDetails">Save</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-list three-line subheader>
                <v-subheader>SMS Gateway Settings</v-subheader>
                <v-form ref="form" v-model="valid" lazy-validation>
                <v-list-tile avatar>
                  <v-list-tile-action>
                    <v-text-field
                      v-model="smsUsername"
                      :rules="[v => !!v || 'Username is required']"
                      label="Type here"
                      required
                    ></v-text-field>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>SMS Gateway Username</v-list-tile-title>
                    <v-list-tile-sub-title>Enter the username of your SMS gateway</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                  <v-list-tile-action>
                    <v-text-field
                      v-model="smsPassword"
                      :rules="[v => !!v || 'Password is required']"
                      label="Type here"
                      required
                    ></v-text-field>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>SMS Gateway Password</v-list-tile-title>
                    <v-list-tile-sub-title>Enter the password of your SMS gateway</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                  <v-list-tile-action>
                    <v-text-field
                      v-model="senderId"
                      :rules="[v => !!v || 'SenderId is required']"
                      label="Type here"
                      required
                    ></v-text-field>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Enter SMS Sender Id</v-list-tile-title>
                    <v-list-tile-sub-title>Enter the 6 digit sender id from which SMS will be sent</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                </v-form>
              </v-list>
              <v-divider></v-divider>
             
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
        </v-container>
        
    </div>
    <app-footer></app-footer>
  </v-app>
</div>
</template>
<script>
import router from '../router'
import axios from './Services/httpClient.js'
export default {
  data () {
    return {
      categoryName: '',
      CompanyName: '',
      dialog: false,
      valid: false,
      smsUsername: '',
      smsPassword: '',
      senderId: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      snackbarText: '',
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
    }
  },
  beforeMount () {
    this.CompanyName = localStorage.getItem('CompanyName')
  },
  methods: {
    menuSelection: (id) => {
      if (id === 1) {
        this.categoryName = 'General Category'
        router.push({name: 'Home', params: {categoryName: this.categoryName}})
      } else if (id === 2) {
        this.categoryName = 'Store Doc'
        router.push({name: 'CloudDoc', params: {categoryName: this.categoryName}})
      } else if (id === 3) {
        this.categoryName = 'Notification'
        router.push({name: 'Notification', params: {categoryName: this.categoryName}})
      } else if (id === 4) {
        this.categoryName = 'Appointments'
        router.push({name: 'Appointment', params: {categoryName: this.categoryName}})
      } else if (id === 5) {
        localStorage.clear()
        this.categoryName = 'Login'
        router.push({name: 'Login', params: {categoryName: this.categoryName}})
      }
    },
    saveSMSGatewayDetails () {
      axios.saveSMSGatewayDetails(this.smsUsername, this.smsPassword, this.senderId).then((data) => {
        console.log(data)
        this.snackbar = true
        this.snackbarText = data
        this.dialog = false
      })
    }
  }
}
</script>
<style>

</style>
