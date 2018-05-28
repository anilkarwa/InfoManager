import axios from 'axios'

class Axios {
  constructor () {
    this.axios = axios.create()
    this.axios.defaults.timeout = 2500
  }
  Login (name, pass) {
    const url = 'http://47.23.106.203/InfoManager/api/AuthenticateUser?'
    const username = 'username='
    const userpassword = '&password='
    // console.log('HTTP - name', name)
    // console.log('HTTP - password', pass)
    // console.log('HTTP - url before', name)
    const loginUrl = url.concat(username, name, userpassword, pass)
    // console.log('final URL', finalUrl)
    return this.axios.get(loginUrl, {
      timeout: 50000
    }).then((Response) => {
      console.log('Response', Response.data)
      return Response.data
    })
  }
  getMainMenu () {
    const databaseName = localStorage.getItem('DatabaseName')
    const mainMenuUrl = 'http://47.23.106.203/InfoManager/api/MainMenu?database=' + databaseName
    return this.axios.get(mainMenuUrl, {timeout: 50000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
  getTableHeader (groupid) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableHeaderUrl = 'http://47.23.106.203/InfoManager/api/TableHeaderData?database=' + databaseName + '&groupid=' + groupid
    return this.axios.get(tableHeaderUrl, {timeout: 50000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
  getTableData (groupid) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = 'http://47.23.106.203/InfoManager/api/TableData?database=' + databaseName + '&groupid=' + groupid
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
  getTableDataOnQuery (groupid, query) {
    const databaseName = localStorage.getItem('DatabaseName')
    const tableDataUrl = 'http://47.23.106.203/InfoManager/api/TableDataWithQuery?database=' + databaseName + '&groupid=' + groupid + '&query=' + query
    return this.axios.get(tableDataUrl, {timeout: 50000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
}

export default new Axios()
