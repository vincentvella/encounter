import Joi from 'joi'

export const TokenSchema = Joi.object().keys({
  username: Joi.string().required()
})