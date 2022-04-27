import http from 'http';
import express, { Express } from "express";
import shipmentsRouter from "./routes/shipments";
import usersRouter from "./routes/users";
import connectDB from "./config/database";
import path from "path";
import cors from "cors";

// app config
const app: Express = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());
//Error handling
/*app.use((req:any, res:any, next:any) => {
  const error = new Error('not found');
  return res.status(404).json({
      message: error
  });
});*/

// endpoints
app.use("/api/shipments", shipmentsRouter);
app.use("/api/users", usersRouter);

// DB config
connectDB();

/** RULES OF OUR API */
app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  next();
});

// Server frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req: any, res: any) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req: any, res: any) => {
    res.send("Please set to production");
  });
}

/** Server */
const httpServer = http.createServer(app);
//const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
// listner
//app.listen(PORT, () => console.log(`app runnig on ${PORT}`));
