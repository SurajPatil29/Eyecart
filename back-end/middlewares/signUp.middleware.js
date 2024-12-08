const joi = require("joi");

const signupSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  birthDate: joi
    .string()
    .required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .max(30)
    .required(),
  gender: joi.string().valid("male", "female").required(),
});

const validateSignupData = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      msg: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

module.exports = validateSignupData;