import React, { useState, useEffect, ChangeEvent } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {
	WithStyles,
	withStyles,
	createStyles,
	Theme
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Reminder } from '../../interfaces';
import { formatDate } from '../../utils';
import { Container } from '../Common';

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
		input: {
			marginTop: '10%'
		},
		datePicker: {
			marginTop: '10%',
			width: '225px'
		},
		entryBox: {
			boxShadow: '1px 1px 5px 1px black',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'cemter',
			padding: '0 3% 0 3%',
			margin: '0 1% 0 1%',
			minHeight: '75px',
			width: '250px'
		},
		inputWarning: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		},
		charsWarning: { fontSize: '9px', color: 'red' }
	});

interface Props extends WithStyles<typeof styles> {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (reminder: Reminder) => void;
}

const AddReminder = ({ classes, isOpen, onClose, onSubmit }: Props) => {
	const [selectedDateTime, setSelectedDateTime] = useState<string>(
		formatDate(new Date())
	);
	const [inputText, setInputText] = useState<string>('');
	const [maxLengthText, setMaxLengthText] = useState<boolean>(false);
	const [color, setColor] = useState<string>('black');

	const handleClick = () => {
		onSubmit({
			dateTime: selectedDateTime,
			content: inputText,
			color: color
		});
	};

	useEffect(() => {
		inputText.length > 30
			? setMaxLengthText(true)
			: setMaxLengthText(false);
	}, [inputText]);

	const styles = {
		color: color
	};

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
					<Container className={classes.entryBox}>
						<Typography>Pick a date and time:</Typography>
						<TextField
							id='datetime-local'
							type='datetime-local'
							defaultValue={selectedDateTime}
							className={classes.datePicker}
							InputLabelProps={{
								shrink: true
							}}
							onChange={(e) =>
								setSelectedDateTime(e.target.value)
							}
						/>
					</Container>
					<Container className={classes.entryBox}>
						<Typography>Type your reminder:</Typography>
						<Container className={classes.inputWarning}>
							<Input
								className={classes.input}
								style={styles}
								onChange={(
									e: ChangeEvent<
										HTMLInputElement | HTMLTextAreaElement
									>
								): void => setInputText(e.target.value)}
							/>
							{maxLengthText && (
								<Typography className={classes.charsWarning}>
									Entry must be 30 characters or less
								</Typography>
							)}
						</Container>
					</Container>
					<Container className={classes.entryBox}>
						<Typography>Pick a color:</Typography>
						<input
							className={classes.input}
							type='color'
							value={color}
							onChange={(
								e: ChangeEvent<
									HTMLInputElement | HTMLTextAreaElement
								>
							): void => setColor(e.target.value)}
						/>
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
