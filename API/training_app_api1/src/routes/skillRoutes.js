const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.get('/skills', skillController.getSkills);
router.post('/', skillController.createSkill);
router.put('/:id', skillController.editSkill);
router.delete('/:id', skillController.deleteSkill);
router.get('/skillById/:id', skillController.skillById);



module.exports = router;