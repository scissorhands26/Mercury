import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { Implant, Location, Task } from "../lib/Types";
import { useRouter } from "next/router";

import styles from "../styles/Table.module.css";
import Link from "next/link";

export function ListTask() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await GetData(id);
      let parsedData;
      data ? (parsedData = JSON.parse(data)) : console.log("No Data");
      setTask(parsedData);

      console.log(parsedData);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <>Loading...</>;
  } else {
    return (
      <div className={styles.container}>
        <div>
          <div className="mt-10 overflow-hidden bg-slate-700 shadow sm:rounded-lg">
            {task ? (
              <div>
                <div>id: {task.id}</div>
                <div>created: {task.created}</div>
                <div>completed: {task.completed ? "True" : "False"}</div>
                <div>implant: {task.implant}</div>
                <div>cmd: {task.task.cmd}</div>
                <div>arguments: {task.task.arguments}</div>
                <div>id: {task.expand.implant.id}</div>
              </div>
            ) : (
              "No Task"
            )}
          </div>
        </div>
      </div>
    );
  }
}

async function DeleteImplant(item: Implant) {
  console.log("Deleting: " + item.id);
  const pb = new PocketBase("http://127.0.0.1:8090");
  await pb.collection("implants").delete(item.id);
  window.location.reload();
}

async function GetData(id: any) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  if (id !== undefined) {
    const record = await pb.collection("tasks").getOne(id, {
      expand: "implant",
    });
    const data = JSON.stringify(record);
    return data as string;
  }
}
