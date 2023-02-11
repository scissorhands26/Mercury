migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nbvrg9ik8nhn3uv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cd6wxk5u",
    "name": "status",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 3
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nbvrg9ik8nhn3uv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cd6wxk5u",
    "name": "status",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": 3
    }
  }))

  return dao.saveCollection(collection)
})
