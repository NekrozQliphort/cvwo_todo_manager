import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import TaskAll from './Task/TaskAll'
import TaskOne from './Task/TaskOne'

const App = () => {
  return (
    <Switch>
      <Route exact path = '/' component ={TaskAll} />
      <Route exact path = '/view' component ={TaskOne} />
    </Switch>
  )
}

export default App
