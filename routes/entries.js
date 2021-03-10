const express = require('express')
const router = express.Router()
const Entry = require('../models/entry')
var moment = require('moment');

//All blacklist entries route
router.get('/', async (req,res) => {
    let query = Entry.find()
    if (req.query.firstName != null && req.query.firstName != ''){
        query = query.regex('firstName', new RegExp(req.query.firstName, 'i'))
    }
    if (req.query.lastName != null && req.query.lastName != ''){
        query = query.regex('lastName', new RegExp(req.query.lastName, 'i'))
    }
    try {
        const entries = await query.exec()
        res.render('entries/index', { 
            entries: entries, 
            moment: moment,
            searchOptions: req.query 
        })
    } catch {
        res.redirect('/')
    }
})

//New blacklist entry
router.get('/new', async (req,res) => {
    renderNewPage( res, new Entry())
})

//Create blacklist entry
router.post('/', async (req,res) => {
    const entry = new Entry({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: new Date(req.body.dateOfBirth),
        reason: req.body.reason,
        dateOfIncident: new Date(req.body.dateOfIncident),
        location: req.body.location,
        amountOwed: req.body.amountOwed,
        reporter: req.body.reporter
    })

    try{
        const newEntry = await entry.save()
        res.redirect(`entries/${newEntry.id}`)
    } 
    catch {
        renderNewPage(res, entry, true)
    }
})

//Show blacklist entry
router.get('/:id', async (req, res) => {
    try{
        const entry = await Entry.findById(req.params.id)
        res.render('entries/show', {
            entry: entry
        })
    } catch {
        res.redirect('/')
    }
})

//Edit blacklist entry
router.get('/:id/edit', async (req, res) => {
    try{
        const entry = await Entry.findById(req.params.id)
        res.render('entries/edit', {entry: entry})
    }catch{
        res.redirect('/edit')
    }
})

//Update blacklist entry
router.put('/:id', async (req, res) => {
    let entry
    try{
        entry = await Entry.findById(req.params.id)
        entry.firstName = req.body.firstName,
        entry.lastName = req.body.lastName,
        entry.dateOfBirth = new Date(req.body.dateOfBirth),
        entry.reason = req.body.reason,
        entry.dateOfIncident = new Date(req.body.dateOfIncident),
        entry.location = req.body.location,
        entry.amountOwed = req.body.amountOwed,
        entry.reporter = req.body.reporter

        await entry.save()
        res.redirect(`/entries/${entry.id}`)
    } 
    catch {
        if (entry == null){
            res.redirect('/')
        } else {
            res.render('entries/edit', {
                entry: entry,
                errorMessage: 'Error updating entry'
            })
        }
    }
})

//Delete blacklist entry
router.delete('/:id', async (req, res) => {
    let entry
    try{
        entry = await Entry.findById(req.params.id)
        await entry.remove()
        res.redirect('/entries')
    } 
    catch {
        if (entry == null){
            res.redirect('/')
        } else {
            res.redirect(`/entries/${entry.id}`)
        }
    }
})


async function renderNewPage(res, entry, hasError = false ){
    try {
        const entry = new Entry()
        const params = {
            entry: entry
        }
        if (hasError) params.errorMessage = 'Error creating blacklist entry'
        res.render('entries/new', params)
    } 
    catch {
        res.redirect('/entries')
    }
}

module.exports = router