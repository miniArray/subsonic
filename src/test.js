const ss = require('./subsonic')({
  username: '',
  password: '',
  server: ''
});

(async () => {
  const artists = await ss.artists({
    group: true
  })

  const artist = artists.index[0]
  const artistDetail = await ss.artist(artist.id)

  console.log(artistDetail)
})()

// console.dir(ss, {
//   depth: null
// })
