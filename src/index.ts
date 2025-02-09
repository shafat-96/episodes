import express from "express";
import cors from "cors";
import { fetchEpisodesData } from "./anime/episode";
import { getProvider } from "./providers";
import { Episode } from "./utils/types";
import router from "./routes";

interface ApiResponse {
  data?: Episode[];
  success?: boolean;
  error?: string;
  isDub?: boolean;
}

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

app.use("/",router)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

export default app;
