const mongoose = require('mongoose');
const express = require('express');
const { Genre } = require('../models/genre');
const { Movie } = require('../models/movies');
const router = express.Router();

async function createMovie(movieField) {
    const movie = new Movie({
        title: movieField.title,
        genre: movieField.genre,
        numbersInStock: movieField.numbersInStock,
        dailyRentalRate: movieField.dailyRentalRate,
    });

    await movie.save();
    return movie;
}

async function getMovieByTitle(title_input) {
    let search_result = await Movie
        .findOne({ title: title_input })
        .select('-_id title genre.name numbersInStock dailyRentalRate');

    if (!search_result) {
        return false;
    } else {
        return search_result;
    }
}

async function getMovieById(movie) {
    let search_result = await Movie
        .findOne(movie.movieID)
        .select('_id title genre.name numbersInStock dailyRentalRate');

    if (!search_result) {
        return false;
    } else {
        return search_result;
    }
}

async function updateMovieByName(movie_name, updated_movie_name) {
    let filter = { title: movie_name };
    let update = { title: updated_movie_name };
    let search_result = await Movie
        .findOneAndUpdate(filter, update, {
            new: true
        });
    if (!search_result) {
        return false;
    } else {
        return await search_result;
    }
}

async function deleteMovieByName(document_name) {
    let search_result = await Movie
        .findOneAndDelete({ title: document_name });

    if (!search_result) {
        return false;
    } else {
        return search_result;
    }
}


exports.createMovie = createMovie;
exports.getMovieByTitle = getMovieByTitle;
exports.updateMovieByName = updateMovieByName;
exports.deleteMovieByName = deleteMovieByName;
exports.getMovieById = getMovieById;