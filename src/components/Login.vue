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
                <v-btn @click="changeScreen()" color="primary">30 days Trial</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="login()" color="primary">Login</v-btn>
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
                <v-toolbar-title>To watch our free demos, Signup</v-toolbar-title>
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
                  :rules="companyNameRules"
                  label="Company" required ></v-text-field>
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
        b => !!b || 'First Name is required',
        b => b.length <= 25 || 'First Name must be less than 25 characters'
      ],
      lastNameRules: [
        c => !!c || 'Last Name is required',
        c => c.length <= 25 || 'Last Name must be less than 25 characters'
      ],
      emailIdRules: [
        d => !!d || 'E-mail is required',
        d => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(d) || 'E-mail must be valid'
      ],
      phoneNumberRules: [
        v => !!v || 'Phone number is required',
        v => /^(0|[+91]{3})?[7-9][0-9]{9}$/.test(v) || 'Phone number must be valid'
      ],
      companyNameRules: [
        e => !!e || 'Company name is required',
        e => e.length <= 50 || 'Company name must be less than 50 characters'
      ],
      snackbar: false,
      snackbarColor: 'error',
      snackbarMode: 'multi-line',
      snackbarTimeout: 6000,
      snackbarText: ''
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
    login () {
      if (this.$refs.form.validate()) {
        const name = this.loginDetails.username
        const password = this.loginDetails.password
        axios.Login(name, password).then((response) => {
          console.log('rrrr', response)
          if (!(response === '[]')) {
            response = JSON.parse(response)
            console.log('Response', response[0].DatabaseName)
            localStorage.setItem('DatabaseName', response[0].DatabaseName)
            localStorage.setItem('CompanyName', response[0].CompName)
            localStorage.setItem('CompanyId', response[0].Id)
            router.push({name: 'Menu', params: {resource: 'Test'}})
          } else {
            console.log('Invalid Username password')
            this.snackbarText = 'Invalid Credentials'
            this.snackbar = true
          }
        })
      } else {
        this.$refs.form.validate()
      }
      // const self = this
      // const name = this.loginDetails.username
      // console.log('Name', )
      // console.log('Password', this.passwordRules.v)
      // if (self.name && self.password) {
      //   console.log('Name', self.name)
      //   console.log('Password', self.password)
      //   console.log('COming inside')
      //   axios.Login().then(response => {
      //     console.log('Final response', response.data)
      //   })
      //   // router.push({name: 'Menu', params: {resource: 'Test'}})
      // } else {
      //   console.log('Test Description')
      // }
    },
    signup () {
      if (this.$refs.signupform.validate()) {
        const firstName = this.signupDetails.firstName
        const lastName = this.signupDetails.lastName
        const email = this.signupDetails.emailId
        const phone = this.signupDetails.phoneNumber
        const company = this.signupDetails.companyName
        console.log('First Name', firstName)
        console.log('Last Name', lastName)
        console.log('Email', email)
        console.log('Phone', phone)
        console.log('Company', company)
      } else {
        this.$refs.signupform.validate()
      }
    }
  }
}
</script>
<style>
</style>
