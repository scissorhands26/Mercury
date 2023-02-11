migrate((db) => {
  const collection = new Collection({
    "id": "nbvrg9ik8nhn3uv",
    "created": "2022-12-31 22:43:30.729Z",
    "updated": "2022-12-31 22:43:30.729Z",
    "name": "tasks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jncxkxq8",
        "name": "task",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "w0fxg5dy",
        "name": "completed",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "7yyedlm6",
        "name": "data",
        "type": "json",
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
  const collection = dao.findCollectionByNameOrId("nbvrg9ik8nhn3uv");

  return dao.deleteCollection(collection);
})
