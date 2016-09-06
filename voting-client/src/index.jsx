import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';

import {setState} from './action_creators';

import io from 'socket.io-client';

// import Voting from './components/Voting';
// import Results from './components/Results';

import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';
import remoteActionMiddleware from './remote_action_middleware';

import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';


const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => {
	store.dispatch(setState(state));
});

// const pair = ['Trainspotting', '28 Days Later'];

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);


// store.dispath({
// 	type: 'SET_STATE',
// 	state: {
// 		vote: {
// 			pair: ['Sunshine', '28 Days Later'],
// 			tally: {Sunshine: 2}
// 		}
// 	}
// });



const routes = (<Route component={App}>
	<Route path="/results" component={ResultsContainer} />
	<Route path="/" component={VotingContainer} />
</Route>)

// ReactDOM.render(
// 	<Voting pair={pair} hasVoted={"Trainspotting"} Winner={"Trainspotting"} />,
//   	document.getElementById('app')
// )

ReactDOM.render(
	<Provider store={store} >
		<Router history={hashHistory}>{routes}</Router>
	</Provider>,
	document.getElementById('app')
);
