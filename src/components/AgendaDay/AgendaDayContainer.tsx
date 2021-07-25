import { connect } from 'react-redux';
import AgendaDay from './AgendaDay';
import { closeAgenda } from '../../redux/actions';

interface Props {}

interface State {
	agendaStatus: {
		isOpen: boolean;
		date: Date;
	};
	addReminder: {
		reminders: any;
	};
}

const mapStateToProps = (state: State, ownProps: Props) => {
	const { agendaStatus, addReminder } = state;

	return { agendaStatus, reminders: addReminder.reminders };
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch(closeAgenda());
		}
	};
};

const AgendaDayContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AgendaDay);

export default AgendaDayContainer;
