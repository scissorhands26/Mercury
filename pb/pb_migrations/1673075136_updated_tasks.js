migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nbvrg9ik8nhn3uv")

  // remove
  collection.schema.removeField("w0fxg5dy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cd6wxk5u",
    "name": "status",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": 2
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nbvrg9ik8nhn3uv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w0fxg5dy",
    "name": "completed",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("cd6wxk5u")

  return dao.saveCollection(collection)
})
