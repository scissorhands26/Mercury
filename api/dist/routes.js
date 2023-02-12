var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const testRoute = (req, res) => {
    res.status(200).send("API is Working!");
};
export const checkinRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { implant } = req;
    function updateCheckinDate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date().toISOString();
            const response = yield fetch(`http://127.0.0.1:8090/api/collections/implants/records/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ last_checkin_date: currentDate }),
            });
            if (response.status === 404) {
                console.error(`Implant with id ${id} not found.`);
                return null;
            }
            const record = yield response.json();
            return record;
        });
    }
    const updatedRecord = yield updateCheckinDate(implant.id);
    if (implant.tasks.length === 0) {
        const response = JSON.stringify({
            message: `Implant checkin complete. Last checkin date updated to ${updatedRecord.last_checkin_date}.`,
        });
        console.log(response);
        return res.status(200).send(response);
    }
    else if (implant.tasks.length !== 0) {
        console.log("implant.expand.tasks");
        const tasks = implant.expand.tasks;
        const tasksToSend = [];
        tasks.forEach((task) => {
            console.log(task.status);
            if (task.status === 0) {
                tasksToSend.push(task);
            }
        });
        console.log("tasksToSend");
        console.log(tasksToSend);
        console.log(`Implant checkin complete. Tasks: ${JSON.stringify(tasksToSend)}.`);
        res.status(200).json({ tasks: tasksToSend });
    }
});
export const completeTaskRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { implant } = req;
    console.log(implant);
    console.log(req.body.task);
    const id = req.body.task.id;
    const ImplantsTasks = [];
    implant.tasks.forEach((task) => {
        console.log(task);
        ImplantsTasks.push(task);
    });
    function completeTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const TaskData = JSON.stringify(req.body.task.data);
            const TaskResponse = yield fetch(`http://127.0.0.1:8090/api/collections/tasks/records/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: TaskData, status: 1 }),
            });
            console.log("+++++++++++++++++++++++++++++++++++++");
            console.log(implant.id);
            const ImplantResponse = yield fetch(`http://127.0.0.1:8090/api/collections/implants/records/${implant.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tasks: ImplantsTasks.filter((task) => task !== id),
                }),
            });
            if (TaskResponse.status === 404) {
                console.error(`Task with id ${id} not found.`);
                return null;
            }
            if (ImplantResponse.status === 404) {
                console.error(`Task with id ${id} not found.`);
                return null;
            }
            const record = yield TaskResponse.json();
            return record;
        });
    }
    const updatedRecord = yield completeTask(id);
    console.log(updatedRecord);
    res.status(200).send("Complete");
});
