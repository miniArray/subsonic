function ungroupCollection (collection) {
  return collection.index.reduce((acc, next) => acc.concat(next.artist), [])
}

const removeUndefined = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (obj[key] !== undefined) acc[key] = value
    return acc
  }, {})

module.exports = {
  ungroupCollection,
  removeUndefined
}
