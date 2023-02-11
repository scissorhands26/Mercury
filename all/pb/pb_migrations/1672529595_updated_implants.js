migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  // remove
  collection.schema.removeField("f8l6m7tw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cs2wpdb6",
    "name": "tasks",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 25,
      "collectionId": "nbvrg9ik8nhn3uv",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f8l6m7tw",
    "name": "task",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("cs2wpdb6")

  return dao.saveCollection(collection)
})
