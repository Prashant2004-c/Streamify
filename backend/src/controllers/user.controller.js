import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        {_id: {$ne: currentUserId}}, // exclude current user
        {_id: {$nin: currentUser.friends}}, // exclude current user's friends
        {isOnboarded: true}, // only include onboarded users
      ]
    })
    // .select("-password")
    // .limit(1);

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id)
    .select("friends")
    .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(user.friends);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
    });
  }
};

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user._id;
    const { id:recipientId } = req.params;

    // prevent sending friend request to yourself
    if (myId.toString() === recipientId) {
      return res.status(400).json({
        message: "You cannot send a friend request to yourself",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "Recipient not found",
      });
    }

    // check if friend request already exists
    if(recipient.friends.includes(myId)) {
      return res.status(400).json({
        message: "You are already friends with this user",
      })
    }

    // check if friend request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        {sender: myId, recipient: recipientId},
        {sender: recipientId, recipient: myId},
      ]
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Friend request already exists",
      });
    }

    // create friend request
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export async function acceptFriendRequest(req, res) {
  try {
    const { id:requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found",
      });
    }

    // check if user is the recipient of the friend request
    if(friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to accept this friend request",
      })
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to each other's friends array
    // $addToSet is used to avoid duplicates
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient }
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender }
    });

    res.status(200).json({
      message: "Friend request accepted",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
    });
  }
};

export async function getFriendRequests(req, res) {
  try {
    const incomingRequests = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    })
    .populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({
      incomingRequests,
      acceptedRequests
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};