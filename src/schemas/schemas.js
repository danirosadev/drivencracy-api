import Joi from "joi"

export const pollSchema = Joi.object({
    title: Joi.string().required(),
    expireAt:Joi.date()
})

export const choiceSchema = Joi.object({
    title: Joi.string().required(),
    pollId: Joi.string().required()
})

export const voteSchema = Joi.object({
    createdAt: Joi.date().required(),
    choiceId: Joi.string().required()
})
