import express from "express";

const notfoundRouter = express.Router();

notfoundRouter.use((_, res) => {
  res.status(404).send("Path not found.");
});

export default notfoundRouter;
