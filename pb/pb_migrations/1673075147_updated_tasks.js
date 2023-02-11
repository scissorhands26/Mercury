migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nbvrg9ik8nhn3uv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jncxkxq8",
    "name": "task",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nbvrg9ik8nhn3uv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jncxkxq8",
    "name": "task",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
