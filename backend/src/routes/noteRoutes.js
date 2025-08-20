import express from 'express';
import * as notes from '../controllers/notesController.js';
import auth from '../middleware/authMiddleware.js';
import validateRequestId from '../middleware/validateRequest.js';

const router = express.Router();

// Auth-required list & create
router.get('/', auth, notes.listNotes);
router.post('/', auth, notes.createNote);

// Single note operations (auth)
router.get('/:id', auth, validateRequestId('id'), notes.getNote);
router.put('/:id', auth, validateRequestId('id'), notes.updateNote);
router.delete('/:id', auth, validateRequestId('id'), notes.deleteNote);

// Sharing & public
router.post('/:id/share', auth, validateRequestId('id'), notes.createShare);
router.get('/public/:shareId', notes.getPublicByShareId);

export default router;
