const ss = require('./subsonic')({
  username: '',
  password: '',
  server: ''
})

// (async () => {
// const artists = await ss.artists({
//   group: true
// })

// const artist = artists.index[0]
// const artistDetail = await ss.artist(artist.id)
// const songs = ss.songs({random: true})
//   .then(console.log)
//   .catch(console.error)
console.log( ss.cover(1618, {contents:true}) )

// })()

// console.dir(ss, {
//   depth: null
// })
