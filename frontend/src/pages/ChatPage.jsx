import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useAuthUser } from '../hooks/useAuthUser.js';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';
import { toast } from 'react-hot-toast';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from 'stream-chat';
import ChatLoader from '../components/ChatLoader.jsx';
import CallButton from '../components/CallButton.jsx';

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ['streamToken'],
    queryFn: getStreamToken,
    enabled: !!authUser // only run if authUser is available
  });

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;
      try {
        console.log("Initializing Stream Chat...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        }, tokenData.token);

        // create unique channel id
        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        })
        await currChannel.watch();
        setChatClient(client);
        setChannel(currChannel);

      } catch (error) {
        console.error("Error initializing Stream Chat:", error);
        toast.error("Failed to connect to chat");
      } finally {
        setLoading(false);
      }
    }
    initChat();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    }
  }, [tokenData, authUser, targetUserId, chatClient]);

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[98vh]">
      <Chat client={chatClient} >
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage
