import { Client, Databases } from 'appwrite';
import conf from '../conf/conf';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(conf.appwriteEndpoint)
    .setProject(conf.appwriteProjectId);

const databases = new Databases(client);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = await databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
            );
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
