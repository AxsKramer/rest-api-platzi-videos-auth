const router = require('express').Router();
const UserVideosService =require('../services/userVideos');
const validationHandler = require('../utils/middleware/validationHandler');
const {videoIdSchema} = require('../utils/schemas/videoSchema');
const {userIdSchema} = require('../utils/schemas/userSchema');
const {createUserMovieSchema} = require('../utils/schemas/userVideoSchema');

const userVideosService = new UserVideosService();

router.get('/', 

  validationHandler({userId: userIdSchema}, 'query'),

  async (res, req, next) => {
    const {userId} = req.query;

    try{
      const userVideos = await userVideosService.getUserVideos(userId);
      res.status(200).json({
        data: userVideos,
        message: 'user videos listed'
      });
    }catch(error){
      next(error);
    }
  }
);

router.post('/', 

  validationHandler(createUserMovieSchema),

  async (req, res, next) => {
    const {body: userVideo} = req;

    try {
      const createdUserVideos = await userVideosService.createUserVideo(userVideo);
      res.status(200).json({
        data: createdUserVideos,
        message: 'user video created'
      })
    } catch (error) {
      next(error)
    }
  }

);

router.delete('/:userVideoId', 
  validationHandler({useMovieId: videoIdSchema}, 'params'),

  async (req, res, next) => {
    const {useMovieId} = req.params;

    try {
      const deletedUserMovieId = await userVideosService.deleteUserVideo(useMovieId);
      res.status(200).json({
        data: deletedUserMovieId,
        message: 'user video deleted'
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = {
  userVideosRoute = router
};