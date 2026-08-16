import joi from 'joi';

export const listingValidationSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        description:joi.string().required(),
        image:joi.string().required()
    }).required()
})


export const reviewValidationSchema=joi.object({
    review:joi.object({
        body:joi.string().required(),
        rating:joi.number().required()
    }).required()
})

// "listing" must match the key used in req.body (e.g. listing[title] in the form)
// "listing" matches the key in req.body, not the Mongoose model name
// Joi checks the data coming from the request using this schema before it reaches the Mongoose model/database.
// It checks required fields, data types, and values to prevent invalid data from being saved.
// It validates the req.body data coming from the client before it reaches the database.
// Joi checks the form data before it reaches the database.

// Used to validate data coming from POST, PUT, and PATCH requests before saving or updating the database.
// GET requests usually don't need this because they don't send data in req.body.