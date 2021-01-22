import React, { useEffect, useState } from 'react'
import ax from 'packs/ax'
import TaskOne from './TaskOne'

const EditTask = props => {
  const [task, setTask] = useState({})

  const updateTask = () => {
    ax.get('/api/tasks/' + props.match.params.id)
      .then(resp => { console.log(resp.data); setTask(resp.data) })
      .catch(resp => console.log(resp))
  }

  useEffect(updateTask, [])

  const handleSubmit = e => {
    ax.patch('/api/tasks/' + task.id, task)
      .then(resp => props.history.push('/'))
      .catch(resp => console.log(resp))
  }

  return (<TaskOne task={task} setTask={setTask} handleSubmit={handleSubmit} edit={true} />)
}

export default EditTask
