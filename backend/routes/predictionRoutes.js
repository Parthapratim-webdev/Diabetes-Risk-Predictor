const express = require('express');
const {
  submitPrediction,
  getPredictions,
  getPredictionById,
  deletePrediction,
} = require('../controllers/predictionController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', submitPrediction);
router.get('/', getPredictions);
router.get('/:id', getPredictionById);
router.delete('/:id', deletePrediction);

// Also mount /predict directly on this router for backwards compatibility
router.post('/predict', submitPrediction);

module.exports = router;
