import conf from '../conf/conf';
import { Client, Databases, Query } from 'appwrite';

class PostService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        // console.log(this.databases);
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
        console.log(content.substring(0, 100));

        try {
            const newPost = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId, author },
            );
            if (newPost) {
                await this.createFullContent(slug, content);
            }

            return newPost;
        } catch (error) {
            console.log('Appwrite service :: createPost error ::  ', error);
        }
    }

    async createFullContent(slug, content) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionFullContentId,
                slug,
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
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const editPost = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status },
            );
            if (editPost) {
                await this.updateFullContent(slug, content);
            }
            return editPost;
        } catch (error) {
            console.log('Appwrite service :: updatePost error ::  ', error);
        }
    }

    async updateFullContent(slug, content) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionFullContentId,
                slug,
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
    async deletePost(slug) {
        try {
            const del = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );
            if (del) {
                await this.deleteFullContent(slug);
            }

            return true;
        } catch (error) {
            console.log('Appwrite service :: deletePost error ::  ', error);
            return false;
        }
    }

    async deleteFullContent(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionFullContentId,
                slug,
            );
        } catch (error) {
            console.log(
                'Appwrite service :: deleteFullContent error ::  ',
                error,
            );
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );
        } catch (error) {
            console.log('Appwrite service :: getPost error ::  ', error);
            return null;
        }
    }
    async getFullContent(slug) {
        console.log(slug);

        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionFullContentId,
                slug,
            );
        } catch (error) {
            console.log('Appwrite service :: getFullContent error ::  ', error);
            return null;
        }
    }
    // we want all values whose status is active, else listDocuments gives all the docs
    async getAllPost(queries = [Query.equal('status', 'active')]) {
        // console.log(queries);

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
