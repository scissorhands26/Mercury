import PocketBase from "pocketbase";
import { Implant } from "./Types";

export async function DeleteImplant(item: Implant) {
  console.log("Deleting: " + item.id);

  const pb = new PocketBase("http://127.0.0.1:8090");

  await pb.collection("implants").delete(item.id);

  window.location.reload();
}
