import PocketBase from "pocketbase";

export async function ConnectToDatabase() {
  const admin = await Connect();
  return admin;
}

async function Connect() {
  console.log("Running ConnectToDatabase");
  const pb = new PocketBase("http://127.0.0.1:8090");

  const admin = await pb.admins.authWithPassword(
    "admin@admin.com",
    "1234567890"
  );

  const token = pb.authStore.token;
  //   window.location.reload();

  return token;
}
