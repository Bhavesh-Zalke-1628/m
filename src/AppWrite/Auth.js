import conf from "../Config/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password }) {
        try {
            const userAccount = await this.account.create
                (ID.unique(), email, password, name)
            if (userAccount) {
                // Call another method
                return this.logIn({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async logIn({ email, password, name }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error
            // console.lo")
        }
        return null;
    }

    async logOut(){
        try {
            return await this.account.deleteSessions();

        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default AuthService;
