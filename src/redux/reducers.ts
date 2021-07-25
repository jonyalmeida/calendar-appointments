import { combineReducers } from 'redux';
import {
	OPEN_AGENDA,
	CLOSE_AGENDA,
	OPEN_ADD_REMINDER,
	CLOSE_ADD_REMINDER,
	ADD_REMINDER
} from './actions';
import { insertSorted } from '../utils';

const initialAgendaState = {
	isOpen: false,
	date: null
};

const initialAddReminderState = {
	isOpen: false
};

const initialRemindersState = {
	reminders: {}
};

function agendaStatus(state = initialAgendaState, action: any) {
	switch (action.type) {
		case OPEN_AGENDA:
			return {
				isOpen: true,
				date: action.dateObj.date
			};
		case CLOSE_AGENDA:
			return {
				isOpen: false,
				date: null
			};
		default:
			return state;
	}
}

function addReminderStatus(state = initialAddReminderState, action: any) {
	switch (action.type) {
		case OPEN_ADD_REMINDER:
			return {
				isOpen: true
			};
		case CLOSE_ADD_REMINDER:
			return {
				isOpen: false
			};
		default:
			return state;
	}
}

function addReminder(state = initialRemindersState, action: any) {
	const copyReminders = state.reminders;
	const dateKey = action.reminder?.dateTime.split('T')[0];

	switch (action.type) {
		case ADD_REMINDER:
			if (copyReminders.hasOwnProperty(dateKey)) {
				insertSorted(copyReminders[dateKey], {
					dateTime: action.reminder.dateTime,
					content: action.reminder.content,
					color: action.reminder.color
				});
				return { ...state, reminders: copyReminders };
			} else {
				copyReminders[dateKey] = [
					{
						dateTime: action.reminder.dateTime,
						content: action.reminder.content,
						color: action.reminder.color
					}
				];
				return { ...state, reminders: copyReminders };
			}
		default:
			return state;
	}
}

const calendarApp = combineReducers({
	agendaStatus,
	addReminderStatus,
	addReminder
});

export default calendarApp;
