import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	List,
	ListItem
} from '@material-ui/core/';
import {
	WithStyles,
	withStyles,
	Theme,
	createStyles
} from '@material-ui/core/styles';
import * as dateFns from 'date-fns';
import { Reminder } from '../../interfaces';

const styles = (theme: Theme) =>
	createStyles({
		remindersContainer: {
			height: '250px',
			marginTop: '10px',
			overflow: 'hidden auto-scroll'
		},
		closeButton: {
			position: 'absolute',
			right: '10px',
			top: '10px'
		},
		toolbarButtonHidden: {
			visibility: 'hidden'
		},
		toolbarButtonVisible: {
			visibility: 'visible'
		}
	});

interface Props extends WithStyles<typeof styles> {
	agendaStatus: {
		isOpen: boolean;
		date: Date;
	};
	reminders: any;
	onClose: () => void;
}

const AgendaDay = ({ classes, agendaStatus, reminders, onClose }: Props) => {
	if (agendaStatus.date) {
		var dateTitle = dateFns.format(agendaStatus.date, 'LLLL do, yyyy');
		var dateKey = dateFns.format(agendaStatus.date, 'yyyy-MM-dd');
	}

	return (
		<Dialog
			open={agendaStatus.isOpen}
			onClose={onClose}
			aria-labelledby='form-dialog-title'
			fullWidth={true}
			maxWidth='md'>
			<DialogTitle id='form-dialog-title'>
				{dateTitle ?? 'Closing'}
				<IconButton
					aria-label='Close'
					className={classes.closeButton}
					onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={classes.remindersContainer}>
				<List>
					{reminders[dateKey]?.map(
						(reminder: Reminder, i: number) => (
							<ListItem key={i} style={{ color: reminder.color }}>
								{`[${reminder.dateTime
									.split('T')
									.join(' ')}]: ${reminder.content}`}
							</ListItem>
						)
					)}
				</List>
			</DialogContent>
		</Dialog>
	);
};

export default withStyles(styles)(AgendaDay);
