const Person = require('../models/Person')

const router = require('express').Router();

router.post('/', async (req, res) =>{
    const {name, salary, approved } = req.body;
    const person = { name,  salary, approved };

    if(!name){
        res.status(422).json({message: 'Name is required!'})
        return 
    }

    try {
        await Person.create(person)
        res.status(201).json({message: 'Person has created!'})

    } catch (error){
        res.status(500).json({ error: error })
    }

})

router.get('/', async (req, res) =>{
    try {
        const person = await Person.find();
        res.status(201).json(person)
    } catch(error){
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try{
        const person = await Person.findOne({_id: id })
        if(!person){
            res.status(422).json({message: 'person not find'})
            return 
        }
        res.status(200).json(person);
    } catch(error){
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const {name, salary, approved } = req.body; 
    const person = {
        name,
        salary,
        approved
    }

    try{
        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message: 'person not find'})
        }

        res.status(200).json(person);
    } catch(error){
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const person = await Person.findOne({_id: id});
    if(!person){
        res.status(422).json({message: 'person not find'})
    }
    
    try{
        const updatedPerson = await Person.deleteOne({_id: id})
        res.status(200).json(updatedPerson);
    } catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router;