const express = require('express');
const Typo = require('../models/Typo');
const router = express.Router();

// GET /api/typos - Get all typos
router.get('/', async (req, res) => {
  try {
    const typos = await Typo.find().sort({ createdAt: -1 });
    
    // Transform MongoDB documents to match frontend expectations
    const formattedTypos = typos.map(typo => ({
      id: typo._id.toString(),
      wrongWord: typo.wrongWord,
      correctWord: typo.correctWord,
      person: typo.person,
      context: typo.context || '',
      timestamp: typo.createdAt,
      addedBy: typo.addedBy
    }));

    res.json(formattedTypos);
  } catch (error) {
    console.error('Error fetching typos:', error);
    res.status(500).json({ error: 'Failed to fetch typos' });
  }
});

// POST /api/typos - Add new typo
router.post('/', async (req, res) => {
  try {
    const { wrongWord, correctWord, person, context, addedBy } = req.body;

    if (!wrongWord || !correctWord || !person) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTypo = new Typo({
      wrongWord,
      correctWord,
      person,
      context: context || '',
      addedBy: addedBy || 'Unknown'
    });

    const savedTypo = await newTypo.save();

    // Format response to match frontend expectations
    const formattedTypo = {
      id: savedTypo._id.toString(),
      wrongWord: savedTypo.wrongWord,
      correctWord: savedTypo.correctWord,
      person: savedTypo.person,
      context: savedTypo.context,
      timestamp: savedTypo.createdAt,
      addedBy: savedTypo.addedBy
    };

    res.status(201).json(formattedTypo);
  } catch (error) {
    console.error('Error adding typo:', error);
    res.status(500).json({ error: 'Failed to add typo' });
  }
});

// PUT /api/typos/:id - Update typo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { wrongWord, correctWord, context } = req.body;

    const updateData = {};
    if (wrongWord) updateData.wrongWord = wrongWord;
    if (correctWord) updateData.correctWord = correctWord;
    if (context !== undefined) updateData.context = context;

    const updatedTypo = await Typo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTypo) {
      return res.status(404).json({ error: 'Typo not found' });
    }

    // Format response to match frontend expectations
    const formattedTypo = {
      id: updatedTypo._id.toString(),
      wrongWord: updatedTypo.wrongWord,
      correctWord: updatedTypo.correctWord,
      person: updatedTypo.person,
      context: updatedTypo.context,
      timestamp: updatedTypo.createdAt,
      addedBy: updatedTypo.addedBy
    };

    res.json(formattedTypo);
  } catch (error) {
    console.error('Error updating typo:', error);
    res.status(500).json({ error: 'Failed to update typo' });
  }
});

// DELETE /api/typos/:id - Delete typo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedTypo = await Typo.findByIdAndDelete(id);
    
    if (!deletedTypo) {
      return res.status(404).json({ error: 'Typo not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting typo:', error);
    res.status(500).json({ error: 'Failed to delete typo' });
  }
});

module.exports = router;