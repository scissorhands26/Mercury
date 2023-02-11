migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  // remove
  collection.schema.removeField("qdgvsldd")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qdgvsldd",
    "name": "is_task_pending",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
