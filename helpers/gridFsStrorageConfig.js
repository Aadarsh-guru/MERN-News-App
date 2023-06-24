import dotenv from "dotenv"
import multer from 'multer'
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage'
dotenv.config()

export const upload = multer({
    storage: new GridFsStorage({
        url: process.env.MONGO_URI,
        file: (req, file) => {
            return {
                bucketName: "media",
                filename: `${Date.now()}.${file.originalname.split('.').pop()}`
            }
        }
    }),
    fileFilter: function (req, file, callback) {
        if (!file.mimetype.includes('image')) {
            return callback(Error('Only Images are allowed.'), false)
        }
        callback(null, true)
    }
})


const conn = mongoose.connection;

export let gridFs;
export let gridFsBucket;

conn.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'media' })
    gridFs = Grid(conn.db, mongoose.mongo);
    gridFs.collection('media')
});