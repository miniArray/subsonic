const { ungroupCollection } = require('./utils')
const API = require('./API')

// Subsonic
//
// @param  {object} config username, password, server are all required (application, format, and version optional)
// @return {Subsonic} this
const Subsonic = function ({ username, password, server, application = 'subsonic node.js api' }) {
  const api = API({username, password, server, application})

  // http://your-server/rest/ping.view
  /**
   * ping
   *
   * @param {any} cb
   * @returns {Promise}
   */
  const ping = (cb) => api.get('ping')

  // http://your-server/rest/getMusicFolders.view
  //
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function topLevelFolders (cb) {
    return api.get('getMusicFolders', res => cb(null, res.musicFolders.musicFolder))
  }

  // http://your-server/rest/getIndexes.view
  //
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function indexes (cb) {
    return api.get('getIndexes', res => cb(null, res.indexes.index))
  }

  // http://your-server/rest/getMusicDirectory.view
  //
  // @param  {number} id
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function folder (id, cb) {
    return api.get('getMusicDirectory', { id }, res => cb(null, {
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

    return api.get('getArtists')
      .then(res => res.artists)
      .then(modify)
  }

  // http://your-server/rest/getArtist.view
  //
  // @param  {number} id
  // @return {Promise} this
  function artist (id) {
    return api.get('getArtistInfo2', { id }).then(res => res.artistInfo2)
  }

  // http://your-server/rest/getAlbum.view
  //
  // @param  {number} id
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function album (id, cb) {
    return api.get('getAlbum', { id })
  }

  // http://your-server/rest/getSong.view
  //
  // @param  {number} id
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function song (id) {
    return api.get('getSong', { id })
  }

  function cover (id, { contents = false } = {}) {
    return api.getCoverArt(id, { contents })
  }

  // http://your-server/rest/getSong.view
  //
  // @param  {number} id
  // @param  {function} callback err, response
  // @return {Subsonic} this
  function songs ({ random = false } = {}) {
    if (random) {
      return api.getRandomSongs({songs: 10})
        .then(res => res.randomSongs.song)
    }
  }

  return {
    ping,
    topLevelFolders,
    indexes,
    folder,
    artists,
    artist,
    album,
    song,
    songs,
    cover
  }
}

module.exports = Subsonic
