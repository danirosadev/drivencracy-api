import { Router } from "express"
import { postChoice, postPoll, postVote, getPoll, getChoice, getResult  } from "../controllers/pollControllers.js"
import validSchema from "../middlewares/validSchema"
import { pollSchema } from "../schemas/schemas"

const pollRouter = Router()

pollRouter.post("/poll", validSchema(pollSchema), postPoll)
pollRouter.get("/poll", getPoll)

pollRouter.post("/choice", postChoice)
pollRouter.get("/poll/:id/choice", getChoice)

pollRouter.post("/choice/:id/vote", postVote)
pollRouter.get("/poll/:id/result", getResult)

export default pollRouter