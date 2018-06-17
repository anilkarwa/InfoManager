<template>
<div id="app">
  <v-app id="inspire">
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>Contacts</v-toolbar-title>
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
                    style="margin-left:2%"
                    @input="filterContact(search)">
                  </v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list two-line>
            <v-subheader>Contacts</v-subheader>
            <template v-for="(contact, index) in contacts">
              <v-list-tile avatar :key="contact.Name">
                <v-list-tile-avatar>
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE5OC40OTYgMTk4LjQ5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTk4LjQ5NiAxOTguNDk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cmVjdCB4PSI4NC41NSIgeT0iMTQ4LjIzMSIgc3R5bGU9ImZpbGw6I0ZEQ0M5QjsiIHdpZHRoPSIyOS4zOTUiIGhlaWdodD0iMzIuOTIyIi8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZDQkM4NTsiIGQ9Ik04NC41NTEsMTUyLjEwOGMwLDAsMTIuMzY1LDcuODc0LDI5LjM5NSw2LjA1di05LjkyOEg4NC41NTFWMTUyLjEwOHoiLz4KCQk8ZWxsaXBzZSBzdHlsZT0iZmlsbDojRkNCQzg1OyIgY3g9IjQyLjE2NCIgY3k9Ijk3LjE4MSIgcng9IjE0LjM0MyIgcnk9IjE2LjM2NCIvPgoJCTxlbGxpcHNlIHN0eWxlPSJmaWxsOiNGQ0JDODU7IiBjeD0iMTU2LjMzMiIgY3k9Ijk3LjE4MSIgcng9IjE0LjM0MyIgcnk9IjE2LjM2NCIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRENDOUI7IiBkPSJNMTU2LjI3NCw2NS45MjVjMC0yNC4xMDMtMTcuNjM3LTQxLjc0MS01Ny4wMjYtNDEuNzQxYy0zOS4zODksMC01Ny4wMjYsMTcuNjM3LTU3LjAyNiw0MS43NDEgICAgYzAsMjQuMTA0LTQuMTE1LDg3LjU5Nyw1Ny4wMjYsODcuNTk3QzE2MC4zODksMTUzLjUyMiwxNTYuMjc0LDkwLjAyOSwxNTYuMjc0LDY1LjkyNXoiLz4KCQk8Zz4KCQkJPGc+CgkJCQk8ZWxsaXBzZSBzdHlsZT0iZmlsbDojM0IyNTE5OyIgY3g9IjcxLjQ3MiIgY3k9IjkzLjI2MiIgcng9IjYuMTczIiByeT0iNi43NjEiLz4KCQkJCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSI2OC43ODEiIGN5PSI5MC4yNzciIHI9IjEuODQ2Ii8+CgkJCTwvZz4KCQkJPHBhdGggc3R5bGU9ImZpbGw6IzUxMzYyQTsiIGQ9Ik02MS41OTcsNzYuNTA3YzIuOTE5LDEuNDYsNy42MDYtNC45NiwxOC4zMzUsMC42MjVjMS45NTYsMS4wMTgsMy4xMjMtOC43MDgtOC4zNzctOC43MDggICAgIEM2MS41OTcsNjguNDI0LDU5LjgzMyw3NS42MjYsNjEuNTk3LDc2LjUwN3oiLz4KCQkJPGc+CgkJCQk8ZWxsaXBzZSBzdHlsZT0iZmlsbDojM0IyNTE5OyIgY3g9IjEyNy43ODYiIGN5PSI5My4yNjIiIHJ4PSI2LjE3MyIgcnk9IjYuNzYxIi8+CgkJCQk8Y2lyY2xlIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBjeD0iMTI1LjA5NSIgY3k9IjkwLjI3NyIgcj0iMS44NDYiLz4KCQkJPC9nPgoJCQk8cGF0aCBzdHlsZT0iZmlsbDojNTEzNjJBOyIgZD0iTTEzNi44OTksNzYuNTA3Yy0yLjkxOSwxLjQ2LTcuNjA2LTQuOTYtMTguMzM1LDAuNjI1Yy0xLjk1NiwxLjAxOC0zLjEyMy04LjcwOCw4LjM3OC04LjcwOCAgICAgQzEzNi44OTksNjguNDI0LDEzOC42NjIsNzUuNjI2LDEzNi44OTksNzYuNTA3eiIvPgoJCTwvZz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkNCQzg1OyIgZD0iTTk5LjI0OCwxMTcuMDQzYy02LjEsMC05Ljc3NC00LjU1Ni05Ljc3NC0yLjM1MmMwLDIuMjA1LDEuNzY0LDYuMzk0LDkuNzc0LDYuMzk0ICAgIGM4LjAxLDAsOS43NzQtNC4xODksOS43NzQtNi4zOTRDMTA5LjAyMiwxMTIuNDg2LDEwNS4zNDcsMTE3LjA0Myw5OS4yNDgsMTE3LjA0M3oiLz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkNCQzg1OyIgZD0iTTk5LjI0OCwxMzcuMzEzYy0yLjExLDAtMy4zODEtMS41NzYtMy4zODEtMC44MTNzMC42MSwyLjIxMSwzLjM4MSwyLjIxMSAgICBjMi43NzEsMCwzLjM4LTEuNDQ4LDMuMzgtMi4yMTFTMTAxLjM1NywxMzcuMzEzLDk5LjI0OCwxMzcuMzEzeiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGNzk0NUU7IiBkPSJNOTkuMjQ4LDEzMS42OTZjLTkuNjY4LDAtMTUuNDkzLTMuOTM3LTE1LjQ5My0yLjkzOWMwLDAuOTk4LDIuNzk2LDQuOTI0LDE1LjQ5Myw0LjkyNCAgICBjMTIuNjk3LDAsMTUuNDkzLTMuOTI2LDE1LjQ5My00LjkyNEMxMTQuNzQsMTI3Ljc1OSwxMDguOTE2LDEzMS42OTYsOTkuMjQ4LDEzMS42OTZ6Ii8+Cgk8L2c+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRjc5NDFFOyIgZD0iTTk5LjI0OCwxNjEuNDU4djM3LjAzOEgyNy44MjFDMjcuODIxLDE4My41MDQsNjUuNDQ0LDE2MS40NTgsOTkuMjQ4LDE2MS40NTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRjc5NDFFOyIgZD0iTTk5LjI0OCwxNjEuNDU4djM3LjAzOGg3MS40MjdDMTcwLjY3NSwxODMuNTA0LDEzMy4wNTIsMTYxLjQ1OCw5OS4yNDgsMTYxLjQ1OHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGMzZDMjE7IiBkPSJNOTkuMjQ4LDE2MS40NThjLTcuMTksMC0xNC41NTIsMS4wMDUtMjEuNjg5LDIuNzJjMC4wNDgsMC4wNjMsNy45MTYsMTAuMjE0LDIxLjY4OSwxMC4yMTQgICBjMTIuNzU0LDAsMjEuMjMzLTguNjkzLDIyLjQ2Mi0xMC4wM0MxMTQuMzMyLDE2Mi41MzEsMTA2LjY5OCwxNjEuNDU4LDk5LjI0OCwxNjEuNDU4eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZEQ0M5QjsiIGQ9Ik04NC41NSwxNjIuNzRjMCwwLDQuMjk5LDUuMzMyLDE0LjY5Nyw1LjMzMmMxMC4zOTgsMCwxNC42OTgtNS4zMzIsMTQuNjk4LTUuMzMyICAgUzk4LjY5NywxNTcuMTg5LDg0LjU1LDE2Mi43NHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM1MTM2MkE7IiBkPSJNMTQ2LjEzMiwxOS4wNDFjMCwwLTIxLjE2NC0yNi44OTYtNjUuMTUyLTE2Ljc1NUMzNi45OTMsMTIuNDI2LDMzLjY5NywzOC44ODIsMzUuMDIsNjQuNjIxICAgYzEuMzIzLDI1Ljc0LDQuODUsNDAuODQsOS4wMjIsMzguOTc0YzQuMTcyLTEuODY3LDIuMDAxLTE4Ljg1NywyLjQ0Mi0yMi43NzhjMC40NDEtMy45MjEsNC40MDktMjEuNjUzLDMxLjE2Mi0xOS4wMDcgICBjMjYuNzUyLDIuNjQ2LDQ5LjI5Ni03LjA1NSw0OS4yOTYtNy4wNTVzOS4wNzUsMTEuNDcxLDE1LjA0NywxMy42NjljMTEuOTM0LDQuMzkxLDguMDIsMzMuNjcsMTIuNjk2LDMzLjY3ICAgUzE4Mi4yODgsMzQuNDczLDE0Ni4xMzIsMTkuMDQxeiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ contact.Name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ contact.Phone }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn fab dark small color="green" @click="editContact(contact.ContactId,contact.Name,contact.Phone)">
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn fab dark small color="red" @click="askForPermission(contact.ContactId)">
                    <v-icon dark>remove</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < contacts.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
     <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px" :search="search">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Contact</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editContacts.name" label="Contact Name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editContacts.number" label="Contact Number" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="updateContact(editContacts.id,editContacts.name,editContacts.number)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="conformDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Delete User Contact</v-card-title>
          <v-card-text>Are you sure to delete this contact ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="conformDialog = false">Disagree</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="deleteUpdate()">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        <v-snackbar
          :timeout="timeout"
          :top="'top'"
          v-model="snackbar"
          :color="'green'"
          >
          {{snackbarText}}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-layout>
  </v-app>
