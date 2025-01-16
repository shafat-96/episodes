import express from 'express';
import cors from 'cors';
import { fetchEpisodesData } from './actions/episode';
import { getProvider } from './providers';

// Define types
interface Episode {
  id: string;
  // ... other fields
}

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

app.get('/:id', async (req:any, res: any) => {
  try {
    const { id } = req.params;
    const { provider} = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Missing required ID parameter'
      });
    }

    if (provider) {
      const selectedProvider = getProvider(provider as string);
      if (!selectedProvider) {
        return res.status(400).json({
          success: false,
          error: 'Invalid provider specified'
        });
      }
    }

    const episodesData = await fetchEpisodesData(id, provider as string | null);

    return res.status(200).json(episodesData);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

export default app;