migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rfhib2ol",
    "name": "platform",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Microsoft Windows",
        "Debian",
        "Red Hat",
        "Ubuntu",
        "Solaris",
        "FreeBSD",
        "MacOS",
        "iOS",
        "Android",
        "Unix"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rfhib2ol",
    "name": "platform",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Microsoft Window",
        "Debian",
        "Red Hat",
        "Ubuntu",
        "Solaris",
        "FreeBSD",
        "MacOS",
        "iOS",
        "Android",
        "Unix"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
