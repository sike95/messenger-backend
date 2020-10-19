const config = require('../config/config');
const camelCase = require("camelcase");
const request = require('request');

class GraphAPI {
    async getUserProfile(senderPsid) {
        try {
            const userProfile = await this.callUserProfileAPI(senderPsid);

            for (const key in userProfile) {
                const camelizedKey = camelCase(key);
                const value = userProfile[key];
                delete userProfile[key];
                userProfile[camelizedKey] = value;
            }

            return userProfile;
        } catch (err) {
            console.log("Fetch failed:", err);
        }
    }

    callUserProfileAPI(senderPsid) {
        return new Promise(function (resolve, reject) {
            let body = [];

            request({
                uri: `${config.mPlatformDomain}/${senderPsid}`,
                qs: {
                    access_token: config.pageAccesToken,
                    fields: "first_name, last_name, profile_pic, gender, locale, timezone"
                },
                method: "GET"
            })
                .on("response", function (response) {
                    if (response.statusCode !== 200) {
                        reject(Error(response.statusCode));
                    }
                })
                .on("data", function (chunk) {
                    body.push(chunk);
                })
                .on("error", function (error) {
                    console.error("Unable to fetch profile:" + error);
                    reject(Error("Network Error"));
                })
                .on("end", () => {
                    body = Buffer.concat(body).toString();
                    resolve(JSON.parse(body));
                });
        });
    }
}

module.exports = GraphAPI