</div>
</template>
<script>
import axios from './Services/httpClient.js'
export default {
  data () {
    return {
      dialog: false,
      conformDialog: false,
      search: '',
      contacts: [],
      editContacts: {
        id: '',
        name: '',
        number: ''
      },
      timeout: 3000,
      snackbar: false,
      snackbarText: ''
    }
  },
  beforeMount () {
    this.getContacts()
  },
  methods: {
    getContacts () {
      axios.getContacts().then((r) => {
        this.contacts = r
      })
    },
    editContact (id, name, number) {
      this.editContacts.id = id
      this.editContacts.name = name
      this.editContacts.number = number
      this.dialog = true
    },
    updateContact (id, name, number) {
      if (id && name && number) {
        axios.updateContact(id, name, number).then((response) => {
          this.snackbarText = 'Contact Updated Successfully'
          this.snackbar = true
          this.dialog = false
          this.getContacts()
        })
      }
    },
    askForPermission (id) {
      this.editContacts.id = id
      this.conformDialog = true
    },
    deleteUpdate () {
      const contactId = this.editContacts.id
      if (contactId) {
        axios.deleteContact(contactId).then((response) => {
          this.snackbarText = 'Contact Deleted Successfully'
          this.snackbar = true
          this.conformDialog = false
          this.getContacts()
        })
      }
    },
    filterContact (Value) {
      axios.filterContact(Value).then((response) => {
        this.contacts = response
      })
    }
  }
}
</script>
<style>

</style>
