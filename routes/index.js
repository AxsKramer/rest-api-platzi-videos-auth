const express = require('express');
const router = express.Router();
const VideosService = require('../services/videos');
const { videoIdSchema, createVideoSchema, updateVideoSchema} = require('../utils/schemas/videoSchema');
const validationHandler = require('../utils/middleware/validationHandler');

const videosService = new VideosService();

router.get('/', async (req, res, next) => {
  const {tags} = req.query;
  try {
    const videos = await videosService.getVideos(tags);
    res.status(200).json({message: 'Videos', data: videos});
  } catch (error) {
    next(error)
  }
});

router.get('/:videoId', 

  validationHandler({videoId: videoIdSchema}, 'params'),

  async (req, res, next) => {
    const {videoId} = req.params;
    try {
      const video = await videosService.getVideo(videoId);
      res.status(200).json({message: 'Video', data: video});
    } catch (error) {
      next(error)
    }
  }
);

router.post('/', 

  validationHandler(createVideoSchema),

  async (req,res, next) => {
    const {body: video} = req;
    try {
      const createVideoId = await videosService.createVideo(video);
      res.status(201).json({message: 'Video creado correctamente', data: createVideoId});
    } catch (error) {
      next(error)
    }
});

router.put('/:videoId', 

  validationHandler({videoId: videoIdSchema}, 'params'),
  validationHandler(updateVideoSchema),

  async (req, res, next) => {
    const {videoId} = req.params;
    const {body: video} = req;
    try {
      const updateVideoId = await videosService.updateVideo(videoId, video);
      res.status(200).json({message: 'Video actualizado', data: updateVideoId});
    } catch (error) {
      next(error)
    }
});

router.delete('/:videoId', 

  validationHandler({videoId: videoIdSchema}, 'params'),  

  async (req,res, next) => {
    const {videoId} = req.params;
    try {
      const deleteVideoId = await videosService.deleteVideo(videoId);
      res.status(200).json({message: 'Video eliminado', data: deleteVideoId });
    } catch (error) {
      next(error)
    }
});

module.exports = router;