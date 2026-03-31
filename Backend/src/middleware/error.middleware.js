require("dotenv").config()

async function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || err.status || 500

    const response = {
        success: false,
        message: err.message || "Internal Server Error"
    }

    res.status(statusCode).json(response)
}

module.exports = { errorHandler }
