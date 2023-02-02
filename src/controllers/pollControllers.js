import { ObjectId, ObjectID } from "bson"
import db from "../config/database.js"

export async function postPoll(req, res) {
    const { title, expireAt } = req.body

    try {
        if(title === "") return res.sendStatus(422)

        await db.collection("enquetes").insertOne({ title, expireAt })
        return res.status(201).send("Enquete criada")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function getPoll(req, res) {
    try {
        const enquetes = await db.collection("enquetes").find({}).toArray()
        return res.status(201).send(enquetes)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function postChoice(req, res) {
    const { title, pollId } = req.body
    const { id } = req.params

    try {
        const isPoll = await db.collection("enquetes").findOne({ _id: ObjectId(id) })
        if (!isPoll) return res.sendStatus(404)

        if(title === "") return res.sendStatus(422)

        const existPoll = await db.collection("enquetes").findOne({ title })
        if (existPoll) return res.sendStatus(409)

        await db.collection("opcoes").insertOne({ title, pollId })
        return res.status(201).send("Opcao criada")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function getChoice(req, res) {
    const choices = req.body
    const pollId = req.params.id

    try {
        await db.collection("opcoes").find(pollId)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function postVote(req, res) {}

export async function getResult(req, res) {}