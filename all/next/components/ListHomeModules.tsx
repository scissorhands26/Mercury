import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { Implant, Task } from "../lib/Types";
import Link from "next/link";

export function ListHomeModules() {
  const [loading, setLoading] = useState(true);
  const [implants, setImplants] = useState<Implant[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dbhealth, setDbhealth] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const health = await GetDatabaseHealth();
      health.code === 200 ? setDbhealth(true) : setDbhealth(false);
      const data = await GetData();
      const parsedData = JSON.parse(data);
      setImplants(parsedData);

      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    implants?.forEach((implant) => {
      if (implant.expand.tasks) {
        if (tasks.length === 0) {
          const tasksArray = implant.expand.tasks;

          tasksArray.forEach((task: any) => {
            setTasks((prevItems) => [...prevItems, task]);
          });
        }
      }
    });
  }, [implants]);

  if (loading) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <div className="container">
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="row-span-2">
              {implants?.length !== 0 ? (
                <div className="rounded-lg shadow-lg bg-white text-center pt-2 pb-5">
                  <h5 className="text-gray-900 text-xl font-medium mb-1">
                    Top Implants
                  </h5>
                  {implants.slice(0, 2).map((implant) => (
                    <div
                      key={implant.id}
                      className="text-gray-700 text-base border rounded m-4 py-4 grid grid-cols-2 gap-4 bg-slate-300"
                    >
                      <p>ID: {implant.id}</p>
                      <p>Created: {implant.created}</p>
                      <p>Implant: {implant.name}</p>
                      <p>Release Version: {implant.release_version}</p>
                      <p>Platform: {implant.platform}</p>
                      <p>Platform Version: {implant.platform_version}</p>
                      <p>Last IP: {implant.last_checkin_ip}</p>
                      <p>Last Checked in: {implant.last_checkin_date}</p>
                      <div className="col-span-2">
                        <button className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                          <Link href={"/implants/" + implant.id}>
                            View Implant
                          </Link>
                        </button>
                      </div>
                    </div>
                  ))}
                  <p className="text-gray-700 text-base"></p>
                </div>
              ) : (
                <div>
                  <h1>No Tasks</h1>
                </div>
              )}
            </div>
            <div className="col-span-1">
              <div>
                <div className="rounded-lg shadow-lg bg-white text-center">
                  <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">
                      System Health
                    </h5>
                    <p className="text-gray-700 text-base">
                      Database:{" "}
                      {dbhealth ? (
                        <span className="text-green-500 font-bold">
                          🟢Healthy
                        </span>
                      ) : (
                        <span className="text-red-500 font-bold">
                          🔴Unknown
                        </span>
                      )}
                    </p>
                    <p className="text-gray-700 text-base mb-4">
                      API:{" "}
                      <span className="text-green-500 font-bold">
                        🟢Healthy
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              {tasks?.length !== 0 ? (
                <div className="rounded-lg shadow-lg bg-white text-center pb-5">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Recent Tasks
                  </h5>
                  {tasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className={
                        task.status === 0
                          ? "text-gray-700 text-base border rounded m-4 py-4 grid grid-cols-2 gap-4 bg-slate-300"
                          : task.status === 1
                          ? "text-gray-700 text-base border rounded m-4 py-4 grid grid-cols-2 gap-4 bg-green-300"
                          : task.status === 2
                          ? "text-gray-700 text-base border rounded m-4 py-4 grid grid-cols-2 gap-4 bg-yellow-300"
                          : task.status === 3
                          ? "text-gray-700 text-base border rounded m-4 py-4 grid grid-cols-2 gap-4 bg-red-300"
                          : "text-gray-700 text-base border rounded m-4 py-4 grid grid-cols-2 gap-4 bg-slate-300"
                      }
                    >
                      <p>ID: {task.id}</p>
                      <p>Created: {task.created}</p>
                      <p>
                        Cmd: "{task.task.cmd}" Args: "{task.task.arguments}"
                      </p>
                      <p>
                        Status:{" "}
                        {task.status === 0
                          ? "pending"
                          : task.status === 1
                          ? "completed"
                          : task.status === 2
                          ? "running"
                          : task.status === 3
                          ? "failed"
                          : "unknown"}
                      </p>
                      <div className="col-span-2">
                        <button className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                          <Link href={"/task/" + task.id}>View Task</Link>
                        </button>
                      </div>
                    </div>
                  ))}
                  <p className="text-gray-700 text-base"></p>
                </div>
              ) : (
                <div>
                  <h1>No Tasks</h1>
                </div>
              )}
            </div>
            <div className="col-span-2">
              <div className="rounded-lg shadow-lg bg-white text-center">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  Footer
                </h5>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

async function GetData() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const Filter = "production_implant=" + "true";
  const records = await pb
    .collection("implants")
    .getFullList(200 /* batch size */, {
      sort: "-created",
      filter: Filter,
      expand: "tasks",
    });
  const data = JSON.stringify(records);
  return data;
}

async function GetDatabaseHealth() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const res = await pb.health.check();
  return res;
}
