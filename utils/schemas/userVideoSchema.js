const joi = require('@hapi/joi');

const {videoIdSchema} = require('./videoSchema');
const {userIdSchema} = require('./userSchema');

const userVideoIdSchema= joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserMovieSchema = {
  userId = userIdSchema,
  videoId = videoIdSchema
};

module.exports = {
  userVideoIdSchema,
  createUserMovieSchema
}