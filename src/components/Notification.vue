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
            <v-flex xs12 v-for="notify in Notifications" :key="notify">
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
      Notifications: []
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
