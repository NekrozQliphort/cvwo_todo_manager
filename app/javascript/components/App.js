import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import CreateTask from './Task/CreateTask'
import TaskAll from './Task/TaskAll'
import TaskOne from './Task/TaskOne'

const App = () => {
  return (
    <Switch>
      <Route exact path = '/' component ={TaskAll} />
      <Route exact path = '/new' component ={CreateTask} />
    </Switch>
  )
}

export default App
