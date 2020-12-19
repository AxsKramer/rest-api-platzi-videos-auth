const MongoLib = require('../lib/mongo');

class UserVideosService{
  constructor(){
    this.collection = 'user-videos';
    this.mongoDB = new MongoLib();
  }

  async getUserVideos(userId){
    const query = userId && {userId};
    const userVideos = await this.mongoDB.getAll(this.collection, query);
    return userVideos || [];
  }

  async createUserVideo(userVideo){
    const createdUserVideoId = await this.mongoDB.createOne(this.collection, userVideo);
    return createdUserVideoId;
  }

  async deleteUserVideo(userVideoId){
    const deletedUserVideoId = await this.mongoDB.deleteOne(this.collection, userVideoId);
    return deletedUserVideoId;
  }
}

module.exports = UserVideosService;