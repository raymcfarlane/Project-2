const router = require('express').Router();
const { User, Restaurant, Reservation } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const restaurantData = await Restaurant.findAll();

    const restaurants = restaurantData.map(restaurants => restaurants.toJSON());

    res.render('home', {
        logged_in: req.session.logged_in,
        restaurants
    });
});

router.get('/profile', withAuth, async (req, res) => {
    const reservationData = await Reservation.findAll({
        where: {
            user_id: req.session.user_id
        }
    });
    const reservations = reservationData.map(reservation => reservation.toJSON());
    console.log(reservations);
    res.render('profile', {
        logged_in: req.session.logged_in,
        reservations
    });
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/profile');
    }
    res.render('login');
});

router.get('/form', withAuth, async (req, res) => {
    res.render('form');
});


router.get('/reservations/:id', withAuth, async (req, res) => {
    const reservationId = req.params.id;
    const reservationData = await reservations.findByPk(reservationId, {
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });
    const reservations = reservationData.toJSON();
    console.log(reservations);
    res.render('reservations', {
        ...reservations,
        logged_in: req.session.logged_in
    });
});

// router.get('/review/:id', withAuth, async (req, res) => {
//     const reviewId = req.params.id;
//     const reviewData = await review.findByPk(reviewId, {
//         include: [
//             {
//                 model: User,
//                 attributes: ['name'],
//             },
//         ],
//     });
//     const review = reviewData.toJSON();
//     console.log(review);
//     res.render('review', {
//         ...review,
//         logged_in: req.session.logged_in
//     });
// });

module.exports = router;