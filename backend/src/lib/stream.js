import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM API KEY or STREAM API SECRET is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting user to Stream:", error);
    throw error;
  }
}

export const generateStreamToken = async (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};

export default streamClient;