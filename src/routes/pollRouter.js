import { Router } from "express"
import { postChoice, postPoll, postVote, getPoll, getChoice, getResult  } from "../controllers/pollControllers"

const pollRouter = Router()

pollRouter.post("/poll", postPoll)
pollRouter.get("/poll", getPoll)

pollRouter.post("/choice", postChoice)
pollRouter.get("/poll/:id/choice", getChoice)

pollRouter.post("/choice/:id/vote", postVote)
pollRouter.get("/poll/:id/result", getResult)

export default pollRouter