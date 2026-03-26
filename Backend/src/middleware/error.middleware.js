require("dotenv").config()

async function errorHandler(err, req, res, next) {
    const response = {
        success: false,
        message: err.message

    }
    res.status(err.status).json(response)

}
module.exports = {errorHandler}
