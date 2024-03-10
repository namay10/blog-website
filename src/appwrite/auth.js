import conf from "../conf/conf";
import { Client,Account,ID } from "appwrite";
export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        
        .setEndpoint(conf.appwrite)
        .setProject(conf.projectid);
        this.account=new Account(this.client);
    }
    async createAccount({email, password,name}){
        try{
            const useraccount=await this.account.create(ID.unique(),email,password,name);
            if(useraccount){
                //create method
                return this.login({email,password});
            }
            else
            return useraccount
        }catch(e){
            console.error('Error in createAccount:', e);
           throw e;
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
            
        } catch (error) {
            console.error('Error in login:', error);
            throw error;
        }
    }
    async getuser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.error('Error in getuser:', error);
            throw error;
        }
        return null; 
    
    }
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error('Error in logout:', error);
            throw error;
        }
    }
}
const authservice =new AuthService();
export default authservice;