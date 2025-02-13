const express = require('express')
const { handleGenerateNewShortURL, handleGetAllShortURLs, handleGetAnalytics, handleDeleteShortURL, handleUrlRedirect } = require('../controllers/urlController')

const router = express.Router()


router
    .route('/')
    .post(handleGenerateNewShortURL)
    .get(handleGetAllShortURLs)

router
    .route('/:shortId')
    .get(handleUrlRedirect)
    .delete(handleDeleteShortURL)

router
    .route('/analytics/:shortId')
    .get(handleGetAnalytics)


module.exports = router;