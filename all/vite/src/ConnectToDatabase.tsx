import PocketBase from "pocketbase";

export async function ConnectToDatabase() {
  console.log("Running ConnectToDatabase");
  const pb = new PocketBase("http://127.0.0.1:8090");

  const admin = await pb.admins.authWithPassword(
    "admin@admin.com",
    "1234567890"
  );
  console.log(admin.token);

  window.location.reload();

  return pb;
}
