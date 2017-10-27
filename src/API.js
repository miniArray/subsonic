const axios = require('axios')
const { removeUndefined } = require('./utils')

const API = function ({ username, password, server, application }) {
  const format = 'json'
  const version = '1.14'

  function url (path, query) {
    const qs = require('querystring')

    query = removeUndefined(query)
    console.log(query)
    const params = Object.assign({
      u: username,
      p: password,
      c: application,
      v: version,
      f: format
    }, query)

    return `http://${server}/rest/${path}.view?${qs.stringify(params)}`
  }

  /**
     * get
     *
     * @param {any} path
     * @param {any} query
     * @param {any} cb
     * @returns
     */
  function get (path, query) {
    return axios.get(url(path, query))
      .then(res => res.data['subsonic-response'])
      // .query(typeof query !== 'function' ? query : undefined)
  }

  function getCoverArt (id, { size, contents }) {
    if (contents) return get('getCoverArt', { id, size })

    return url('getCoverArt', { id, size })
  }

  function getRandomSongs ({ size = 10 }) {
    return get('getRandomSongs', { type: 'random', size })
  }

  return {
    get,
    getRandomSongs,
    getCoverArt
  }
}

module.exports = API
