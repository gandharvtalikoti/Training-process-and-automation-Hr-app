const express = require('express');
const router = express.Router();
const subSkillController = require('../controllers/subSkillController');

router.get('/subSkills', subSkillController.getSubSkills);
router.post('/', subSkillController.createSubSkill);
router.put('/:id', subSkillController.editSubSkill);
router.delete('/:id', subSkillController.deleteSubSkill);
router.get('/skillById/:id', subSkillController.subSkillById);



module.exports = router;