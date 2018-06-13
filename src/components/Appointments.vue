<template>
<div id="app">
 <v-app id="inspire">
    <v-layout row>
      <v-flex xs12 >
        <v-card>
          <v-toolbar color="blue darken-1" dark >
            <v-toolbar-title>Appointment</v-toolbar-title>
            <v-spacer></v-spacer>
        <router-link to="/menu"><v-icon>home</v-icon></router-link>
          </v-toolbar>
              <v-btn
                fab
                bottom
                right
                color="indigo"
                dark
                fixed
                @click.stop="dialog = !dialog"
                style="margin-bottom:22px"
                >
                <v-icon>add</v-icon>
                </v-btn>
          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-list-tile :key="index" avatar ripple @click="OnAppointmentClick(item.EventId)">
                <v-list-tile-content>
                  <v-list-tile-title><b>{{ item.headline }}</b></v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ item.title }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>

                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                  <v-btn icon color="primary" style="z-index:100" @click="onAppointmentClear(item.EventId)" >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
     <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

        <v-card>
          <v-toolbar dark color="primary" fixed>
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Appointment</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat :disabled="!valid" @click="saveNewAppointment">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
         <v-form ref="form" v-model="valid" lazy-validation>
          <v-list three-line subheader>
            <v-subheader>Date & Time</v-subheader>
            <br/>
            <!-- Appointment Date picker  -->
           
            <v-flex xs11 sm5>
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
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="event"
                        @blur="date = parseDate(dateFormatted)"
                      ></v-text-field>
                      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
              <v-flex xs11 sm5>
                <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time"
                persistent
                lazy
                full-width
                width="290px"
                >
                <v-text-field
                    slot="activator"
                    v-model="time"
                    label="Picker in dialog"
                    prepend-icon="access_time"
                    readonly
                    required
                    :rules="[v => !!v || 'Please select event time']"
                ></v-text-field>
                <v-time-picker v-model="time" actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                </v-time-picker>
                </v-dialog>
            </v-flex>
          </v-list>
          <v-divider></v-divider>
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex xs12>
                    <v-text-field v-model="EventName" hint="Enter Event Name" box label="Event Name"
                    required
                    :rules="[v => !!v || 'Please enter event name']"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                    <v-text-field box v-model="EventDescription" multi-line hint="Enter Event Description" label="Event Description"></v-text-field>
                    </v-flex>
                    <v-flex xs12 >
                    <v-text-field v-model="Remark1" hint="Enter Remark 1" box label="Remark 1"></v-text-field>
                    </v-flex>
                    <v-flex xs12 >
                    <v-text-field v-model="Remark2" hint="Enter Remark 1" box label="Remark 2"></v-text-field>
                    </v-flex>
                    <v-flex xs12 >
                    <v-text-field v-model="Remark3"  hint="Enter Remark 1" box label="Remark 3"></v-text-field>
                    </v-flex>
                </v-layout>
                </v-container>
          </v-form>
        </v-card>
      </v-dialog>

      <v-dialog v-model="rowdialog" scrollable persistent max-width="300px">
        <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-list two-line>
                   <template>
                     <v-list-tile >
                      <v-list-tile-content >
                        <v-list-tile-title>EventName</v-list-tile-title>
                        <v-list-tile-sub-title v-html="selectedEvent.headline"></v-list-tile-sub-title>
                        </v-list-tile-content>
                     </v-list-tile>
                      <v-list-tile >
                      <v-list-tile-content >
                        <v-list-tile-title >EventTime</v-list-tile-title>
                        <v-list-tile-sub-title v-html="selectedEvent.action"></v-list-tile-sub-title>
                        </v-list-tile-content>
                     </v-list-tile>
                      <v-list-tile >
                      <v-list-tile-content >
                        <v-list-tile-title >Description</v-list-tile-title>
                        <v-list-tile-sub-title v-html="selectedEvent.title"></v-list-tile-sub-title>
                        </v-list-tile-content>
                     </v-list-tile>
                      <v-list-tile >
                      <v-list-tile-content >
                        <v-list-tile-title >Remark1</v-list-tile-title>
                        <v-list-tile-sub-title v-html="selectedEvent.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>
                     </v-list-tile>
                      <v-list-tile >
                      <v-list-tile-content >
                        <v-list-tile-title >Remark2</v-list-tile-title>
                        <v-list-tile-sub-title v-html="selectedEvent.subtitle2"></v-list-tile-sub-title>
                        </v-list-tile-content>
                     </v-list-tile>
                      <v-list-tile >
                      <v-list-tile-content >
                        <v-list-tile-title >Remark3</v-list-tile-title>
                        <v-list-tile-sub-title v-html="selectedEvent.subtitle3"></v-list-tile-sub-title>
                        </v-list-tile-content>
                     </v-list-tile>
                   </template>
                </v-list>
              </v-layout>
            </v-container>
          </v-card-text>
           <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="rowdialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </v-app>
</div>
</template>
<script>
import axios from './Services/httpClient.js'
export default {
  data () {
    return {
      items: [],
      dialog: false,
      date: null,
      dateFormatted: null,
      modal: false,
      time: null,
      modal2: false,
      rowdialog: false,
      menu1: false,
      valid: true,
      prevent: false,
      selectedEvent: [],
      EventName: '',
      EventDescription: '',
      Remark1: '',
      Remark2: '',
      Remark3: ''
    }
  },
  props: {
    source: String
  },
  beforeMount () {
    this.getAppointments()
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

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    getAppointments () {
      this.items = []
      axios.getAppointmentList().then((data) => {
        data.forEach(element => {
          this.items.push({action: element.EventTime, headline: element.EventName, title: element.Description, subtitle: element.Remark1, subtitle2: element.Remark2, subtitle3: element.Remark3, EventId: element.EventId})
        })
      })
    },
    saveNewAppointment () {
      const validDate = this.parseDate(this.dateFormatted)
      let appointmentData = { EventName: this.EventName, Description: this.EventDescription, Remark1: this.Remark1, Remark2: this.Remark2, Remark3: this.Remark3, EventTime: validDate + ' ' + this.time }
      axios.saveNewAppointment(appointmentData).then((data) => {
        console.log(data)
        this.getAppointments()
      })
      this.dialog = false
    },
    OnAppointmentClick (eventid) {
      this.selectedEvent = []
      if (!this.prevent) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].EventId === eventid) {
            this.selectedEvent = this.items[i]
            console.log(JSON.stringify(this.selectedEvent))
            console.log(this.selectedEvent.headline)
          }
        }
        this.rowdialog = true
      }
    },
    onAppointmentClear (eventid) {
      this.prevent = true
      axios.removeAppointment(eventid).then((data) => {
        console.log(data)
        this.prevent = false
        this.getAppointments()
      })
    }
  }
}
</script>
<style>

</style>
