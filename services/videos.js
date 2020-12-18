const MongoLib = require('../lib/mongo');

class VideosService {

  constructor(){
    this.collection = 'videos';
    this.mongoDB = new MongoLib();
  }

  async getVideos(tags) {
    // const query = tags && {tags: {$in: tags}};
    const videos = await this.mongoDB.getAll(this.collection, {});
    return videos || [];
  }

  async getVideo(id) {
    const video = await this.mongoDB.getOne(this.collection, id);
    return video || {};
  }

  async createVideo(data) {
    const createMoviId = await this.mongoDB.createOne(this.collection, data);
    return createMoviId;
  }

  async updateVideo(id, data) {
    const updateVideoId = await this.mongoDB.updateOne(this.collection, id, data );
    return updateVideoId;
  }

  async deleteVideo(id) {
    const deleteVideoId = await this.mongoDB.deleteOne(this.collection, id);
    return deleteVideoId;
  }
}

module.exports = VideosService;