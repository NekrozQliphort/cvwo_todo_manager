import React, { useEffect, useState } from 'react'
import ax from 'packs/ax'
import _ from 'lodash'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Link, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

const TaskAll = () => {
  const [tasks, setTasks] = useState([])
  const classes = useStyles()

  function updateTasks () {
    ax.get('/api/tasks')
      .then(resp => setTasks(resp.data))
      .catch(resp => console.log(resp))
  }

  useEffect(updateTasks, [])

  function deleteTasks (id) {
    ax.delete('/api/tasks/' + id)
      .then(resp => setTasks(_.filter(tasks, task => task.id !== id)))
      .catch(resp => console.log(resp))
  }

  function markCompleted (id) {
    ax.patch('/api/tasks/mark_completed/' + id)
      .then(resp => setTasks(_.filter(tasks, task => task.id !== id)))
      .catch(resp => console.log(resp))
  }

  function dateTimeFormat (dt) {
    const hours = dt.getHours()
    const minutes = dt.getMinutes()
    const minuteStr = minutes < 10 ? '0' + minutes : minutes.toString()
    if (hours <= 12) {
      return hours === 0 ? `12:${minuteStr} AM` : `${hours}:${minuteStr} AM`
    } else {
      return `${hours % 12}:${minuteStr} PM`
    }
  }

  const TaskRows = () => _.map(_.orderBy(tasks, 'deadline'), (task, index) => {
    const deadlineDate = new Date(task.deadline)
    return (
      <TableRow key={index}>
        <TableCell>{task.title}</TableCell>
        <TableCell>{`${deadlineDate.getDate()}/${deadlineDate.getMonth() + 1}/${deadlineDate.getFullYear()} ${dateTimeFormat(deadlineDate)}`}</TableCell>
        <TableCell><Checkbox checked={task.completed} onChange={() => markCompleted(task.id)}/></TableCell>
        <TableCell><Button component={Link} href={'/edit/' + task.id}>Edit</Button></TableCell>
        <TableCell><Button onClick={() => deleteTasks(task.id)}>Delete</Button></TableCell>
      </TableRow>
    )
  })

  return (
    <Box>
      <h1>All The Tasks should be here</h1>
      <TableContainer component={Paper} elevation={3}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Task</strong></TableCell>
              <TableCell><strong>Deadline</strong></TableCell>
              <TableCell><strong>Completed</strong></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TaskRows />
          </TableBody>
        </Table>
      </TableContainer>
      <Button component={Link} href={'/new'}>Add Task</Button>
    </Box>
  )
}

export default TaskAll
