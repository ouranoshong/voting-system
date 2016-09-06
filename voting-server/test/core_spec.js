import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic',  () => {
	describe('setEntries',  () => {

		it('add the entries to the state', () => {
			let entryList = ['Trainspotting', '28 Days Later'];
			const state = Map();
			// const entries = List.of(...entryList);
			const nextState = setEntries(state, entryList);

			expect(nextState).to.equal(
				Map({
					entries: List.of(...entryList)
				})
			)
		});
	});

	describe('next', () => {
		it('takes the next two entries under vote', () => {
			let entryList = ['Trainspotting', '28 Days Later'];
			let entryOther = 'Sunshine';
			const state = Map({
				entries: List.of(...entryList, entryOther)
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of(...entryList)
				}),
				entries: List.of(entryOther)
			}))
		});


		it('puts winner of current vote back to entries', () => {
			const state = Map({
		      vote: Map({
		        pair: List.of('Trainspotting', '28 Days Later'),
		        tally: Map({
		          'Trainspotting': 4,
		          '28 Days Later': 2
		        })
		      }),
		      entries: List.of('Sunshine', 'Millions', '127 Hours')
		    });

		    const nextState = next(state);

		    expect(nextState).to.equal(Map({
		      vote: Map({
		        pair: List.of('Sunshine', 'Millions')
		      }),
		      entries: List.of('127 Hours', 'Trainspotting')
		    }));
		});

		it('puts both from tied vote back to entries', ()=> {
			const state = Map({
		      vote: Map({
		        pair: List.of('Trainspotting', '28 Days Later'),
		        tally: Map({
		          'Trainspotting': 3,
		          '28 Days Later': 3
		        })
		      }),
		      entries: List.of('Sunshine', 'Millions', '127 Hours')
		    });
		    const nextState = next(state);
		    expect(nextState).to.equal(Map({
		      vote: Map({
		        pair: List.of('Sunshine', 'Millions')
		      }),
		      entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
		    }));
		});

		it('marks winner when just on entry left', ()=> {
			const state = Map({
				vote: Map({
					pair: List.of('Transpotting', '28 Days Laters'),
					tally: Map({
						'Transpotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List()
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				winner: 'Transpotting'
			}))
		})
	});

	describe('vote', () => {
		it('creates a tally for the voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				})
			});
			const nextState = state.update('vote', voteState => vote(voteState, 'Trainspotting'));
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 1
					})
				})
			}))
		});

		it('add to existing tally for the voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 3,
            			'28 Days Later': 2
					})
				})
			})

			const nextState = state.update('vote', voteState => vote(voteState, 'Trainspotting'));
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				})
			}))
		});
	});
});
