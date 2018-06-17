<template>
<div id="login">
  <v-app id="inspire">
    <v-content>
      <v-container style="background-color:  #f5b041 " fluid fill-height>
        <v-layout  align-center justify-center>
          <v-flex xs12 sm8 md4 v-if="login">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>InfoManager Login </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field 
                  v-model="loginDetails.username"
                  id="username"
                  :rules="emailRules"
                  label="Email" required ></v-text-field>
                  <v-text-field 
                  v-model="loginDetails.password"
                  id="password" 
                  type="password"
                  :rules="passwordRules"
                  label="Password" required ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="changeScreen()" v-if="subciptionflag" color="primary">30 days Trial</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="loginUser" color="primary">Login</v-btn>
              </v-card-actions>
              <v-snackbar
                :timeout="snackbarTimeout"
                :color="snackbarColor"
                :multi-line="snackbarMode === 'multi-line'"
                :vertical="snackbarMode === 'vertical'"
                v-model="snackbar" > {{ snackbarText }} <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
              </v-snackbar>
            </v-card>
          </v-flex>
          <v-flex xs12 sm8 md4 v-else>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>To watch our free demo, Signup</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="signupValid" ref="signupform">
                  <v-text-field 
                  v-model="signupDetails.firstName"
                  id="firstName"
                  :rules="firstNameRules"
                  label="First Name" required ></v-text-field>
                  <v-text-field 
                  v-model="signupDetails.lastName"
                  id="lastName" 
                  :rules="lastNameRules"
                  label="Last Name" required ></v-text-field>
                  <v-text-field 
                  v-model="signupDetails.emailId"
                  id="emailId" 
                  :rules="emailIdRules"
                  label="Email" required ></v-text-field>
                  <v-text-field 
                  v-model="signupDetails.phoneNumber"
                  id="Phone" 
                  :rules="phoneNumberRules"
                  label="Phone" required ></v-text-field>
                  <v-text-field 
                  v-model="signupDetails.companyName"
                  id="companyName" 
                  label="Company" ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="changeScreen()" color="primary">Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="signup()" color="primary">SignUp</v-btn>
              </v-card-actions>
              <v-snackbar
                :timeout="snackbarTimeout"
                :color="snackbarColor"
                :multi-line="snackbarMode === 'multi-line'"
                :vertical="snackbarMode === 'vertical'"
                v-model="snackbar" > {{ snackbarText }} <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
              </v-snackbar>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>
<script>
import router from '../router'
import axios from './Services/httpClient.js'
export default {
  data () {
    return {
      valid: false,
      login: true,
      signupValid: false,
      subciptionflag: false,
      signupDetails: {
        firstName: '',
        lastName: '',
        emailId: '',
        phoneNumber: '',
        companyName: ''
      },
      loginDetails: {
        username: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        a => !!a || 'Password is required',
        a => a.length <= 25 || 'Password must be less than 25 characters'
      ],
      firstNameRules: [
        b => !!b || 'First Name is required'
      ],
      lastNameRules: [
        c => !!c || 'Last Name is required'
      ],
      emailIdRules: [
        d => !!d || 'E-mail is required',
        d => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(d) || 'E-mail must be valid'
      ],
      phoneNumberRules: [
        v => !!v || 'Phone number is required',
        v => /^(0|[+91]{3})?[7-9][0-9]{9}$/.test(v) || 'Phone number must be valid'
      ],
      snackbar: false,
      snackbarColor: 'error',
      snackbarMode: 'multi-line',
      snackbarTimeout: 6000,
      snackbarText: '',
      rowCount: 0
    }
  },
  methods: {
    changeScreen () {
      if (this.login) {
        this.login = false
      } else {
        this.login = true
      }
    },
    loginUser () {
      if (this.$refs.form.validate()) {
        const name = this.loginDetails.username
        const password = this.loginDetails.password
        axios.Login(name, password).then((response) => {
          if (!(response === '[]')) {
            response = JSON.parse(response)
            let subciptionDate = new Date(response[0].SubscriptionEndDate)
            let todayDate = new Date()
            if (subciptionDate.toLocaleDateString('en-GB') > todayDate.toLocaleDateString('en-GB')) {
              let object = {value: response[0].DatabaseName, timestamp: new Date().toLocaleDateString('en-GB')}
              localStorage.setItem('loginDate', JSON.stringify(object))
              localStorage.setItem('DatabaseName', response[0].DatabaseName)
              localStorage.setItem('CompanyName', response[0].CompName)
              localStorage.setItem('CompanyId', response[0].Id)
              this.checkRowCount(response[0].DatabaseName, response[0].SubscriptionRows)
            } else {
              console.log('Subcription Over')
              this.subciptionflag = true
              this.snackbarText = 'Subscription over, Please contact at softvent@gmail.com'
              this.snackbar = true
            }
          } else {
            console.log('Invalid Username password')
            this.snackbarText = 'Invalid Credentials'
            this.snackbar = true
          }
        })
      } else {
        this.$refs.form.validate()
      }
    },
    signup () {
      if (this.$refs.signupform.validate()) {
        const firstName = this.signupDetails.firstName
        const lastName = this.signupDetails.lastName
        const email = this.signupDetails.emailId
        const phone = this.signupDetails.phoneNumber
        const company = this.signupDetails.companyName
        axios.demoRequestMail(firstName + ' ' + lastName, email, phone, company).then((data) => {
          this.snackbar = true
          this.snackbarText = data
          this.$refs.signupform.reset()
        })
      } else {
        this.$refs.signupform.validate()
      }
    },
    checkRowCount (database, rows) {
      axios.rowTotalCount(database).then((data) => {
        this.rowCount = data.RowCount
        if (this.rowCount <= rows) {
          router.push({name: 'Menu', params: {resource: 'Test'}})
        } else {
          this.snackbar = true
          this.subciptionflag = true
          this.snackbarText = 'Subscription over, please contact at softvent@gmail.com'
        }
      })
    }
  }
}
</script>
<style>
</style>
