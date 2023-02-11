migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  // remove
  collection.schema.removeField("236mkbhm")

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4incjg3m",
    "name": "platform_version",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v44u6ike",
    "name": "release_version",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "236mkbhm",
    "name": "type",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("rfhib2ol")

  // remove
  collection.schema.removeField("4incjg3m")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v44u6ike",
    "name": "version",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
