import express from "express";

import { login } from "../Controllers/auth.js";
import { updateChanelData, getAllChanels } from "../Controllers/channel.js";

const routes = express.Router();

routes.post("/login", login);
routes.patch("/update/:id", updateChanelData);
routes.get("/getAllChanels", getAllChanels);

export default routes;
