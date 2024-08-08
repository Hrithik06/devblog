import conf from "../conf/conf";
import { Client, Storage } from "appwrite";

class FileService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }
  //file upload service
  // we need to send file blob not the name
  // createFile returns fileID this will passed as featureImage, createPost, also to deleteFile
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile error :: ", error);
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile error :: ", error);
      return false;
    }
  }
//no need of asyn-await here as it is very fast even in docs they aren't using
  getFilePreview(fileId){
    try {
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
    } catch (error) {
        console.log("Appwrite service :: getFilePreview error :: ", error);
    }
  }
}

const fileService = new FileService();

export default fileService;
