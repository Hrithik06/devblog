import conf from '../conf/conf';
import { Client, Databases, Query, ID } from 'appwrite';
import { timeToRead } from '../conf/helper';

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
    async createPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId,
        author,
    }) {
        const id = ID.unique();
        try {
            const newPost = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    featuredImage,
                    status,
                    userId,
                    author,
                    slug,
                    timeToRead: timeToRead(content),
                },
            );
            if (newPost) {
                await this.createFullContent(id, content);
            }
        } catch (error) {
            console.log('Appwrite service :: createPost error ::  ', error);
        }
    }

    async createFullContent(id, content) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionFullContentId,
                id,
                { content },
            );
        } catch (error) {
            console.log(
                'Appwrite service :: createFullContent error ::  ',
                error,
            );
        }
    }

    //sending slug seperately cuz DOCUMENT_ID for which are updating has to be sent
    //not updating userId cuz not needed
    async updatePost(id, { title, content, featuredImage, status, slug }) {
        try {
            const editPost = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    featuredImage,
                    status,
                    slug,
                    timeToRead: timeToRead(content),
                },
            );
            if (editPost) {
                await this.updateFullContent(id, content);
            }
            return editPost;
        } catch (error) {
            console.log('Appwrite service :: updatePost error ::  ', error);
        }
    }

    async updateFullContent(id, content) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionFullContentId,
                id,
                { content },
            );
        } catch (error) {
            console.log(
                'Appwrite service :: updateFullContent error ::  ',
                error,
            );
        }
    }

    //here we wont return the response but true or false its upto frontend how it will handle, there's nothing wrong in returning the response
    async deletePost(id) {
        try {
            const del = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
            );
            if (del) {
                await this.deleteFullContent(id);
            }

            return true;
        } catch (error) {
            console.log('Appwrite service :: deletePost error ::  ', error);
            return false;
        }
    }

    async deleteFullContent(id) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionFullContentId,
                id,
            );
        } catch (error) {
            console.log(
                'Appwrite service :: deleteFullContent error ::  ',
                error,
            );
        }
    }

    async getPost(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
            );
        } catch (error) {
            console.log('Appwrite service :: getPost error ::  ', error);
            return null;
        }
    }
    async getFullContent(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionFullContentId,
                id,
            );
        } catch (error) {
            console.log('Appwrite service :: getFullContent error ::  ', error);
            return null;
        }
    }
    // we want all values whose status is active, else listDocuments gives all the docs
    async getAllPost(queries = [Query.equal('status', 'active')]) {
        try {
            const dbResponse = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );

            return dbResponse;
        } catch (error) {
            console.log(
                'Appwrite service :: getAllPost error :: ',
                error.message,
            );
            return false;
        }
    }
    async getMyPost(id) {
        const queries = [Query.equal('userId', id)];
        try {
            const dbResponse = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );

            return dbResponse;
        } catch (error) {
            console.log(
                'Appwrite service :: getAllPost error :: ',
                error.message,
            );
            return false;
        }
    }
}

const appwritePostService = new PostService();

export default appwritePostService;
