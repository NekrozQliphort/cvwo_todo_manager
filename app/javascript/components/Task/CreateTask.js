import React, { useState } from 'react'
import ax from 'packs/ax'
import TaskOne from './TaskOne'

const CreateTask = props => {
  const [task, setTask] = useState({ title: '', remarks: '', deadline: new Date(), completed: false })

  const handleSubmit = e => {
    ax.post('/api/tasks', task)
      .then(resp => props.history.push('/'))
      .catch(resp => console.log(resp))
  }

  return (<TaskOne task={task} setTask={setTask} handleSubmit={handleSubmit} edit={false} />)
}

export default CreateTask
