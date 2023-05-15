import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();  // this line allows to pull our enviornment variables from our dotenv file.

const app = express();  // initilizing express
app.use(cors()); // additional midile wares
app.use(express.json({ limit: '50mb' }));   // additional midile wares

app.use('/api/v1/post', postRoutes);
// app.use('/api/v1/dalle', dalle);
app.use('/api/v1/dalle', dalleRoutes);


app.get('/', async (req, res) => {
  res.send("hello from dall e")
})

// app.get('/', async (req, res) => {
//   res.status(200).json({     // this ensures that our server is running once we visit to the link
//     message: 'Hello from AI-IGW!',
//   });
// });


// to run our server
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
