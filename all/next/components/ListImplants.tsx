import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { Implant, Command, Task } from "../lib/Types";
import Link from "next/link";

export function ListImplants() {
  const [loading, setLoading] = useState(true);
  const [implants, setImplants] = useState<Implant[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await GetData();
      setImplants(JSON.parse(data));
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <div className="container">
          <h1 className="text-6xl mb-5 underline">Implants</h1>
          {implants.length !== 0 ? (
            <>
              <div className="grid grid-cols-4 gap-4 ">
                {implants.map((item: Implant) => (
                  <div key={item.id}>
                    <div className="flex justify-center">
                      <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center hover:bg-slate-300">
                        <div className="py-3 px-6 border-b border-gray-300 text-slate-900">
                          {item.id.toLocaleUpperCase()}
                        </div>
                        <div className="p-6">
                          <h5 className="text-gray-900 text-xl font-medium mb-2">
                            {item.name}
                          </h5>
                          <p className="text-gray-700 text-base">
                            Platform: {item.platform}
                          </p>
                          <p className="text-gray-700 text-base mb-4">
                            Version: {item.release_version}
                          </p>
                          <Link href={"/implants/" + item.id}>
                            <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                              View Implant
                            </button>
                          </Link>
                        </div>
                        <div className="py-3 pr-2 pl-6 border-t border-gray-300 text-gray-600">
                          <div className="flex flex-row justify-between">
                            Created: {item.created}
                            <div className="pl-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="darkred"
                                className="w-6 h-6 cursor-pointer"
                                onClick={() => {
                                  DeleteImplant(item);
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            "No Implants"
          )}
        </div>
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

async function GetData() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const Filter = "production_implant=" + "true";
  const records = await pb
    .collection("implants")
    .getFullList(200 /* batch size */, {
      sort: "-created",
      filter: Filter,
    });
  const data = JSON.stringify(records);
  return data;
}
