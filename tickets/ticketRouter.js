const express = require('express');
const helpers = require('./ticketModel');
const userHelpers = require('../users/usersModel');
const restrict = require('../middleware/restrict');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', restrict(), async (req, res, next) => {
   try {
       const allTickets = await helpers.getAll();

       allTickets.map(arr => {
           const title = helpers.ticketCat(arr.id);
           return {
               ...arr,
               title
           }
       })

       async function catData(arr) {
            let ticketCats
           try {
                ticketCats = await helpers.ticketCat(arr.id)
               let placeholder = [];
                ticketCats.forEach(arr => {
                    placeholder.push(arr.title)
                })
               return {
                    ...arr,
                   categories: placeholder
               }
           } catch (e) {
               console.log(e)
           }
       }

       async function userData(arr) {
           try {
               const user = await userHelpers.findById(arr.user_id);
               return {
                   ...arr,
                   username: user.username
               }
           } catch (e) {
               console.log(e)
           }
       }

       const getData = async () => {
           const tickets = await Promise.all(allTickets.map(arr => catData(arr)));
           return await Promise.all(tickets.map(arr => userData(arr)))
       }

        getData().then(data => {
            res.status(200).json(data)
        })
   } catch (e) {
       console.log(e)
   }
});

router.get('/:id', restrict(), async (req, res, next) => {
   try {
       const { id } = req.params;
       let tickets = await helpers.getMyTickets(id);
        if (!tickets) {
            tickets = []
        }
        tickets.map(arr => {
            const title = helpers.ticketCat(arr.id);
            return {
                ...arr,
                title
            }
        })
       async function catData(arr) {
            let ticketCats
           try {
                ticketCats = await helpers.ticketCat(arr.id)
               let placeholder = [];
                ticketCats.forEach(arr => {
                    placeholder.push(arr.title)
                })
               return {
                    ...arr,
                   categories: placeholder
               }
           } catch (e) {
               console.log(e)
           }
       }

       const getData = async () => {
           return await Promise.all(tickets.map(arr => catData(arr)))
       }

        getData().then(data => {
            res.status(200).json(data)
        })
   } catch (e) {
       // console.log(e)
       return e
   }
});

router.post('/', restrict(), async (req, res, next) => {
    const { category, description, status, student_id, title, tried } = req.body;
    const data = {
        description,
        status,
        user_id: student_id,
        title,
        tried
    }
    const updateTic = await helpers.createTicket(data);

    async function catData(arr) {
        const updateTicCats = await helpers.updateTicketCats(updateTic.id, arr);
    }

    const getData = async () => {
        return await Promise.all(category.map(arr => catData(arr)))
    }
    getData().then(data => {
        console.log(data)
        res.status(200).json({
            message: 'Ticket Created'
        })
    })
});

router.get('/edit/:id', async (req, res, next) => {
   try {
       const { id } = req.params;
       const ticket = await helpers.findById(id);
       const ticketCats = await helpers.ticketCat(ticket.id);
       const user = await userHelpers.findById(ticket.user_id);

       let categories = [];
       ticketCats.map(arr => {
           categories.push(arr.title)
       })

       res.status(200).json({
           ...ticket,
           username: user.username,
           categories
       })
   } catch (e) {
       console.log(e)
   }
});

router.delete('/:id', restrict(), async (req, res, next) => {
   try {
       console.log(req)
   } catch (e) {
       console.log(e)
   }
});

module.exports = router;