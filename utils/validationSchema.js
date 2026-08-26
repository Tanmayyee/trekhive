import joi from 'joi';

export const listingValidationSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        description:joi.string().allow(''),   // Fun fact: HTML forms send blank fields as empty strings (""), not undefined.
                                              // Joi blocks empty strings by default, so we have to explicitly .allow('') it. 
                                              // You can also add .optional() here to make it crystal clear that the field isn't mandatory!
    }).required(),
    deleteImages: joi.array().items(joi.string())
})


export const reviewValidationSchema=joi.object({
    review:joi.object({
        body:joi.string().max(600).required(),
        rating:joi.number().required().min(1).max(5)
    }).required()
})

export const userValidationSchema= joi.object({
         username: joi.string().alphanum().min(3).max(30).required().messages({
            'string.alphanum': '"Username" can only contain letters, numbers, and underscores.',        
            'string.empty': '"Username" is required.',
            'string.min': '"Username" must be at least 3 characters long.',
            'string.max': '"Username" cannot exceed 30 characters.'
        }),
        
    email: joi.string().email().required().messages({
            'string.email': 'Please provide a valid email address.',
            'string.empty': 'Email is required.'
        }),
        
    password: joi.string().min(8).required().messages({
            'string.min': 'Password must be at least 8 characters long.',
            'string.empty': 'Password is required.'
        })
})

// "listing" must match the key used in req.body (e.g. listing[title] in the form)
// "listing" matches the key in req.body, not the Mongoose model name
// Joi checks the data coming from the request using this schema before it reaches the Mongoose model/database.
// It checks required fields, data types, and values to prevent invalid data from being saved.
// It validates the req.body data coming from the client before it reaches the database.
// Joi checks the form data before it reaches the database.

// Used to validate data coming from POST, PUT, and PATCH requests before saving or updating the database.
// GET requests usually don't need this because they don't send data in req.body.