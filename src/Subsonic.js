const { ungroupCollection } = require('./utils')
const axios = require('axios')

// Subsonic
//
// @param  {object} config username, password, server are all required (application, format, and version optional)
// @return {Subsonic} this
const Subsonic = function ({ username, password, server, application = 'subsonic node.js api' }) {
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

  // http://your-server/rest/ping.view
  /**
   * ping
   *
   * @param {any} cb
   * @returns {Promise}
   */
  function ping (cb) {
    return get('ping')
  }

  // http://your-server/rest/getMusicFolders.view
  //
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function topLevelFolders (cb) {
    return get('getMusicFolders', res => cb(null, res.musicFolders.musicFolder))
  }

  // http://your-server/rest/getIndexes.view
  //
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function indexes (cb) {
    return get('getIndexes', res => cb(null, res.indexes.index))
  }

  // http://your-server/rest/getMusicDirectory.view
  //
  // @param  {number} id
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function folder (id, cb) {
    return get('getMusicDirectory', {
      id
    }, res => cb(null, {
      children: (res.directory != null ? res.directory.child : undefined),
      id: (res.directory != null ? res.directory.id : undefined),
      name: (res.directory != null ? res.directory.name : undefined)
    }))
  }

  // http://your-server/rest/getArtists.view
  //
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function artists ({ group = false }) {
    function modify (artists) {
      return group ? Object.assign(artists, {
        index: ungroupCollection(artists)
      }) : artists
    }

    return get('getArtists')
      .then(res => res.artists)
      .then(modify)
  }

  // http://your-server/rest/getArtist.view
  //
  // @param  {number} id
  // @return {Promise} this
  function artist (id) {
    return get('getArtistInfo2', {
      id
    }).then(res => res.artistInfo2)
  }

  // http://your-server/rest/getAlbum.view
  //
  // @param  {number} id
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function album (id, cb) {
    return get('getAlbum', {
      id
    })
  }

  // http://your-server/rest/getSong.view
  //
  // @param  {number} id
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function song (id) {
    return get('getSong', {
      id
    })
  }

  return {
    ping,
    topLevelFolders,
    indexes,
    folder,
    artists,
    artist,
    album,
    song
  }
}

module.exports = Subsonic
