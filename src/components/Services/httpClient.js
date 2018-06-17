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
  saveNewCloudDoc (formData) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/SaveCloudDOc?database=' + databaseName
    return this.axios.post(tableDataUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 50000
    }).then((Response) => {
      return Response.data
    })
  }
  createCloudCategory (categoryName) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/CreateCloudDocCategory?database=' + databaseName + '&categoryName=' + categoryName
    return this.axios.post(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  saveNewNotification (notificationName, notificationText, notificationDateTime, sendTo) {
    const companyId = localStorage.getItem('CompanyId')
    const tableDataUrl = process.env.API_BASE + '/api/Notification?companyid=' + companyId + '&notificationType=SMS&notificationTitle=' + notificationName + '&notificationText=' + notificationText + '&notificationDateTime=' + notificationDateTime + '&sendTo=' + sendTo
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  getContactList () {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/Contacts?database=' + databaseName
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  saveNewContact (contactName, contactPhone) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = process.env.API_BASE + '/api/Contacts?database=' + databaseName + '&contactName=' + contactName + '&contactPhone=91' + contactPhone
    return this.axios.post(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  saveSMSGatewayDetails (username, password, senderid) {
    const companyId = localStorage.getItem('CompanyId')
    const tableDataUrl = process.env.API_BASE + '/api/SMSGateway?username=' + username + '&password=' + password + '&senderid=' + senderid + '&companyid=' + companyId
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  removeNotification (notificationId) {
    const companyId = localStorage.getItem('CompanyId')
    const tableDataUrl = process.env.API_BASE + '/api/Notification?companyid=' + companyId + '&notificationId=' + notificationId
    return this.axios.put(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  getContacts () {
    const databaseName = localStorage.getItem('DatabaseName')
    const getContactUrl = process.env.API_BASE + '/api/Contacts?database=' + databaseName
    return this.axios.get(getContactUrl, {timeout: 50000})
      .then((Response) => {
        return Response.data
      })
  }
  updateContact (id, name, number) {
    const databaseName = localStorage.getItem('DatabaseName')
    const contactId = id
    const contactName = name
    const contactNumber = number
    if (contactId && contactName && contactNumber) {
      const updateContactUrl = process.env.API_BASE + '/api/Contacts?database=' + databaseName + '&contactname=' + contactName + '&contactphone=' + contactNumber + '&contactid=' + contactId
      return this.axios.put(updateContactUrl, {timeout: 50000})
        .then((Response) => {
          return Response.data
        })
    }
  }
  deleteContact (id) {
    const contactId = id
    const databaseName = localStorage.getItem('DatabaseName')
    const deleteContactUrl = process.env.API_BASE + '/api/Contacts?database=' + databaseName + '&contactid=' + contactId
    return this.axios.put(deleteContactUrl, {timeout: 5000})
      .then((Response) => {
        return Response.data
      })
  }
  filterContact (value) {
    const filterValue = value
    const databaseName = localStorage.getItem('DatabaseName')
    const filterContactUrl = process.env.API_BASE + '/api/Contacts?database=' + databaseName + '&term=' + filterValue
    return this.axios.get(filterContactUrl, {timeout: 5000})
      .then((Response) => {
        return Response.data
      })
  }
}
export default new Axios()
