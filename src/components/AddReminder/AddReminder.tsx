import React, { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	WithStyles,
	withStyles,
	createStyles,
	Theme,
	Button,
	TextField,
	Grid,
	Container
} from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Reminder } from '../../interfaces';

const styles = (theme: Theme) =>
	createStyles({
		addReminderFormContainer: {
			minHeight: '250px',
			marginTop: '10px',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center'
		},
		closeButton: {
			position: 'absolute',
			right: '10px',
			top: '10px'
		},
		submitButton: {
			position: 'relative',
			right: '10px',
			bottom: '10px',
			maxWidth: '50px',
			marginTop: '5%'
		},
		wrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		textField: {
			marginTop: '10%'
		},
		entryBoxStyle: {
			boxShadow: '1px 1px 5px 1px black',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			justifyContent: 'cemter',
			padding: '0 3% 0 3%',
			minHeight: '75px',
			width: '200px'
		},
		inputWarning: {
			display: 'flex',
			flexDirection: 'column'
		},
		charsWarning: { fontSize: '9px', alignSelf: 'flex-end', color: 'red' }
	});

interface Props extends WithStyles<typeof styles> {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (reminder: Reminder) => void;
}

const AddReminder = ({ classes, isOpen, onClose, onSubmit }: Props) => {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [inputText, setInputText] = useState<string>('');
	const [maxLengthText, setMaxLengthText] = useState<boolean>(false);

	const handleClick = () => {
		onSubmit({ date: selectedDate, content: inputText });
	};

	useEffect(() => {
		inputText.length > 30
			? setMaxLengthText(true)
			: setMaxLengthText(false);
	}, [inputText]);

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			aria-labelledby='form-dialog-title'
			fullWidth={true}
			maxWidth='md'>
			<DialogTitle id='form-dialog-title'>
				Add Reminder
				<IconButton
					aria-label='Close'
					className={classes.closeButton}
					onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={classes.addReminderFormContainer}>
				<Container className={classes.wrapper}>
					<Container className={classes.entryBoxStyle}>
						Pick a date:
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid container>
								<KeyboardDatePicker
									disableToolbar
									variant='inline'
									format='MM/dd/yyyy'
									margin='normal'
									id='date-picker-inline'
									value={selectedDate}
									onChange={setSelectedDate}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
					</Container>
					<Container className={classes.entryBoxStyle}>
						Type your reminder:
						<Container className={classes.inputWarning}>
							<TextField
								className={classes.textField}
								onChange={(e) => setInputText(e.target.value)}
							/>
							{maxLengthText && (
								<Container className={classes.charsWarning}>
									Entry must be 30 characters or less
								</Container>
							)}
						</Container>
					</Container>
				</Container>
				<Button
					className={classes.submitButton}
					onClick={handleClick}
					disabled={!inputText || maxLengthText}>
					Submit
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default withStyles(styles)(AddReminder);
