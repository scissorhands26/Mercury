import { Request, Response } from "express";

export const testRoute = (req: Request, res: Response) => {
  res.status(200).send("API is Working!");
};

export const checkinRoute = async (req: Request, res: Response) => {
  const { implant } = req;

  async function updateCheckinDate(id: any) {
    const currentDate = new Date().toISOString();
    const response = await fetch(
      `http://127.0.0.1:8090/api/collections/implants/records/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ last_checkin_date: currentDate }),
      }
    );

    if (response.status === 404) {
      console.error(`Implant with id ${id} not found.`);
      return null;
    }

    const record = await response.json();
    return record;
  }

  const updatedRecord = await updateCheckinDate(implant.id);

  if (implant.tasks.length === 0) {
    const response = JSON.stringify({
      message:
        "Implant checkin complete. Last checkin date updated to ${updatedRecord.last_checkin_date}.",
    });
    console.log(response);
    return res.status(200).send(response);
  } else if (implant.tasks.length !== 0) {
    console.log("implant.expand.tasks");
    const tasks = implant.expand.tasks;
    const tasksToSend: any[] = [];
    tasks.forEach((task: any) => {
      console.log(task.status);
      if (task.status === 0) {
        tasksToSend.push(task);
      }
    });
    console.log("tasksToSend");
    console.log(tasksToSend);
    console.log(
      `Implant checkin complete. Tasks: ${JSON.stringify(tasksToSend)}.`
    );
    res.status(200).json({ tasks: tasksToSend });
  }
};

export const completeTaskRoute = async (req: Request, res: Response) => {
  const { implant } = req;
  console.log(implant);
  console.log(req.body.task);

  const id = req.body.task.id;

  async function completeTask(id: any) {
    const data = JSON.stringify(req.body.task.data);
    const response = await fetch(
      `http://127.0.0.1:8090/api/collections/tasks/records/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, status: 1 }),
      }
    );

    if (response.status === 404) {
      console.error(`Task with id ${id} not found.`);
      return null;
    }

    const record = await response.json();
    return record;
  }

  const updatedRecord = await completeTask(id);
  console.log(updatedRecord);
  res.status(200).send("Complete");
};
