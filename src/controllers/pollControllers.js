import { ObjectId } from "bson"
import db from "../config/database.js"
import dayjs from "dayjs"

export async function postPoll(req, res) {
    const { title, expireAt } = req.body

    if(expireAt === '') {
        expireAt = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
      }

    try {
        if (title === "") return res.sendStatus(422)

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

        if (choice.title === "") return res.sendStatus(422)

        const existPoll = await db.collection("opcoes").findOne({ title: choice.title })
        if (existPoll) return res.sendStatus(409)

        await db.collection("opcoes").insertOne(choice)
        return res.status(201).send("Opcao criada")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function getChoice(req, res) {
    const id = req.params.id

    try {
        const choices = await db.collection("opcoes").find({ pollId: id }).toArray()
        if (!choices) return res.sendStatus(404)

        return res.status(200).send(choices)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function postVote(req, res) {
    const id = req.params.id

    const vote = { createdAt: dayjs().format('YYYY-MM-DD HH:mm'), choiceId: id }

    try {
        const isChoice = await db.collection("opcoes").find({ _id: ObjectId(id) })
        if (!isChoice) return res.sendStatus(404)

        await db.collection("votos").insertOne(vote)
        return res.status(201).send("Voto criado")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function getResult(req, res) {
    const id = req.params.id
    let counter1 = 0
    let counter2 = 0

    try {
        const pool = await db.collection("enquetes").findOne({ _id: ObjectId(id) })
        const choices = await db.collection("opcoes").find({ pollId: id}).toArray()
        const votes = await db.collection("votos").find({}).toArray()

        const numVotes = []
        for (const choice of choices){
            let count = votes.reduce((acc, cur) => cur.choiceId === choice._id.toString ? acc + 1 : cur)
            numVotes.push(count)
        }

        const indexVoted = numVotes.indexOf(Math.max(...numVotes))
        console.log(indexVoted)

        const result = {
            _id: pool._id,
            title: pool.title,
            expireAt: pool.expireAt,
            result: {
                title: choices.title,
                votes: numVotes.length
            }
        }

        res.send(result)
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}