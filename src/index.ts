import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes";
dotenv.config();
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
