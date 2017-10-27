function ungroupCollection (collection) {
  return collection.index.reduce((acc, next) => acc.concat(next.artist), [])
}

module.exports = {
  ungroupCollection
}
