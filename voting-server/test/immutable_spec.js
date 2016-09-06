import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
	describe('A Number', () => {

		function increment(currentState) {
			return currentState + 1;
		}

		it('is immutability', () => {
			let state = 42;
			let nextState = increment(state);

			expect(nextState).to.equal(43);
			expect(state).to.equal(42);

		});
	});

	describe('A List', () => {

		function addMovie(currentState, movie) {
			return currentState.push(movie);
		}

		it('is immutability', () => {
			let movies = ['Trainspotting', '28 Days Later'];
			let otherMovie = 'Sunshine';
			let state = List.of(...movies);
			let nextState = addMovie(state, otherMovie);

			expect(nextState).to.equal(List.of(...movies, otherMovie));
			expect(state).to.equal(List.of(...movies));

		});

	});

	describe('A Map', () => {

		function addMovie(currentState, movie) {
			return currentState.set('movies', currentState.get('movies').push(movie));
		}


		it('is immutability', () => {
			let movies = ['Trainspotting', '28 Days Later'];
			let otherMovie = 'Sunshine';

			let state = Map({
				movies: List.of(...movies)
			});

			let nextState = addMovie(state, otherMovie);

			expect(nextState).to.equal(Map({movies: List.of(...movies, otherMovie)}));
			expect(state).to.equal(Map({movies: List.of(...movies)}));

		});

	});
});
