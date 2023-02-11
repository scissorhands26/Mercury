import PocketBase from "pocketbase";
import { useRouter } from "next/router";
import { Implant } from "../lib/Types";

export function CreateTestImplant() {
  const router = useRouter();

  function handleClick() {
    CreateDevelopmentVariables();
    router.reload();
  }

  return (
    <>
      <button
        className="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {
          handleClick();
        }}
      >
        Create Test (Dummy) Implant
      </button>
    </>
  );
}

async function CreateDevelopmentVariables() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const key = crypto.randomUUID();
  const data: Implant = {
    production_implant: false,
    active: false,
    last_checkin_date: "",
    name: "Venus",
    release_version: 1.0,
    platform: "Ubuntu",
    platform_version: 1.0,
    key: key,
    id: "",
    created: "",
    last_checkin_ip: "",
    tasks: {},
    is_task_pending: false,
    tasks_completed: 0,
    task_data: {},
  };
  const record = await pb.collection("implants").create(data);
  return record;
}
