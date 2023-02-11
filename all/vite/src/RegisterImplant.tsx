import PocketBase from "pocketbase";
import { Implant } from "./Types";

export async function RegisterImplant(implant: Implant) {
  console.log("Running RegisterImplant");
  const pb = new PocketBase("http://127.0.0.1:8090");

  const key = crypto.randomUUID();

  const NewImpant = implant;

  const data = {
    verified: false,
    last_checkin_date: "",
    active: false,
    version: NewImpant.version,
    type: NewImpant.type,
    last_checkin_ip: "",
    task: {},
    is_task_pending: false,
    tasks_completed: 0,
    task_data: {},
    key: key,
  };

  const record = await pb.collection("implants").create(data);
  window.location.reload();
}
