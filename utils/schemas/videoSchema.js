const joi = require('@hapi/joi');

const videoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const videoTitleSchema = joi.string().max(80);
const videoYearSchema = joi.number().min(1888).max(2077);
const videoCoverSchema = joi.string().uri();
const videoDescriptionSchema = joi.string().max(300);
const videoDurationSchema = joi.number().min(1).max(300);
const videoContentRattingSchema = joi.string().max(5);
const videoSourceSchema = joi.string().uri();
const videoTagsSchema = joi.array().items(joi.string().max(50));


const createVideoSchema = {
  title: videoTitleSchema.required(),
  year: videoYearSchema.required(),
  cover: videoCoverSchema.required(),
  description: videoDescriptionSchema.required(),
  duration: videoDurationSchema.required(),
  contentRating: videoContentRattingSchema.required(),
  source: videoSourceSchema.required(),
  tags: videoTagsSchema
};

const updateVideoSchema = {
  title: videoTitleSchema,
  year: videoYearSchema,
  cover: videoCoverSchema,
  description: videoDescriptionSchema,
  duration: videoDurationSchema,
  contentRating: videoContentRattingSchema,
  source: videoSourceSchema,
  tags: videoTagsSchema
};

module.exports = {
  videoIdSchema,
  createVideoSchema,
  updateVideoSchema
}