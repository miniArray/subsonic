const axios = require('axios')

const API = function ({ username, password, server, application }) {
  const format = 'json'
  const version = '1.14'

  /**
     * get
     *
     * @param {any} path
     * @param {any} query
     * @param {any} cb
     * @returns
     */
  function get (path, query) {
    const params = Object.assign({
      u: username,
      p: password,
      c: application,
      v: version,
      f: format
    }, query)

    return axios.get(`http://${server}/rest/${path}.view`, { params })
      .then(res => res.data['subsonic-response'])
      // .query(typeof query !== 'function' ? query : undefined)
  }

  function getRandomSongs ({ size = 10 }) {
    return get('getRandomSongs', { type: 'random', size })
  }

  return {
    get,
    getRandomSongs
  }
}

module.exports = API
