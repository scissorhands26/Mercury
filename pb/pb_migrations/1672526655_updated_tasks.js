migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nbvrg9ik8nhn3uv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uktwpvzi",
    "name": "implant",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "y3ckcirut5ry56t",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nbvrg9ik8nhn3uv")

  // remove
  collection.schema.removeField("uktwpvzi")

  return dao.saveCollection(collection)
})
