const express = require('express');
const helpers = require('./answerModel');
const userHelpers = require('../users/usersModel');
const restrict = require('../middleware/restrict');

const router = express.Router();

router.post('/', restrict(), async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data)
        const createAnw = await helpers.createAns(data);
        res.status(201).json({
            message: "Answer Created"
        })
    } catch (e) {
        console.log(e)
    }
});

router.get('/:id', restrict(),  async (req, res, next) => {
    try {
        const { id } = req.params;
        const answers = await helpers.getAns(id);

        async function userData(arr) {
            const user = await userHelpers.findById(arr.user_id);
            return {
                ...arr,
                username: user.username
            }
        }

        const getData = async () => {
            return await Promise.all(answers.map(arr => userData(arr)))
        };

        getData().then(data => {
            res.json(data)
        })

    } catch (e) {
        console.log(e)
    }
});

router.put('/:id', restrict(),  async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const answer = await helpers.updateAns(id, data);
    res.status(204).json({
        message: `answer with id of ${id} has been updated`
    })
});

router.delete('/:id', restrict(),  async (req, res, next) => {
    try {
        const { id } = req.params;
        const delAns = await helpers.delAns(id);
        res.status(204).json({
            message: `Answer with the id of ${id} has been deleted`
        })
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;