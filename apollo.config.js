require("dotenv").config({ path: __dirname + "/.env.dev_only" });

module.exports = {
    client: {
        service: {
            name: "myradio-dev",
            url: "https://ury.org.uk/api-dev/graphql?api_key=" + process.env.MYRADIO_API_KEY
        }
    }
}