import express from "express";
import { checkinRoute, completeTaskRoute, testRoute } from "./routes.js";
import Authenticate from "./middleware.js";
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// async function LoginToServer() {
//   rl.question("Enter email: ", (email) => {
//     rl.question("Enter password: ", (password) => {
//       const pb = new PocketBase("http://127.0.0.1:8090");
//       pb.admins.authWithPassword(email, password).then((auth) => {
//         console.log("Logged into server!");
//         console.log(auth);
//         rl.close();
//       });
//     });
//   });
// }
// async function LoginToServer() {
//   const email = "admin@admin.com";
//   const password = "1234567890";
//   const pb = new PocketBase("http://127.0.0.1:8090");
//   const auth = pb.admins.authWithPassword(email, password).then((auth) => {
//     console.log("+++ Logged into server!");
//     console.log(auth);
//   });
// }
// LoginToServer();
const app = express();
const port = 8000;
app.use(express.json());
app.listen(port, "0.0.0.0", () => {
    console.log(`API is running on http://0.0.0.0:${port}`);
});
app.get("/test", testRoute);
app.post("/checkin", Authenticate, checkinRoute);
app.post("/complete", Authenticate, completeTaskRoute);
