const Ride = require('../models/Rides');

exports.createRide = async (req, res) => {
  try {
    const { pickup, dest } = req.body;
    const ride = await Ride.create({ user: req.userId, pickup, dest });
    res.status(201).json(ride);
  } catch {
    res.status(500).json({ error: 'Ride creation failed' });
  }
};

exports.getRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride || ride.user.toString() !== req.userId) {
      return res.status(404).json({ error: 'Ride not found' });
    }
    res.json(ride);
  } catch {
    res.status(500).json({ error: 'Failed to fetch ride' });
  }
};
