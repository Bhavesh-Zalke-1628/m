import { RuleTester } from "eslint";
import conf from "../Config/conf";
import { Client, id, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  clinet = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.clinet);
    this.storage = new Storage(this.clinet);
  }

  // Post Services
  async createPost({ title, slug, content, featuredImg, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("The apprite service error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
        }
      );
    } catch (error) {
      console.log("Update Poist", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Delte post:", error);
      return false;
    }
  }

  async getPost() {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("GetPost", error);
      return false;
    }
  }
  
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // File uploade
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Delete File
  async deleteFile(fileID) {
    try {
      return this.bucket.deleteFile(conf.appWriteBucketId, fileID);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // File Preview

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appWriteBucketId, fileId);
  }
}

const service = new Service();
export default Service;
