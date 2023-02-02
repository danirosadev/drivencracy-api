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
        const polls = await db.collection("enquetes").find({}).toArray()
        return res.status(200).send(polls)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function postChoice(req, res) {
    const choice = { title: req.body.title, pollId: req.body.pollId }

    try {
        const isPoll = await db.collection("enquetes").findOne({ _id: ObjectId(choice.pollId) })
        if (!isPoll) return res.sendStatus(404)

        if(choice.title === "") return res.sendStatus(422)

        const existPoll = await db.collection("opcoes").findOne({ title: choice.title })
        if (existPoll) return res.sendStatus(409)

        await db.collection("opcoes").insertOne(choice)
        return res.status(201).send("Opcao criada")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function getChoice(req, res) {
    const { choiceId } = req.params.id

    try {
        const choices = await db.collection("opcoes").find({ choiceId }).toArray()
        if (!choices) return res.sendStatus(404)

        return res.status(200).send(choices)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function postVote(req, res) {}

export async function getResult(req, res) {}