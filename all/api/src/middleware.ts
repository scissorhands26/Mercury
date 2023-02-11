import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    implant?: any;
  }
}

export default async function Authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("\n\n####################");
  console.log("Connection from: ", req.ip);

  // Checking for Auth header
  const token = req.header("Authorization");
  if (!token) {
    console.log("No Authorization Header");
    return res.status(401).send("Access Denied");
  }

  // Checking for ID in body
  console.log("REQ Body: ", req.body);
  const key = req.body.key;
  const id = req.body.id;
  console.log(id);
  if (!id) {
    console.log("No ID");
    return res.status(401).send("Access Denied");
  }

  // Checking for key in body
  if (!key) {
    console.log("No Key");
    return res.status(401).send("Access Denied");
  }

  async function CheckID(id: any) {
    const response = await fetch(
      `http://127.0.0.1:8090/api/collections/implants/records/${id}?expand=tasks`
    );
    console.log(response.status);
    if (response.status !== 200) {
      return null;
    }
    const record = await response.json();
    return record;
  }

  const implant = await CheckID(id);
  console.log(implant);
  if (implant !== null && implant.key === key) {
    req.implant = implant;
    next();
  } else {
    res.status(404).send("Page not found");
  }
}
