<template>
<div id="app">
 <v-app id="inspire">
    <v-layout row>
      <v-flex xs12 lg12 >
        <v-card>
          <v-toolbar color="blue darken-1" dark >
            <v-toolbar-title>Appointment</v-toolbar-title>
            <v-spacer></v-spacer>

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
              <v-list-tile :key="index" avatar ripple @click="">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>

                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                  <v-icon color="grey lighten-1">star_border</v-icon>
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
              <v-btn dark flat :disabled="!valid" @click.native="dialog = false">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
         <v-form ref="form" v-model="valid" lazy-validation>
          <v-list three-line subheader>
            <v-subheader>Date & Time</v-subheader>
            <br/>
            <!-- Appointment Date picker  -->
           
            <v-flex xs11 sm5>
                    <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    lazy
                    full-width
                    width="290px"
                    >
                   <v-text-field
                    slot="activator"
                    v-model="dateFormatted"
                    label="Date"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    prepend-icon="event"
                    @blur="date = parseDate(dateFormatted)"
                    readonly
                    required
                    :rules="[v => !!v || 'Please select event date']"
                    ></v-text-field>
                    <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                    </v-dialog>
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
  </v-app>
</div>
</template>
<script>
export default {
  data () {
    return {
      items: [
        { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' }
      ],
      dialog: false,
      date: null,
      dateFormatted: null,
      modal: false,
      time: null,
      modal2: false,
      valid: true,
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
    }
  }
}
</script>
<style>

</style>
