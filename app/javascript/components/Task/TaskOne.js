import React from 'react'
import { Grid, TextField, Button, Typography, Box } from '@material-ui/core'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const TaskOne = props => {
  const { task, setTask, handleSubmit, edit } = props
  const handleTaskAttr = attr => e => setTask({ ...task, [attr]: e.target.value })
  const generateTextfield = (label, attr, rowsMax = 1, fullWidth = false) => {
    return (
      <>
        <Typography>{label}</Typography>
        <TextField onChange={handleTaskAttr(attr)} variant="outlined" fullWidth={fullWidth} multiline rowsMax={rowsMax} />
      </>
    )
  }
  const handleDateChange = val => setTask({ ...task, deadline: val })

  return (
    <Grid>
      {generateTextfield('Title', 'title')}
      {generateTextfield('Remarks', 'remarks', 8, true)}
      <Typography>Deadline</Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
        variant="inline"
        inputVariant="outlined"
        ampm={false}
        value={task.deadline}
        onChange={handleDateChange}
        disablePast
        format="yyyy/MM/dd HH:mm"
        />
      </MuiPickersUtilsProvider>
      <Box>
        <Button onClick={handleSubmit}>{edit ? 'Save Changes' : 'Create New Task'}</Button>
      </Box>
    </Grid>
  )
}

export default TaskOne
