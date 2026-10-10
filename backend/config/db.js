import dns from "node:dns";
import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUrl = process.env.MONGOURL;
    if (!mongoUrl) {
        throw new Error("MONGOURL is not set.");
    }

    try {
        await mongoose.connect(mongoUrl);
    } catch (error) {
        if (error.code !== "ECONNREFUSED" || error.syscall !== "querySrv") {
            throw error;
        }

        const dnsServers = (process.env.MONGODB_DNS_SERVERS || "1.1.1.1,8.8.8.8")
            .split(",")
            .map((server) => server.trim())
            .filter(Boolean);
        if (dnsServers.length === 0) {
            throw new Error("MONGODB_DNS_SERVERS must contain at least one DNS server.");
        }

        dns.setServers(dnsServers);
        await mongoose.connect(mongoUrl);
    }

    console.log("connected to database");
};

export default connectDB;