import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { Implant } from "../lib/Types";
import { useRouter } from "next/router";

import styles from "../styles/Table.module.css";

export function ListDevVar() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [implant, setImplant] = useState<Implant | null>(null);

  console.log(id);

  useEffect(() => {
    async function fetchData() {
      const data = await GetData(id);
      console.log(data);

      setImplant(JSON.parse(data));
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <>Loading...</>;
  } else {
    console.log(implant);
    return (
      <>
        {implant ? (
          <div className={styles.container}>
            <div>
              <h2 className="text-lg font-semibold underline">
                Development Variables
              </h2>
              <div>ID: {implant.id}</div>
              <div>Name: {implant.name}</div>
              <div>Platform: {implant.platform}</div>
              <div>Platform Version: {implant.platform_version}</div>
              <div>Release Version: {implant.release_version}</div>
              <div>Key: {implant.key}</div>
            </div>
            <br />
            <div>
              <h2 className="text-lg font-semibold underline">Again as JSON</h2>
              {"{"}
              "ID": "{implant.id}",
              <br /> "Name": "{implant.name}",
              <br /> "Platform": "{implant.platform}",
              <br /> "PlatformVersion": "{implant.platform_version}",
              <br /> "ReleaseVersion": "{implant.release_version}",
              <br /> "Key": "{implant.key}"{"}"}
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
    const record = await pb.collection("implants").getOne(id);
    const data = JSON.stringify(record);
    return data;
  } else {
    const record = { error: { error: "Something went wrong" } };
    const data = JSON.stringify(record);
    return data;
  }
}
