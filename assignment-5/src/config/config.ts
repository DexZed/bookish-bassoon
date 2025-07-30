import "dotenv/config";

export default () =>({
NODE_ENV: process.env.NODE_ENV || "development",
PORT: process.env.PORT || 3000,
DB_HOST: process.env.DB_HOST || "localhost",
DB_PASSWORD: process.env.DB_PASSWORD || "password",
DB_NAME: process.env.DB_NAME || "TEST",
ACCESS_TOKEN: process.env.ACCESS_TOKEN || "ACCESS_TOKEN",
REFRESH_TOKEN: process.env.REFRESH_TOKEN || "REFRESH_TOKEN"

});