import { Router } from "express"
import { postChoice, postPoll, postVote, getPoll, getChoice, getResult  } from "../controllers/pollControllers.js"
import validSchema from "../middlewares/validSchema.js"
import { choiceSchema, pollSchema } from "../schemas/schemas.js"

const pollRouter = Router()

pollRouter.post("/poll", validSchema(pollSchema), postPoll)
pollRouter.get("/poll", getPoll)

pollRouter.post("/choice",validSchema(choiceSchema), postChoice)
pollRouter.get("/poll/:id/choice", getChoice)

pollRouter.post("/choice/:id/vote", postVote)
pollRouter.get("/poll/:id/result", getResult)

export default pollRouter