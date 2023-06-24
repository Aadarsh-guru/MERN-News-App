import News from '../modals/newsModel.js'
import { gridFs, gridFsBucket } from '../helpers/gridFsStrorageConfig.js'

export const createNewsController = async (req, res) => {
    try {
        const { title, description, category, meta, keywords, type, author } = req.body;
        if (!title || !description || !category || !author) {
            return res.status(200).json({ message: 'title, Description, Category, Author are Required.', success: false })
        }
        const news = await News({
            title: title,
            description: description,
            category: category,
            meta: meta,
            keywords: keywords,
            type: type,
            author: author,
            image: req?.file?.filename,
            userId: req?.userId
        }).save()
        return res.status(201).json({ message: `${type === 'draft' ? 'News moved to draft.' : type === 'bin' ? 'News moved to bin.' : 'News created successfully.'}`, success: true, news })
    } catch (error) {
        return res.status(500).json({ message: 'Error while creating the news.', error: error.message, success: false })
    }
}

export const getNewsImage = async (req, res) => {
    try {
        const file = await gridFs.files.findOne({ filename: req.params.filename })
        if (!file) {
            return res.status(200).json({ message: 'Image Does Not Exist.', success: false })
        }
        const readStream = gridFsBucket.openDownloadStream(file._id);
        res.set("Content-type", file.contentType)
        readStream.pipe(res);
    } catch (error) {
        return res.status(500).json({ message: 'Error while getting news image.', error, success: false })
    }
}

export const getUserTypeNews = async (req, res) => {
    try {
        if (!req.params.type || req.params.type === 'create') {
            return res.status(200).json({ message: 'invalid type', success: false })
        }
        const perPage = 5;
        const page = req.params.page ? req.params.page : 1;
        const news = await News.find({ $and: [{ userId: req.userId }, { type: req.params.type }] }).skip((page - 1) * perPage).limit(perPage).sort({ updatedAt: 'descending' })
        if (news.length > 0) {
            return res.status(200).json({ message: 'All News Fetched Successfully', success: true, news })
        } else {
            return res.status(200).json({ message: 'No more news to fetch.', success: false })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while creating the news.', error: error.message, success: false })
    }
}

export const getUserCategoryNews = async (req, res) => {
    try {
        const perPage = 5;
        const page = req.params.page ? req.params.page : 1;
        if (!req.params.category || req.params.category === 'all-news') {
            const news = await News.find({ $and: [{ userId: req.userId }, { type: 'publish' }] }).skip((page - 1) * perPage).limit(perPage).sort({ updatedAt: 'descending' })
            if (news.length > 0) {
                return res.status(200).json({ message: 'All News Fetched Successfully', success: true, news })
            } else {
                return res.status(200).json({ message: 'No more news to fetch.', success: false })
            }
        } else {
            const news = await News.find({ $and: [{ userId: req.userId }, { type: 'publish' }, { category: req.params.category }] }).skip((page - 1) * perPage).limit(perPage).sort({ updatedAt: 'descending' })
            if (news.length > 0) {
                return res.status(200).json({ message: 'All News Fetched Successfully', success: true, news })
            } else {
                return res.status(200).json({ message: 'No more news to fetch.', success: false })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while creating the news.', error: error.message, success: false })
    }
}

export const getAllNewsController = async (req, res) => {
    try {
        const perPage = 5;
        const page = req.params.page ? req.params.page : 1;
        const news = await News.find({ type: 'publish' }).skip((page - 1) * perPage).limit(perPage).sort({ updatedAt: 'descending' })
        if (news.length > 0) {
            return res.status(200).json({ message: 'All News Fetched Successfully', success: true, news })
        } else {
            return res.status(200).json({ message: 'No more news to fetch.', success: false })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while creating the news.', error: error.message, success: false })
    }
}

export const getAllNewsByCategoryController = async (req, res) => {
    try {
        if (req.params.category) {
            const perPage = 5;
            const page = req.params.page ? req.params.page : 1;
            const news = await News.find({ $and: [{ type: 'publish' }, { category: req.params.category }] }).skip((page - 1) * perPage).limit(perPage).sort({ updatedAt: 'descending' })
            if (news.length > 0) {
                return res.status(200).json({ message: `${req.params.category} News Fetched Successfully`, success: true, news })
            } else {
                return res.status(200).json({ message: 'No more news to fetch.', success: false })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while creating the news.', error: error.message, success: false })
    }
}

export const moveToBinController = async (req, res) => {
    try {
        if (req.params?.id) {
            const news = await News.findByIdAndUpdate(req.params?.id, { type: 'bin' })
            return res.status(200).json({ message: 'News moved to bin.', success: true, news })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while moving to bin the news.', error: error.message, success: false })
    }
}

export const deletePermanantlyController = async (req, res) => {
    try {
        if (req.params?.id) {
            const news = await News.findByIdAndDelete(req.params?.id)
            const image = await gridFs.files.findOne({ filename: news?.image })
            await gridFsBucket.delete(image?._id)
            return res.status(200).json({ message: 'News Deleted Successfully', success: true, news })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while deleting the news.', error: error.message, success: false })
    }
}

export const publishNewsController = async (req, res) => {
    try {
        if (req.params?.id) {
            const news = await News.findByIdAndUpdate(req.params?.id, { type: 'publish' })
            return res.status(200).json({ message: 'News published', success: true, news })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while publishing the news.', error: error.message, success: false })
    }
}

export const restoreNewsController = async (req, res) => {
    try {
        if (req.params?.id) {
            const news = await News.findByIdAndUpdate(req.params?.id, { type: 'draft' })
            return res.status(200).json({ message: 'News restored in draft.', success: true, news })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while restoring the news.', error: error.message, success: false })
    }
}

export const getSingleNewsController = async (req, res) => {
    try {
        if (req.params?.id) {
            const news = await News.findById(req.params?.id)
            return res.status(200).json({ message: 'News fetched successfully..', success: true, news })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while restoring the news.', error: error.message, success: false })
    }
}

export const updateNewsController = async (req, res) => {
    try {
        const { title, description, category, meta, keywords } = req.body;
        if (!title || !description || !category) {
            return res.status(200).json({ message: 'title, Description, Category are Required.', success: false })
        }
        const newsData = await News.findById(req.params?.id)
        if (req.file?.filename) {
            const previousImage = await gridFs.files.findOne({ filename: newsData?.image })
            await gridFsBucket.delete(previousImage._id)
            const news = await News.findByIdAndUpdate(req.params?.id, {
                title: title,
                description: description,
                category: category,
                meta: meta,
                keywords: keywords,
                image: req?.file?.filename,
            })
            return res.status(201).json({ message: `News updated successfully.`, success: true, news })
        } else {
            const news = await News.findByIdAndUpdate(req.params?.id, {
                title: title,
                description: description,
                category: category,
                meta: meta,
                keywords: keywords,
            })
            return res.status(201).json({ message: `News updated successfully.`, success: true, news })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while updating the news.', error: error.message, success: false })
    }
}



