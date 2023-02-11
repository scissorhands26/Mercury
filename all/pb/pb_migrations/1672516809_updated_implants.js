migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  collection.listRule = ""
  collection.viewRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  collection.listRule = null
  collection.viewRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
