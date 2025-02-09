import express, { Request, Response } from "express";
import { getProvider } from "../providers";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json([{ routes: ["/episodes/:id"] }]);
});

// router.get("/episodes/:id", async (req: any, res: any) => {
//   try {
//     const { id } = req.params;
//     const { provider } = req.query;

//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required ID parameter",
//       });
//     }

//     if (provider) {
//       const selectedProvider = getProvider(provider as string);
//       if (!selectedProvider) {
//         return res.status(400).json({
//           success: false,
//           error: "Invalid provider specified",
//         });
//       }
//     }
//     // const episodesData = await fetchEpisodesData(
//     //   id,
//     //   (provider as string) || "zoro"
//     // );

//     // return res.status(200).json(episodesData);
//     return res.status(200).json({ msg: "wip" });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({
//       success: false,
//       error: "Internal server error",
//     });
//   }
// });

router.get("/watch/:tmdbId", async (req: any, res: any) => {
  try {
    const { tmdbId } = req.params;
    const { type, episodeNumber, seasonNumber, server } = req.query;

    if (!tmdbId) {
      return res.status(400).json({
        success: false,
        error: "Missing either tmdbId parameter",
      });
    }

    if (!type || !seasonNumber || !episodeNumber) {
      return res.status(400).json({
        success: false,
        error: "Missing either type, seasonNumber or episodeNumber parameter",
      });
    }

    const streams = await getProvider("tmdb").fetchEpisodesSources({
      tmdbId,
      episodeNumber,
      seasonNumber,
      type,
      server,
    });

    return res.status(200).json(streams);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;
