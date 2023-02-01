import db from "../config/database.js"

export async function postPoll(req, res) {
    const {title, expireAt} = req.body

    try {
        await db.collection("enquetes").insertOne({title, expireAt})
        return res.status(200).send("Enquete criada")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function getPoll(req, res) {}

export async function postChoice(req, res) {}

export async function getChoice(req, res) {}

export async function postVote(req, res) {}

export async function getResult(req, res) {}