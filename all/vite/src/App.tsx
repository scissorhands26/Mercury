import { useEffect, useRef, useState } from "react";
import PocketBase from "pocketbase";
import "./App.css";

import { RegisterImplant } from "./RegisterImplant";
import { CreateTestImplant } from "./CreateTestImplant";
import { DeleteImplant } from "./DeleteImplant";
import { ListImplants } from "./ListImplants";
import { ConnectToDatabase } from "./ConnectToDatabase";
import { Implant, Command, Task } from "./Types";

function App() {
  const authentication = localStorage.getItem("pocketbase_auth");
  const AuthUser = JSON.parse(authentication ? authentication : "null");

  if (!AuthUser) {
    return (
      <div>
        <h1>Unauthenticated</h1>
        <button
          onClick={() => {
            ConnectToDatabase();
          }}
        >
          Authenticate
        </button>
      </div>
    );
  }

  // PR = production ready

  const [pRImplant, setPRImplant] = useState<Implant[]>([]);
  const [nonPRImplant, setNonPRImplant] = useState<Implant[]>([]);
  const [task, setTask] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const platformInput = useRef<any>();
  const platformVersionInput = useRef<any>(null);
  const implantTypeInput = useRef<any>(null);
  const implantVersionInput = useRef<any>(null);

  async function CreateTask() {
    const pb = new PocketBase("http://127.0.0.1:8090");

    const ImplantID = "hppabwy7coh6ow5";

    const command: Command = {
      cmd: "a",
      arguments: "a",
    };

    const task: Task = {
      id: "",
      task: {
        cmd: "a",
        arguments: "b",
      },
      completed: false,
      data: {},
      implant: ImplantID,
    };

    const TaskRecord = await pb.collection("tasks").create(task);

    const ImplantIDFilter = "'hppabwy7coh6ow5'";
    const Filter = "id=" + ImplantIDFilter;

    const results = await pb.collection("implants").getFirstListItem(Filter);

    const a = JSON.stringify(results);
    const b = JSON.parse(a);
    console.log(b);

    const tasks = b.tasks;

    tasks.push(TaskRecord.id);
    console.log(tasks);

    const data = {
      tasks: tasks,
      is_task_pending: true,
    };

    const ImplantRecord = await pb
      .collection("implants")
      .update(ImplantID, data);
  }

  async function GetTasks() {
    const pb = new PocketBase("http://127.0.0.1:8090");

    const records = await pb
      .collection("tasks")
      .getFullList(200 /* batch size */, {
        sort: "-created",
      });

    const data = JSON.stringify(records);
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const PRListResponse = await ListImplants(true);
        const PRImplants = await JSON.parse(PRListResponse);
        setPRImplant(PRImplants);
        const NonPRListResponse = await ListImplants(false);
        const NonPRImplants = await JSON.parse(NonPRListResponse);
        setNonPRImplant(NonPRImplants);
        const TasksResponse = await GetTasks();
        const Tasks = await JSON.parse(TasksResponse);
        setTask(Tasks);
        console.log(Tasks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const HandleSubmit = () => {
    const implant: Implant = {
      id: "",
      active: false,
      created: "",
      last_checkin_date: "",
      last_checkin_ip: "",
      is_task_pending: false,
      tasks_completed: 0,
      task_data: {},
      tasks: [],
      production_implant: false,
      platform: "",
      name: "",
      release_version: 0,
      platform_version: 0,
    };

    implant.platform = platformInput?.current?.value;
    implant.platform_version = platformVersionInput?.current?.value;
    implant.name = implantTypeInput?.current?.value;
    implant.release_version = implantVersionInput?.current?.value;
    console.log(implant);

    RegisterImplant(implant);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <a href="/implants">
        <h2>Implants</h2>
      </a>
      <div>
        <button onClick={CreateTestImplant}>Create Test (Dummy) Implant</button>
        <button
          onClick={() => {
            CreateTask();
          }}
        >
          Create Task
        </button>
      </div>

      <div
        style={{
          border: "1px solid black",
        }}
      >
        <h2>Create Variables to Use in a Custom Implant</h2>
        <form
          onSubmit={HandleSubmit}
          style={{
            margin: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <label htmlFor="platform">Platform:</label>
          <br />
          <select id="platform" name="platform" ref={platformInput}>
            <option value="Microsoft Windows">Microsoft Windows</option>
            <option value="Debian">Debian</option>
            <option value="Red Hat">Red Hat</option>
            <option value="Ubuntu">Ubuntu</option>
            <option value="Solaris">Solaris</option>
            <option value="FreeBSD">FreeBSD</option>
            <option value="MacOS">MacOS</option>
            <option value="iOS">iOS</option>
            <option value="Android">Android</option>
            <option value="Unix">Unix</option>
          </select>
          <br />
          <label htmlFor="platform-version">Platform Version:</label>
          <br />
          <input
            type="number"
            step="0.01"
            id="platform-version"
            name="platform-version"
            ref={platformVersionInput}
          />
          <br />
          <label htmlFor="implant">Implant:</label>
          <br />
          <input
            type="text"
            id="implant"
            name="implant"
            ref={implantTypeInput}
          />
          <br />
          <label htmlFor="release-version">Release Version:</label>
          <br />
          <input
            type="number"
            step="0.01"
            id="release-version"
            name="release-version"
            ref={implantVersionInput}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>

      {nonPRImplant.length !== 0 ? (
        <div>
          <div className="table-wrapper">
            <table>
              <caption>Variables for dev implants</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Implant</th>
                  <th>Version</th>
                  <th>Production Ready</th>
                  <th>Created</th>
                  <th>Delete Variables</th>
                </tr>
              </thead>
              <tbody>
                {nonPRImplant.map((item: Implant) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.platform}</td>
                    <td>{item.platform_version}</td>
                    <td>{item.production_implant ? "True" : "False"}</td>
                    <td>{item.created}</td>
                    <td>
                      <button
                        onClick={() => {
                          DeleteImplant(item);
                        }}
                      >
                        Delete Variables
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              marginBottom: "50px",
            }}
          ></div>
        </div>
      ) : (
        <div>
          <h1>No Varables</h1>
        </div>
      )}

      {pRImplant.length !== 0 ? (
        <div>
          <div className="table-wrapper">
            <table>
              <caption>Implants</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Version</th>
                  <th>Verified</th>
                  <th>Active</th>
                  <th>Created</th>
                  <th>Last Checkin Date</th>
                  <th>Last Checkin IP</th>
                  <th>Task</th>
                  <th>Tasks are Pending</th>
                  <th>Tasks Completed</th>
                  <th>Task Data</th>
                  <th>Delete Implant</th>
                </tr>
              </thead>
              <tbody>
                {pRImplant.map((item: Implant) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.platform}</td>
                    <td>{item.platform_version}</td>
                    <td>{item.production_implant ? "True" : "False"}</td>
                    <td>{item.active ? "True" : "False"}</td>
                    <td>{item.created}</td>
                    <td>
                      {item.last_checkin_date
                        ? item.last_checkin_date
                        : "Never"}
                    </td>
                    <td>
                      {item.last_checkin_ip ? item.last_checkin_ip : "N/A"}
                    </td>
                    <td>{JSON.stringify(item.tasks)}</td>
                    <td>{item.is_task_pending ? "Yes" : "No"}</td>
                    <td>{item.tasks_completed}</td>
                    <td>{JSON.stringify(item.task_data)}</td>
                    <td>
                      <button
                        onClick={() => {
                          DeleteImplant(item);
                        }}
                      >
                        Delete Implant
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              marginBottom: "50px",
            }}
          ></div>
        </div>
      ) : (
        <div>
          <h1>No Implants</h1>
        </div>
      )}

      {task.length !== 0 ? (
        <div>
          <div className="table-wrapper">
            <table>
              <caption>Tasks</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task</th>
                  <th>Completed</th>
                  <th>Data</th>
                  <th>Implant</th>
                </tr>
              </thead>
              <tbody>
                {task.map((item: Task) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{JSON.stringify(item.task)}</td>
                    <td>{item.completed ? "True" : "False"}</td>
                    <td>{JSON.stringify(item.data)}</td>
                    <td>{item.implant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              marginBottom: "50px",
            }}
          ></div>
        </div>
      ) : (
        <div>
          <h1>No Tasks</h1>
        </div>
      )}
    </div>
  );
}

export default App;
