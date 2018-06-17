<template>
<div id="app">
  <v-app id="inspire">
    <div>
        <v-toolbar
            color="blue darken-1"
            dark
            app
            :clipped-left="$vuetify.breakpoint.mdAndUp"
            fixed
          >
            <v-toolbar-title style="width: 24%" class="ml-0 pl-3">
              <span class="hidden-sm-and-down">Notifications</span>
            </v-toolbar-title>
            <v-text-field
              flat
              solo-inverted
              prepend-icon="search"
              label="Search"
              v-model="search"
              v-on:input="searchNotification"              
              single-line
              hide-details
            ></v-text-field>
            <span> &nbsp;Total({{totalData}})</span>
              <router-link style="margin-left:10px;" to="/menu"><v-icon>home</v-icon></router-link>
          </v-toolbar>
      <v-list three-line style="margin-top:60px">
        <template v-for="(notify, index) in Notifications">
          <v-list-tile :key="index" avatar ripple @click="openNotification(notify.NotificationId)">
            <v-list-tile-content>
              <v-list-tile-title><b>{{ notify.NotificationTitle }}</b></v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ notify.NotificationText }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ notify.SendTo }}</v-list-tile-sub-title>

            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>{{ notify.NotificationDateTime }}</v-list-tile-action-text>
              <v-btn icon color="primary"  @click="dialog3 = true; prevent = true; selectedNotification = notify.NotificationId" >
                <v-icon>close</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index + 1 < Notifications.length" :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </div>
    <v-btn
      fab
      bottom
      right
      color="indigo"
      dark
      fixed
      @click.stop="dialog = !dialog"
      style="margin-bottom:22px; z-index:100">
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn
      fab
      bottom
      right
      color="indigo"
      dark
      fixed
      @click="gotoContacts"
      style="margin-right:17%;margin-bottom:22px"
    >
      <v-icon>perm_contact_calendar</v-icon>
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
                      ref="menu1"
                      :close-on-content-click="false"
                      v-model="menu1"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="dateFormatted"
                        label="Date"
                        hint="DD/MM/YYYY format"
                        persistent-hint
                        prepend-icon="event"
                        @blur="date = parseDate(dateFormatted)"
                      ></v-text-field>
                      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
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
     <v-dialog v-model="dialog2" scrollable max-width="300px">
        <v-card>
          <v-card-text style="height: 300px;">
           <v-container grid-list-md>
              <v-layout wrap>
                <v-list three-line>
                   <template>
                     <v-list-tile >
                      <v-list-tile-content >
                        <v-list-tile-title>Title</v-list-tile-title>
                        <v-list-tile-sub-title v-html="selectedEvent.NotificationTitle"></v-list-tile-sub-title>
                        </v-list-tile-content>
                     </v-list-tile>
                      <v-list-tile >
                      <v-list-tile-content >
                        <v-list-tile-title >Text</v-list-tile-title>
                        <v-list-tile-sub-title v-html="selectedEvent.NotificationText"></v-list-tile-sub-title>
                        </v-list-tile-content>
                     </v-list-tile>
                      <v-list-tile >
                      <v-list-tile-content >
                        <v-list-tile-title >Date & Time</v-list-tile-title>
                        <v-list-tile-sub-title v-html="selectedEvent.NotificationDateTime"></v-list-tile-sub-title>
                        </v-list-tile-content>
                     </v-list-tile>
                      <v-list-tile >
                      <v-list-tile-content >
                        <v-list-tile-title >Send To</v-list-tile-title>
                        <v-list-tile-sub-title v-html="selectedContactName"></v-list-tile-sub-title>
                        </v-list-tile-content>
                     </v-list-tile>

                   </template>
                </v-list>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" flat @click.native="dialog2 = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-dialog v-model="dialog3" max-width="290">
        <v-card>
          <v-card-title class="headline">Delete Appointment?</v-card-title>
          <v-card-text>Are you sure, you want to delete this appointment!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="dialog3 = false; prevent= false">No,Cancel</v-btn>
            <v-btn color="red darken-1" flat="flat" @click="deleteNotification(selectedNotification)">Yes,Delete</v-btn>
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
import router from '../router'
export default {
  data () {
    return {
      CompanyName: '',
      Notifications: [],
      dialog: false,
      dialog2: false,
      dialog3: false,
      search: '',
      totalData: 0,
      menu1: false,
      date: null,
      dateFormatted: null,
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
      prevent: false,
      snackbar: false,
      selectedContactName: '',
      selectedNotification: '',
      selectedEvent: [],
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
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    getAllNotificationList () {
      this.Notifications = []
      axios.getNotificationList().then((data) => {
        data.forEach(element => {
          this.Notifications.push({ NotificationId: element.NotificationId, NotificationTitle: element.NotificationTitle, NotificationText: element.NotificationText, NotificationDateTime: element.NotifyDateTime, SendTo: element.SendTo })
        })
        this.totalData = this.Notifications.length
      })
    },
    saveNewNotification () {
      const validDate = this.parseDate(this.dateFormatted)
      axios.saveNewNotification(this.notificationName, this.notificationDescription, validDate + ' ' + this.time, this.sentTo).then((data) => {
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
    },
    openNotification (notifyid) {
      if (!this.prevent) {
        this.selectedEvent = this.Notifications.find(e => e.NotificationId === notifyid)
        this.selectedContactName = this.contactsList.find(e => e.phone === this.selectedEvent.SendTo).name
        this.dialog2 = true
      }
    },
    deleteNotification (notifyid) {
      this.prevent = true
      axios.removeNotification(notifyid).then((data) => {
        this.snackbar = true
        this.snackbarText = data
        this.prevent = false
        this.dialog3 = false
        this.getAllNotificationList()
      })
    },
    gotoContacts () {
      router.push({name: 'Contacts'})
    },
    searchNotification () {
      axios.searchNotification(this.search).then((data) => {
        this.Notifications = []
        data.forEach(element => {
          this.Notifications.push({ NotificationId: element.NotificationId, NotificationTitle: element.NotificationTitle, NotificationText: element.NotificationText, NotificationDateTime: element.NotifyDateTime, SendTo: element.SendTo })
        })
        this.totalData = this.Notifications.length
      })
    }
  }
}
</script>
<style>

</style>
