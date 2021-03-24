const Joi = require('@hapi/joi');
const { validate } = require('../../util/utils');


// create post by user
exports.createPostValidation = async (req, res, next) => {
    try {

      const schema = Joi.object().keys({
        title: Joi.string()
                 .min(1)
                 .required(),
      });
      const result = await validate(req.body, schema);
      req.body = result;
      next();

    } catch (error) {
      next(error);
    }
  };
