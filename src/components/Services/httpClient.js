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
      timeout: 5000
    }).then((Response) => {
      console.log('Response', Response.data)
      return Response.data
    })
  }
  getMainMenu () {
    const mainMenuUrl = 'http://47.23.106.203/InfoManager/api/MainMenu?database=InfoManager'
    return this.axios.get(mainMenuUrl, {timeout: 5000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
  getTableHeader () {
    const tableHeaderUrl = 'http://47.23.106.203/InfoManager/api/TableHeaderData?database=InfoManager&groupid=2'
    return this.axios.get(tableHeaderUrl, {timeout: 5000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
  getTableData () {
    const tableDataUrl = 'http://47.23.106.203/InfoManager/api/TableData?database=InfoManager&groupid=2'
    return this.axios.get(tableDataUrl, {timeout: 5000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
  getTableDataOnQuery (query) {
    const tableDataUrl = 'http://47.23.106.203/InfoManager/api/TableDataWithQuery?database=InfoManager&groupid=2&query=' + query
    return this.axios.get(tableDataUrl, {timeout: 5000})
      .then((Response) => {
        return JSON.parse(Response.data)
      })
  }
}

export default new Axios()
