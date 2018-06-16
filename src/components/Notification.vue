<template>
<div id="app">
  <v-app id="inspire">
    <div>
      <v-toolbar color="blue darken-1">
        <v-toolbar-title class="white--text">{{CompanyName}} - Notification</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/appointments"><v-icon>event</v-icon></router-link>
        <router-link style="margin-left:10px;" to="/menu"><v-icon>home</v-icon></router-link>
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
            <v-toolbar-title>New Notification</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat :disabled="!valid" @click="saveNewNotification">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
            <v-card-text>
            <v-container grid-list-md>
           <v-list two-line subheader>
            <v-subheader>Create New Notification</v-subheader>
             <v-form ref="form" v-model="valid2" lazy-validation>
              <v-layout wrap>
                <v-flex xs12 sm10 md6 lg6>
                  <v-text-field label="Title" v-model="notificationName" :rules="[v => !!v || 'Please enter notification title']" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm10 md6 lg6>
                  <v-text-field label="Message" v-model="notificationDescription" :rules="[v => !!v || 'Please enter notification message']" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm10 md6 lg6>
                  <v-select
                    :items="contactsList"
                    v-model="sentTo"
                    item-text="name"
                    item-value="phone"
                    label="Search Contact"
                    autocomplete
                    cache-items
                    :loading="loading"
                    :rules="[() => sentTo.length > 0 || 'You must choose at least number']"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm10 md6 lg6>
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
                <v-flex xs12 sm10 md6 lg6>
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
             </v-form>
           </v-list>
           <v-list two-line subheader>
            <v-subheader>Create New Contact</v-subheader>
             <v-form ref="form" v-model="valid2" lazy-validation>
               <v-layout wrap>
                <v-flex xs12 sm10 md6 lg6>
                  <v-text-field label="Name" v-model="contactName" :rules="[v => !!v || 'Please enter name']"  required></v-text-field>
                </v-flex>
                <v-flex xs12 sm10 md6 lg6>
                  <v-text-field label="Phone Number" v-model="contactPhone" :rules="phoneRules" :counter="10" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm10 md6 lg6>
                  <v-btn color="blue darken-1" :disabled="!valid2" flat @click="saveNewContact">Save Contact</v-btn>
                </v-flex>
               </v-layout>
             </v-form>
           </v-list>
            </v-container>
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
      time: null,
      valid: true,
      notificationName: '',
      notificationDescription: '',
      sentTo: '',
      contactsList: [],
      contactName: '',
      contactPhone: '',
      loading: false,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      snackbarText: '',
      phoneRules: [
        v => !!v || 'Number is required',
        v => v.length >= 10 || 'Number must be equal to 10 characters',
        v => v.length <= 10 || 'Number must be equal to 10 characters'
      ],
      valid2: true
    }
  },
  props: {
    source: String
  },
  beforeMount () {
    this.CompanyName = localStorage.getItem('CompanyName')
    this.getAllNotificationList()
  },
  mounted () {
    this.getContactsList()
  },
  methods: {
    getAllNotificationList () {
      this.Notifications = []
      axios.getNotificationList().then((data) => {
        data.forEach(element => {
          this.Notifications.push({ NotificationTitle: element.NotificationTitle, NotificationText: element.NotificationText })
        })
      })
    },
    saveNewNotification () {
      let dateTime = this.date + ' ' + this.time
      console.log(dateTime)
      axios.saveNewNotification(this.notificationName, this.notificationDescription, dateTime, this.sentTo).then((data) => {
        this.snackbar = true
        this.snackbarText = data
        this.dialog = false
        this.notificationName = ''
        this.notificationDescription = ''
        this.sentTo = ''
        this.date = null
        this.time = null
        this.getAllNotificationList()
      })
    },
    getContactsList () {
      this.contactsList = []
      this.loading = true
      axios.getContactList().then((data) => {
        data.forEach(element => {
          this.contactsList.push({ Id: element.ContactId, name: element.Name, phone: element.Phone })
        })
        this.loading = false
      })
    },
    saveNewContact () {
      axios.saveNewContact(this.contactName, this.contactPhone).then((data) => {
        this.snackbar = true
        this.snackbarText = data
        this.contactName = ''
        this.contactPhone = ''
        this.getContactsList()
      })
    }
  }
}
</script>
<style>

</style>
