import PocketBase from "pocketbase";

export async function CreateTestImplant() {
  console.log("Running CreateTestImplant");
  const pb = new PocketBase("http://127.0.0.1:8090");

  const key = crypto.randomUUID();

  const data = {
    verified: true,
    last_checkin_date: "",
    active: false,
    version: 123,
    type: "test",
    last_checkin_ip: "",
    task: {},
    is_task_pending: true,
    tasks_completed: 123,
    task_data: {},
    key: key,
  };

  const record = await pb.collection("implants").create(data);
  window.location.reload();
}
