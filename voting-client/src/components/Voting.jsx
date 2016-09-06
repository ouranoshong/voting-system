import React from 'react';
import Winner from './Winner';
import Vote from './Vote';

import * as actionCreators from '../action_creators';

import {connect} from 'react-redux';

import PureRenderMixin from 'react-addons-pure-render-mixin';

export const Voting = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		return (
			<div>
				{
					this.props.Winner ?
					<Winner ref="Winner" Winner={this.props.Winner} /> :
					<Vote {...this.props} />
				}
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		pair: state.getIn(['vote', 'pair']),
		hasVoted: state.get('hasVoted'),
		winner: state.get('winner')
	}
}

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);
