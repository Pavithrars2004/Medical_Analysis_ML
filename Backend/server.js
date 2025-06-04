require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const predictionRoutes = require("./routes/predict");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/predict", predictionRoutes);


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Store connected users by phone number
let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Store user phone number when they join
  socket.on("register", (phoneNumber) => {
    users[phoneNumber] = socket.id;
    console.log(`User ${phoneNumber} registered with socket ID ${socket.id}`);
  });

  // Initiate call to a specific user
  socket.on("startCall", ({ from, to, offer }) => {
    if (users[to]) {
      io.to(users[to]).emit("incomingCall", { from, offer });
    }
  });

  // Respond to call with answer
  socket.on("answerCall", ({ to, answer }) => {
    if (users[to]) {
      io.to(users[to]).emit("callAnswered", answer);
    }
  });

  // Exchange ICE candidates
  socket.on("candidate", ({ to, candidate }) => {
    if (users[to]) {
      io.to(users[to]).emit("candidate", candidate);
    }
  });

  // Remove user on disconnect
  socket.on("disconnect", () => {
    for (let phone in users) {
      if (users[phone] === socket.id) {
        delete users[phone];
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
