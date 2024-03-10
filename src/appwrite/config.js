import conf from "../conf/conf";
import { Client,ID,Databases,Query,Storage} from "appwrite";
export class Service{
    client =new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwrite)
        .setProject(conf.projectid);
        this.databases=new Databases(this.client);
        this.storage=new Storage(this.client);

    }
    async createpost({title, slug,content, featuredImage,status,userId}){
            try {
                return await this.databases.createDocument(
                    conf.databaseid,
                    conf.collectionid,
                    slug,
                    {title,
                    content,
                    featuredImage,
                    status,
                    userId,
                });
                } catch (error) {
                throw error;
                }
    }
    async udpdatepost(slug,{title,content, featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.databaseid,
                conf.collectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                });            
            } catch (error) {
            throw error;
            }

    }
    async deletepost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.databaseid,
                conf.collectionid,
                slug
                )
                return true;            
            } catch (error) {
            throw error;
            return false;
            }
    }
    async getpost(slug){
        try {
            return await this.databases.getDocument(
                conf.databaseid,
                conf.collectionid,
                slug
                )
                return true;            
            } catch (error) {
            throw error;
            return false;
            }
    }
    async getposts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.databaseid,
                conf.collectionid,
                queries,
                )
        } catch (error) {
            throw error;
            return false;
        }
    }
    //file upload 
    async uploadfile(){
        try {
            return await this.storage.createFile(
                conf.bucketid,            
                ID.unique(),
                file
            );

        } catch (error) {
            throw error;
            return false;
        }
    }
    async deletefile(fileid){
        try {
            return await this.storage.deleteFile(
                conf.bucketid,
                fileid,
                )
                return true;

        } catch (error) {
            throw error;
            return false;
        }
    }
    getfilepreview(fileid){
        return this.storage.getFilePreview(conf.bucketid,fileid);
    }
}
const service =new Service();
export default service;