migrate((db) => {
  const collection = new Collection({
    "id": "y3ckcirut5ry56t",
    "created": "2022-12-31 04:30:56.331Z",
    "updated": "2022-12-31 04:30:56.331Z",
    "name": "implants",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "d89fgiws",
        "name": "verified",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("y3ckcirut5ry56t");

  return dao.deleteCollection(collection);
})
