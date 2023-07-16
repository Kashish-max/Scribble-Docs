import express from "express";
import { Document, User } from '../schema/schema.js'
import { isUserAuthenticated } from "../middlewares.js";

const router = express.Router();

router.get('/doc/users/:id', isUserAuthenticated, async (req, res) => {
    const documentId = req.params.id;
  
    try {
      // Find the document by ID
      const document = await Document.findById(documentId).populate('owner', 'fullName email');
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      // Get the owner's information
      const owner = {
        _id: document.owner._id,
        fullName: document.owner.fullName,
        email: document.owner.email,
      };
  
      // Find all collaborators and get their information
      const collaborators = await User.find({ _id: { $in: document.collaborators.map(c => c.user) } })
        .select('fullName email');
  
      // Return the users who can access the document
      const users = [owner, ...collaborators];
  
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching document users:', error);
      res.status(500).json({ message: 'Failed to fetch document users' });
    }
});
  
export {router as docUsersRouter};
