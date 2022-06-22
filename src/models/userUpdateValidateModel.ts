import Joi from "joi";

const userUpdateSchema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    dateOfBirth: Joi.string(),
    story: Joi.string(),
    nickName: Joi.string().min(2).required(),
    email: Joi.string().trim().email().required(),
    avatar: Joi.not()
})

export default userUpdateSchema;