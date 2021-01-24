import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

import CreateTask from './Task/CreateTask'
import EditTask from './Task/EditTask'
import TaskAll from './Task/TaskAll'

import { theme } from './Theme'

const App = () => {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path = '/' component ={TaskAll} />
          <Route exact path = '/new' component ={CreateTask} />
          <Route exact path = '/edit/:id' component ={EditTask} />
        </Switch>
      </ThemeProvider>
    </CssBaseline>
  )
}

export default App
