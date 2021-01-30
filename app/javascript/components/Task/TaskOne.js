import React, { useState } from 'react'
import { Grid, TextField, Button, Typography, Box, Container } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import ChipInput from 'material-ui-chip-input'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  labelSpacing: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) },
  submitButton: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    display: 'flex'
  },
  form: {
    height: '100vh',
    paddingTop: '33px'
  }
}))

const TaskOne = props => {
  const { task, setTask, handleSubmit, edit } = props
  const [error, setError] = useState(false)
  const classes = useStyles()

  const handleTaskAttr = attr => e => setTask({ ...task, [attr]: e.target.value })
  const handleDateChange = val => setTask({ ...task, deadline: val })
  const handleAddTag = chip => {
    setTask({ ...task, tags: [...task.tags, { name: chip }] })
  }
  const handleDeleteTag = (chip, index) => {
    setTask({ ...task, tags: _.filter(task.tags, tag => tag.name !== chip) })
  }

  const generateTextfield = (label, attr, rowsMax = 1, fullWidth = false) => {
    return (
      <TextField onChange={handleTaskAttr(attr)} label={label} variant='outlined'
      fullWidth={fullWidth} multiline rowsMax={rowsMax} value={task[attr] || ''} className={classes.labelSpacing} />
    )
  }

  const handleValidateSubmit = e => {
    if (task.title === '' || task.deadline < new Date()) { setError(true) } else { handleSubmit(e) }
  }

  return (
    <Container maxWidth='md' className={classes.form}>
      {(error) && (<Alert severity="error">Please make sure your input is valid!</Alert>) }
      <Grid container direction='row'>
        <Typography color='primary' variant='h4'><strong>{edit ? 'Edit Task' : 'New Task'}</strong></Typography>
      </Grid>
      <hr style = {{ color: '#8c56ff' }} />
      <Typography variants='p'><strong>Please fill in the info below</strong></Typography>
      <br />
      {generateTextfield('Title', 'title')}
      <Box className={classes.labelSpacing} >
        <ChipInput
            label="Tags"
            value={_.map(_.orderBy(task.tags, 'created_at'), task => task.name)}
            onAdd={handleAddTag}
            onDelete={handleDeleteTag}
            disableUnderline={true}
            variant='outlined'
        />
      </Box>
      {generateTextfield('Remarks', 'remarks', 8, true)}
      <Box className={classes.labelSpacing} >
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
          <KeyboardDateTimePicker
          label="Deadline"
          variant="inline"
          inputVariant="outlined"
          ampm={false}
          value={task.deadline}
          onChange={handleDateChange}
          disablePast
          format="dd/MM/yyyy HH:mm"
          />
        </MuiPickersUtilsProvider>
      </Box>
      <Box >
        <Button onClick={handleValidateSubmit} color='primary' variant='outlined' className={classes.submitButton}>{edit ? 'Save Changes' : 'Create New Task'}</Button>
      </Box>
    </Container>
  )
}

export default TaskOne
