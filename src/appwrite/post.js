import conf from "../conf/conf";
import { Client, Databases, Query } from "appwrite";

class PostService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);

  }
  //slug is unique id
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost error ::  ", error);
    }
  }

  //sending slug seperately cuz DOCUMENT_ID for which are updating has to be sent
  //not updating userId cuz not needed
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost error ::  ", error);
    }
  }

  //here we wont return the response but true or false its upto frontend how it will handle, there's nothing wrong in returning the response
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost error ::  ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost error ::  ", error);
      return null;
    }
  }
  // we want all values whose status is active, else listDocuments gives all the docs
  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getAllPosts error :: ", error);
      return false;
    }
  }
}

const postService = new PostService();

export default postService;