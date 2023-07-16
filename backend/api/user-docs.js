import express from 'express';
import { Document } from '../schema/schema.js';
import { isUserAuthenticated } from "../middlewares.js";

const router = express.Router();

router.get('/user/docs', isUserAuthenticated,async (req, res) => {
  const userId = req.user._id;

  try {
    // Find all documents owned by the user
    const documents = await Document.find({ owner: userId });

    res.status(200).json({ documents });
  } catch (error) {
    console.error('Error fetching user documents:', error);
    res.status(500).json({ message: 'Failed to fetch user documents' });
  }
});

export {router as userDocsRouter};
