migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pustokg5",
    "name": "last_checkin",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  // remove
  collection.schema.removeField("pustokg5")

  return dao.saveCollection(collection)
})
