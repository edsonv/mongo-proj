const { Router } = require('express');

const router = Router();

const Profile = require('../models/Profile');

router.get('/profile', (req, res) => {
  let filters = req.query;

  if (req.query.age !== null) {
    filters = {
      age: { $gt: req.query.age },
    };
  }

  Profile.find(filters)
    .then((profiles) => {
      res.json({
        status: 'success',
        data: profiles,
      });
    })
    .catch((err) => {
      res.json({
        status: 'fail',
        message: err.message,
      });
    });
});

// NON-RESTful
router.get('/profile/update', (req, res) => {
  const query = req.query;
  const profileId = query.id;

  Profile.findByIdAndUpdate(profileId, query, { new: true })
    .then((profile) => {
      res.json({
        status: 'success',
        data: profile,
      });
    })
    .catch((err) => {
      res.json({
        confimation: 'fail',
        message: err.message,
      });
    });
});

router.delete('/profile/delete', (req, res) => {
  const query = req.query;

  Profile.findByIdAndDelete(query.id)
    .then((data) => {
      res.json({
        status: 'success',
        data: `Profile ${query.id} successfully removed.`,
      });
    })
    .catch((err) => {
      res.json({
        status: 'fail',
        message: err.message,
      });
    });
});

router.get('/profile/:id', (req, res) => {
  const id = req.params.id;

  Profile.findById(id)
    .then((profile) => {
      res.json({
        status: 'sucess',
        data: profile,
      });
    })
    .catch((err) => {
      res.json({
        status: 'fail',
        message: `Profile ${id} not found`,
      });
    });
});

router.post('/profile', (req, res) => {
  Profile.create(req.body)
    .then((profile) => {
      res.json({
        status: 'success',
        data: profile,
      });
    })
    .catch((err) => {
      res.json({
        confirmation: 'fail',
        message: err.message,
      });
    });
});

module.exports = router;
