import React from 'react'
import { Route, Switch } from 'react-router-dom'

import CreateTask from './Task/CreateTask'
import EditTask from './Task/EditTask'
import TaskAll from './Task/TaskAll'

const App = () => {
  return (
    <Switch>
      <Route exact path = '/' component ={TaskAll} />
      <Route exact path = '/new' component ={CreateTask} />
      <Route exact path = '/edit/:id' component ={EditTask} />
    </Switch>
  )
}

export default App
