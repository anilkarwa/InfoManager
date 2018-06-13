<template>
<div id="app">
  <v-app id="inspire">
    <div>
      <v-toolbar color="blue darken-1">
        <v-toolbar-title class="white--text">{{CompanyName}} - Notification</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/appointments"><v-icon>event</v-icon></router-link>
        <router-link to="/menu"><v-icon>home</v-icon></router-link>
      </v-toolbar>
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout row wrap>
            <v-flex xs12 sm10 md4 lg4 xl4 v-for="notify in Notifications" :key="notify.NotificationTitle">
              <v-card color="blue-grey darken-2" class="white--text">
                <v-card-title primary-title>
                  <div class="headline">{{notify.NotificationTitle}} </div>
                  <div> {{notify.NotificationText}}</div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </div>
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
    
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>New Notification</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="dialog = false">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
            <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Title" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Message" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-menu
                    :close-on-content-click="false"
                    v-model="menu"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px">
                    <v-text-field
                      slot="activator"
                      v-model="date"
                      label="Date"
                      persistent-hint
                      prepend-icon="event"
                      readonly>
                    </v-text-field>
                    <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12>
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    v-model="menu2"
                    :nudge-right="40"
                    :return-value.sync="time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px">
                    <v-text-field
                      slot="activator"
                      v-model="time"
                      label="Time"
                      prepend-icon="access_time"
                      readonly>
                    </v-text-field>
                    <v-time-picker v-model="time" @change="$refs.menu.save(time)"></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
        
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
      CompanyName: '',
      Notifications: [],
      dialog: false,
      date: null,
      menu: false,
      menu2: false,
      time: null
    }
  },
  props: {
    source: String
  },
  beforeMount () {
    this.CompanyName = localStorage.getItem('CompanyName')
    this.getAllNotificationList()
  },
  methods: {
    getAllNotificationList () {
      axios.getNotificationList().then((data) => {
        data.forEach(element => {
          this.Notifications.push({ NotificationTitle: element.NotificationTitle, NotificationText: element.NotificationText })
        })
      })
    }
  }
}
</script>
<style>

</style>
