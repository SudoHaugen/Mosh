const mongoose = require('mongoose');
const express = require('express');
const { Rental } = require('../models/rentals');

async function createRentals(movie, start_date, end_date) {
    console.log(movie);
    let rental = new Rental({
        movie: {
            //_id: movie._id,
            title: movie.title,
            genre: movie.genre,
            numbersInStock: movie.numbersInStock,
            dailyRentalRate: movie.dailyRentalRate
        },
        rental_start: start_date,
        rental_end: end_date
    });

    return await rental.save();
}

async function getAllRentals() {
    let search_result = await Rental.find();

    return search_result;
}

exports.createRentals = createRentals;
exports.getAllRentals = getAllRentals;