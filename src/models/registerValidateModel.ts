import Joi from "joi";

const registerSchema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    dateOfBirth: Joi.string(),
    sex: Joi.string(),
    nickName: Joi.string().min(2).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(20).required(),
    confirmPassword: Joi.string()

})

export default registerSchema;