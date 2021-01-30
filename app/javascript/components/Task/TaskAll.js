import React, { useEffect, useState } from 'react'
import ax from 'packs/ax'
import _ from 'lodash'
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Link,
  Checkbox, InputBase, IconButton, AppBar, Toolbar, Select, MenuItem, Divider, Radio, FormControlLabel
} from '@material-ui/core'
import { Search, Add, Clear } from '@material-ui/icons'
import { makeStyles, fade } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500
  },
  search: {
    width: '50%',
    display: 'flex',
    padding: theme.spacing(0, 2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.4),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.5)
    },
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  searchInput: {
    flex: 1
  },
  buttonRight: {
    marginLeft: 'auto',
    marginRight: 0
  },
  addTaskWrapper: {
    paddingTop: '25px',
    paddingBottom: '50px',
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  addTaskButton: {
    color: '#fff',
    backgroundColor: fade(theme.palette.primary.main, 0.85),
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  tableWrapper: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    top: -30
  }
}))

const TaskAll = () => {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [displayCat, setDisplayCat] = useState('ongoing')
  const [tempText, setTempText] = useState('')
  const [searchText, setSearchText] = useState('')
  const [searchBy, setSearchBy] = useState('Name')
  const classes = useStyles()

  function updateTasks () {
    ax.get('/api/tasks')
      .then(resp => {
        setTasks(_.orderBy(resp.data.ongoing, 'deadline'))
        setCompletedTasks(_.orderBy(resp.data.completed, 'deadline'))
      })
      .catch(resp => console.log(resp))
  }

  useEffect(updateTasks, [])

  function deleteTasks (id) {
    ax.delete('/api/tasks/' + id)
      .then(resp => displayCat === 'ongoing'
        ? setTasks(_.filter(tasks, task => task.id !== id))
        : setCompletedTasks(_.filter(completedTasks, task => task.id !== id)))
      .catch(resp => console.log(resp))
  }

  function markCompleted (completedTask) {
    ax.patch('/api/tasks/mark_completed/' + completedTask.id)
      .then(resp => {
        setTasks(_.filter(tasks, task => task.id !== completedTask.id))
        setCompletedTasks(_.orderBy([...completedTasks, { ...completedTask, completed: true }], 'deadline'))
      })
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

  function search () {
    setSearchText(tempText)
  }

  function searchWrapper (e) {
    if (e.type === 'keydown' && e.key === 'Enter') {
      search()
    }
  }

  const handleOptionsSelect = e => setSearchBy(e.target.value)

  const TaskRows = () => {
    const searchFunc = (searchBy === 'Tags'
      ? task => searchText === '' || task.tags.some(e => e.name === searchText)
      : task => searchText === '' || task.title.toLowerCase().includes(searchText.toLowerCase()))
    return (_.map(_.filter(displayCat === 'ongoing' ? tasks : completedTasks, searchFunc), (task, index) => {
      const deadlineDate = new Date(task.deadline)
      return (
        <TableRow key={index}>
          <TableCell>{task.title}</TableCell>
          <TableCell>{`${deadlineDate.getDate()}/${deadlineDate.getMonth() + 1}/${deadlineDate.getFullYear()} ${dateTimeFormat(deadlineDate)}`}</TableCell>
          <TableCell><Checkbox color='primary' disabled={displayCat !== 'ongoing'} checked={task.completed} onChange={() => markCompleted(task)}/></TableCell>
          <TableCell><Button component={Link} href={'/edit/' + task.id}>Edit</Button></TableCell>
          <TableCell><Button onClick={() => deleteTasks(task.id)}>Delete</Button></TableCell>
        </TableRow>
      )
    }))
  }

  const Categories = () => (
    <>
      <FormControlLabel
        control={<Radio color="primary" checked={displayCat === 'ongoing'} onChange={() => setDisplayCat('ongoing')} />}
        label="Ongoing"
      />
      <FormControlLabel
        control={<Radio color="primary" checked={displayCat === 'completed'} onChange={() => setDisplayCat('completed')} />}
        label="Completed"
      />
    </>
  )

  return (
    <Box>
      <AppBar position="relative" elevation={4}>
        <Toolbar color='primary'>
          <Paper className={classes.search}>
            <Select
              value={searchBy}
              onChange={handleOptionsSelect}
              disableUnderline
            >
              <MenuItem value={'Name'}>Name</MenuItem>
              <MenuItem value={'Tags'}>Tags</MenuItem>
            </Select>
            <Divider orientation="vertical" style={{ marginLeft: '12px', marginRight: '12px' }} flexItem />
            <InputBase placeholder="Search" className={classes.searchInput} onChange = {e => setTempText(e.target.value)} value={tempText} onKeyDown={searchWrapper}/>
            {(searchText !== '' && (
              <IconButton className={classes.buttonRight} onClick={() => { setTempText(''); setSearchText('') }}>
                <Clear />
              </IconButton>
            ))}
            <IconButton className={classes.buttonRight} onClick={search}>
              <Search />
            </IconButton>
          </Paper>
        </Toolbar>
      </AppBar>
      <div className={classes.addTaskWrapper}>
        <Categories />
        <Button href={'/new'} className={[classes.buttonRight, classes.addTaskButton].join(' ')}><Add/>Add Task</Button>
      </div>
      <TableContainer component={Paper} elevation={4} className={classes.tableWrapper} >
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
    </Box>
  )
}

export default TaskAll
