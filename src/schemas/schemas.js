import Joi from "joi"

export const pollSchema = Joi.object({
    title: Joi.string().required(),
    expireAt:Joi.date().min('now')
})

export const choiceSchema = Joi.object({
    title: Joi.string().required(),
    pollId: Joi.string().required()
})
