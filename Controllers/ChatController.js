import ChatModel from "../Models/chatModel.js";
export const createChat = async (req, res) => {
  console.log("im herwetw");
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
      const result = await newChat.save();
      res.status(200).json(result)
  } catch (error) {
     res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    console.log(req.params.userId);
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat); // Changed from res.send(200).json(chat) to res.status(200).json(chat)
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat)

    } catch (error) {
         res.status(500).json(error);
    }
}
