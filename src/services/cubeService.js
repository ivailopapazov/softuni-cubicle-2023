const Cube = require('../models/Cube');

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.update = (cubeId, data) => Cube.findByIdAndUpdate(cubeId, data, { runValidators: true });

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);