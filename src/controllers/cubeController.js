const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const cubeService = require('../services/cubeService');
const cubeUtils = require('../utils/cubeUtils');

exports.getCreateCube = (req, res) => {
    res.render('cube/create');
};

exports.postCreateCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficultyLevel,
        owner: req.user._id
    });

    await cube.save();

    res.redirect('/');
};

exports.getDetails = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId)
        .populate('accessories')
        .lean();

    if (!cube) {
        return res.redirect('/404');
    }

    const isOwner = cubeUtils.isOwner(req.user, cube);

    res.render('cube/details', { cube, isOwner });
};

exports.getAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean();
    const accessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean();

    res.render('cube/attach', { cube, accessories });
};

exports.postAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryId = req.body.accessory;
    cube.accessories.push(accessoryId);

    await cube.save();

    res.redirect(`/cubes/${cube._id}/details`);
};

exports.getEditCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    if (!cubeUtils.isOwner(req.user, cube)) {
        throw new Error('You are not an owner!');
    }
    
    res.render('cube/edit', { cube, difficultyLevels });
};

exports.postEditCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeService.update(req.params.cubeId, {
        name,
        description,
        imageUrl,
        difficultyLevel,
    });

   res.redirect(`/cubes/${req.params.cubeId}/details`); 
};

exports.getDeleteCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    res.render('cube/delete', { cube, difficultyLevels })
};

exports.postDeleteCube = async (req, res) => {
    await cubeService.delete(req.params.cubeId);

    res.redirect('/');
};