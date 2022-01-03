import axios from 'axios'

// axios.defaults.baseURL = 'http://admx.topiputih.id/public/api/';
axios.defaults.baseURL = 'http://budiy.site/public/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');