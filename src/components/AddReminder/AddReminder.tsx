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
	Grid
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
		}
	});

interface Props extends WithStyles<typeof styles> {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (reminder: Reminder) => void;
}

const AddReminder = (props: Props) => {
	const { classes, isOpen, onClose } = props;

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [inputText, setInputText] = useState<string>('');
	const [maxLengthText, setMaxLengthText] = useState<boolean>(false);

	const handleSubmit = () => {
		if (selectedDate && inputText) {
			console.log(inputText);
		}
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
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between'
					}}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid container>
							<KeyboardDatePicker
								disableToolbar
								variant='inline'
								format='MM/dd/yyyy'
								margin='normal'
								id='date-picker-inline'
								label='Date picker inline'
								value={selectedDate}
								onChange={setSelectedDate}
								KeyboardButtonProps={{
									'aria-label': 'change date'
								}}
							/>
						</Grid>
					</MuiPickersUtilsProvider>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<TextField
							onChange={(e) => setInputText(e.target.value)}
						/>
						{maxLengthText && (
							<div
								style={{
									fontSize: '9px',
									alignSelf: 'flex-end',
									color: 'red'
								}}>
								Entry must be 30 characters or less
							</div>
						)}
					</div>
				</div>
				<Button
					className={classes.submitButton}
					onSubmit={handleSubmit}
					disabled={!inputText || maxLengthText}>
					Submit
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default withStyles(styles)(AddReminder);
