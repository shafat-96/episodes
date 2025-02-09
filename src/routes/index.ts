import express, { Request, Response } from "express";
import animeRouter from "./anime";
import moviesRouter from "./movies";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json([{ routes: ["/anime/", "/movies/"] }]);
});
router.use("/anime", animeRouter);
router.use("/movies", moviesRouter);

export default router;
