"use strict";
require("dotenv").config();


module.exports = {
    // Messenger Platform API
    mPlatformDomain: "https://graph.facebook.com",
    mPlatformVersion: "v3.2",

    // Page and Application information
    pageId: process.env.PAGE_ID,
    appId: process.env.APP_ID,
    pageAccesToken: process.env.PAGE_ACCESS_TOKEN,
    appSecret: process.env.APP_SECRET,
    verifyToken: process.env.VERIFY_TOKEN,

    // Database Connection
    connectionString: process.env.DB_CONNECTION,

    appUrl: process.env.APP_URL,
}