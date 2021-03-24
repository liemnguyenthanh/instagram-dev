const Joi = require('@hapi/joi');
const { validate } = require('../../util/utils');

// Register Validate
exports.registerValidation = async (req, res, next) => {
    try {

      const schema = Joi.object().keys({
        fullName: Joi.string()
                 .min(4)
                 .required(),
        username:Joi.string()
                .min(4)
                .required(),
        email: Joi.string()
                   .email()
                   .min(6)
                   .required(),
        password: Joi.string()
                   .min(6)
                   .required(),
      });
      const result = await validate(req.body, schema);
      req.body = result;
      next();

    } catch (error) {
      next(error);
    }
  };

exports. signinValidation = async (req, res, next) => {
    try {
      const schema = Joi.object().keys({
        email: Joi.string()
                 .email()
                 .min(7)
                 .required(),
        password: Joi.string()
                   .min(6)
                   .required(),
      });
      const result = await validate(req.body, schema);
      req.body = result;
      next();

    } catch (error) {
      next(error);
    }
  };
