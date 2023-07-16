import express from 'express';
import { Document } from '../schema/schema.js';
import { isUserAuthenticated } from "../middlewares.js";

const router = express.Router();

router.get('/doc/validate/:id', isUserAuthenticated,async (req, res) => {
  const documentId = req.params.id;

  try {
    const document = await Document.findById(documentId);
    if (document) {
      // Document exists
      res.status(200).json({ message: 'Document exists' });
    } else {
      // Document not found
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    // Error occurred while querying the database
    res.status(500).json({ message: 'Error occurred while validating document' });
  }
});

export {router as validateDocRouter};
