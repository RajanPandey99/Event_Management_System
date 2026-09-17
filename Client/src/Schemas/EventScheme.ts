import Joi from "joi";
 export const eventRequestSchema = Joi.object({
  Title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title cannot exceed 100 characters",
    }),

  DateOfEvent: Joi.date()
    .required()
    .messages({
      "date.base": "Please enter a valid date",
      "any.required": "Date is required",
    }),

  TimeOfEvent: Joi.string()
    .required()
    .messages({
      "string.empty": "Time is required",
    }),

  Category: Joi.string()
    .required()
    .messages({
      "string.empty": "Category is required",
    }),

  Location: Joi.string()
    .min(2)
    .max(200)
    .required()
    .messages({
      "string.empty": "Location is required",
      "string.min": "Location must be at least 2 characters",
      "string.max": "Location cannot exceed 200 characters",
    }),

  Description: Joi.string()
    .max(500)
    .allow("")
    .optional()
    .messages({
      "string.max": "Description cannot exceed 500 characters",
    }),
});
