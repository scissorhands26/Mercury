import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { Implant, Location, Task } from "../lib/Types";
import { useRouter } from "next/router";
import { LocationMap } from "./LocationMap";

import styles from "../styles/Table.module.css";
import Link from "next/link";

export function ListImplant() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [implant, setImplant] = useState<Implant | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await GetData(id);
      console.log(data);
      let parsedData;
      data ? setImplant(JSON.parse(data)) : console.log("No Data");
      data ? (parsedData = JSON.parse(data)) : console.log("No Data");
      setTasks(parsedData?.expand.tasks);

      setLoading(false);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchLocation() {
      const location = await getLocation(implant?.last_checkin_ip).then(
        (res) => {
          setLocation(res);
        }
      );
    }
    fetchLocation();
  }, [implant]);

  if (loading) {
    return <>Loading...</>;
  } else {
    return (
      <>
        {implant && location ? (
          <div className={styles.container}>
            <div>
              <div className="mt-10 overflow-hidden bg-slate-700 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-slate-100">
                    Implant Information
                  </h3>
                </div>
                <div className="flex flex-row">
                  <div className="border-t border-slate-900">
                    <LocationMap
                      lat={location.latitude}
                      lng={location.longitude}
                    />
                  </div>
                  <div className="border-t border-slate-900 w-full">
                    <dl>
                      <div className="bg-slate-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-slate-100">
                          ID
                        </dt>
                        <dd className="mt-1 text-sm text-slate-100 sm:col-span-2 sm:mt-0">
                          {implant.id}
                        </dd>
                      </div>
                      <div className="bg-slate-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-slate-100">
                          Implant
                        </dt>
                        <dd className="mt-1 text-sm text-slate-100 sm:col-span-2 sm:mt-0">
                          {implant.name}
                        </dd>
                      </div>
                      <div className="bg-slate-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-slate-100">
                          Implant Release Version
                        </dt>
                        <dd className="mt-1 text-sm text-slate-100 sm:col-span-2 sm:mt-0">
                          {implant.release_version}
                        </dd>
                      </div>
                      <div className="bg-slate-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-slate-100">
                          Target Platform
                        </dt>
                        <dd className="mt-1 text-sm text-slate-100 sm:col-span-2 sm:mt-0">
                          {implant.platform}{" "}
                          {implant.platform_version
                            ? "v." + implant.platform_version
                            : ""}
                        </dd>
                      </div>
                      <div className="bg-slate-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-slate-100">
                          Last Checkin
                        </dt>
                        <dd className="mt-1 text-sm text-slate-100 sm:col-span-2 sm:mt-0">
                          {implant.last_checkin_date} from{" "}
                          {implant.last_checkin_ip}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="mt-10 overflow-hidden bg-slate-700 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <div className="block">
                    <h3 className="text-lg font-medium leading-6 text-slate-100">
                      Task Information
                    </h3>
                  </div>
                </div>
                <div className="border-t border-slate-900 w-full">
                  <dl>
                    {tasks ? (
                      tasks.map((task: Task, index) => (
                        <div key={task.id}>
                          <div
                            className={
                              index % 2 === 0
                                ? "bg-slate-600 px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
                                : "bg-slate-500 px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
                            }
                          >
                            <dt className="text-sm font-medium text-slate-100">
                              ID: {task.id}
                            </dt>
                            <dt className="text-sm font-medium text-slate-100">
                              Completed: {task.completed ? "True" : "False"}
                            </dt>
                            <dt className="text-sm font-medium text-slate-100">
                              Created: {task.created}
                            </dt>
                            <dt className="text-sm font-medium text-slate-100">
                              Command: {task.task.cmd}
                            </dt>
                            <dt className="text-sm font-medium text-slate-100">
                              Args:{" "}
                              {task.task.arguments
                                ? task.task.arguments
                                : "None"}
                            </dt>
                            <dt className="text-sm font-medium text-slate-100">
                              <Link href={"/task/" + task.id}>
                                <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                  View Task
                                </button>
                              </Link>
                            </dt>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-slate-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-slate-100">
                          ID
                        </dt>
                        <dd className="mt-1 text-sm text-slate-100 sm:col-span-2 sm:mt-0">
                          No Tasks
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>No Implant</h1>
        )}
      </>
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
    const record = await pb.collection("implants").getOne(id, {
      expand: "tasks",
    });
    const data = JSON.stringify(record);
    return data as string;
  }
}

async function getLocation(ip: any) {
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  const data = await response.json();
  return data;
}
