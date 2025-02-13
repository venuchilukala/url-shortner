const shortid = require('shortid')
const URL = require('../models/urlModel')

const handleGenerateNewShortURL = async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).json({ error: 'url is required. Please provide it' })
    }

    const shortID = shortid()

    await URL.create({
        shortId: shortID,
        redirectURL: url,
        visitHistory: [],
        createdBy : req.user._id
    })
    return res.render("home", {
        id: shortID
    })
    // return res.status(200).json({id : shortID})

}

const handleGetAllShortURLs = async (req, res) => {
    const urls = await URL.find()
    return res.status(200).json(urls)
}

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId

    const result = await URL.findOne({ shortId })
    console.log(result)

    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })

}

const handleDeleteShortURL = async (req, res) => {
    const shortId = req.params.shortId
    const deletedUrl = await URL.findOneAndDelete({ shortId })
    if (!deletedUrl) {
        return res.status(404).json({ message: "Url not found" })
    }
    return res.status(200).json({ message: `Deleted URL ${deletedUrl.redirectURL} whose short URL with ${deletedUrl.shortId}` })
}


const handleUrlRedirect = async (req, res) => {
    const shortId = req.params.shortId

    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: new Date().toLocaleString()
            }
        }
    })
    return res.redirect(entry.redirectURL)
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAllShortURLs,
    handleGetAnalytics,
    handleDeleteShortURL,
    handleUrlRedirect
}