import React, { useEffect, useState } from 'react'
import ax from 'packs/ax'
import _ from 'lodash'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Link } from '@material-ui/core'
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

  const taskRows = _.map(_.orderBy(tasks, 'deadline'), (task, index) => {
    const deadlineDate = new Date(task.deadline)
    return (
      <TableRow key={index}>
        <TableCell>{task.title}</TableCell>
        <TableCell>{`${deadlineDate.getDate()}/${deadlineDate.getMonth() + 1}/${deadlineDate.getFullYear()}`}</TableCell>
        <TableCell><Button component={Link} to={'/edit/' + task.id}>Edit</Button></TableCell>
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskRows}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TaskAll
