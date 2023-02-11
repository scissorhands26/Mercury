import PocketBase from "pocketbase";

export async function ListImplants(FilterArg: boolean) {
  console.log("Running ListImplants");
  const pb = new PocketBase("http://127.0.0.1:8090");

  const Filter = "production_implant=" + FilterArg;

  const records = await pb
    .collection("implants")
    .getFullList(200 /* batch size */, {
      sort: "-created",
      filter: Filter,
    });

  const data = JSON.stringify(records);
  return data;
}
