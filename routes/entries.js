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
    if (req.query.dateOfBirth != null && req.query.dateOfBirth != ''){
        query = query.gte('dateOfBirth', req.query.dateOfBirth)
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

//New blacklist entry route
router.get('/new', async (req,res) => {
    renderNewPage( res, new Entry())
})

//Create blacklist entry route
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
       // res.redirect(`blacklist/${newEntry.id}`)
       res.redirect('entries')
    } 
    catch {
        renderNewPage(res, entry, true)
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