import PocketBase from "pocketbase";
import { useRouter } from "next/router";
import { Implant } from "../lib/Types";
import { useState } from "react";

export function CreateDevVars() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("Microsoft Windows");
  const [platformVersion, setPlatformVersion] = useState();
  const [releaseVersion, setReleaseVersion] = useState();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "platform":
        setPlatform(value);
        break;
      case "platformVersion":
        setPlatformVersion(value);
        break;
      case "releaseVersion":
        setReleaseVersion(value);
        break;
      default:
        break;
    }
  };

  function handleSubmit() {
    CreateDevelopmentVariables(name, platform, platformVersion, releaseVersion);
    router.reload();
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-5">
        <form
          className="rounded-lg shadow-lg bg-white text-center min-w-[500px] max-w-lg"
          onSubmit={handleSubmit}
        >
          <div className="py-3 px-6 border-gray-300 text-slate-900">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="bg-white w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="py-3 px-6 border-gray-300 text-slate-900">
            <label className="block  text-sm font-bold mb-2" htmlFor="platform">
              Platform:
            </label>
            <select
              className="bg-white w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              name="platform"
              value={platform}
              onChange={handleChange}
            >
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
          </div>
          <div className="py-3 px-6 border-gray-300 text-slate-900">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="platformVersion"
            >
              Platform Version:
            </label>
            <input
              className="bg-white w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              name="platformVersion"
              value={platformVersion}
              onChange={handleChange}
            />
          </div>
          <div className="py-3 px-6 border-gray-300 text-slate-900">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="releaseVersion"
            >
              Release Version:
            </label>
            <input
              className="bg-white w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              name="releaseVersion"
              value={releaseVersion}
              onChange={handleChange}
            />
          </div>
          <button
            className="inline-block mb-3 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

async function CreateDevelopmentVariables(
  name: string,
  platform: string,
  platformVersion: any,
  releaseVersion: any
) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const key = crypto.randomUUID();
  const data: Implant = {
    production_implant: false,
    active: false,
    last_checkin_date: "",
    name: name,
    release_version: releaseVersion,
    platform: platform,
    platform_version: platformVersion,
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
