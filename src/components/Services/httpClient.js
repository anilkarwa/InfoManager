import axios from 'axios'

class Axios {
  constructor () {
    this.axios = axios.create()
    this.axios.defaults.timeout = 2500
  }
  Login (name, pass) {
    const url = process.env.API_BASE + '/api/AuthenticateUser?'
    const username = 'username='
    const userpassword = '&password='
    const loginUrl = url.concat(username, name, userpassword, pass)
    return this.axios.get(loginUrl, {
      timeout: 50000
    }).then((Response) => {
      console.log('Response', Response.data)
      return Response.data
    })
  }
  getMainMenu () {
    const databaseName = localStorage.getItem('DatabaseName')
    const mainMenuUrl = process.env.API_BASE + '/api/MainMenu?database=' + databaseName
    return this.axios.get(mainMenuUrl, {timeout: 50000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
  getTableHeader (groupid) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableHeaderUrl = process.env.API_BASE + '/api/TableHeaderData?database=' + databaseName + '&groupid=' + groupid
    return this.axios.get(tableHeaderUrl, {timeout: 50000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
  getTableData (groupid) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/TableData?database=' + databaseName + '&groupid=' + groupid
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
  getTableDataOnQuery (groupid, query) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/TableDataWithQuery?database=' + databaseName + '&groupid=' + groupid + '&query=' + query
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
  getCloudDocCategroies () {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/DocumentCategory?database=' + databaseName
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  getCloudDocuments (categroyid) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/DocumentList?database=' + databaseName + '&categoryid=' + categroyid
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  getNotificationList () {
    const companyId = localStorage.getItem('CompanyId')
    const tableDataUrl = process.env.API_BASE + '/api/Notification?companyid=' + companyId
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  getAppointmentList () {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/Appointment?database=' + databaseName
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  saveNewAppointment (data) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/Appointment?database=' + databaseName
    return this.axios.post(tableDataUrl, data, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  removeAppointment (eventId) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/Appointment?database=' + databaseName + '&eventId=' + eventId
    return this.axios.put(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
}
export default new Axios()
