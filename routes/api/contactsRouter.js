import express from 'express'
import {listContacts,getContactById,removeContact,updateContact,addContact} from '../../models/contacts.js'
import { contactValidation } from '../../validation/validation.js'
import { httpError } from '../../helpers/httpErrors.js'

const router = express.Router()


router.get('/', async (_req, res, next) => {
  try {
    const results = await listContacts ();
    res.json(results);

  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactID} = req.params
    const results = await getContactById(contactID)

    if (!result){
      throw httpError(404);
    }
    res.json(results)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {

  try {
    const {error} =contactValidation.validate(req.body)
    if(error){
      throw httpError(404, "missing required name field")
    }
    const result = await addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const result = await removeContact(contactId)

    if (!result){
      throw httpError(404)
    }
    res.json ({
      message: "Contact Deleted" ,
    })
  } catch (error) {
    next (error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const error = contactValidation.validate(req.body)
    if (error){
      throw httpError(400,"missing fields")
    }
    const contactId = req.params
    const result = await updateContact(contactId,req.body)

    if (!result){
      throw httpError(404)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export {router}; 