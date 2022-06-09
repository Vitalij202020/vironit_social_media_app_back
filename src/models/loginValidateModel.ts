import Joi from "joi";

const loginSchema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(20).required()
})

export default loginSchema;