const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngsController = require('./controllers/OngsController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngsController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }),
}), OngsController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  }),
}), IncidentsController.index);

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(3),
    description: Joi.string().required().min(3),
    value: Joi.number().required(),
  }),
}), IncidentsController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
}), IncidentsController.delete);

module.exports = routes;
