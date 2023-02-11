var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function Authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
        function CheckID(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(`http://127.0.0.1:8090/api/collections/implants/records/${id}?expand=tasks`);
                console.log(response.status);
                if (response.status !== 200) {
                    return null;
                }
                const record = yield response.json();
                return record;
            });
        }
        const implant = yield CheckID(id);
        console.log(implant);
        if (implant !== null && implant.key === key) {
            req.implant = implant;
            next();
        }
        else {
            res.status(404).send("Page not found");
        }
    });
}
