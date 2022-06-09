import Joi from "joi";

const registerSchema = Joi.object().keys({
    nickName: Joi.string().min(2).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(20).required()
})

export default registerSchema;