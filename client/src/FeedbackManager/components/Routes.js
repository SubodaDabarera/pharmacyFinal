import React from 'react'
import {Route, Switch, Router, BrowserRouter} from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import CommentReport from '../pages/CommentReport'
import DetailProduct from '../../body/products/detailProduct/DetailProduct'
import App from '../../App'

const Routes = () => {
    return (
        <>
            <Switch>
                <Route path = '/feedbackManager/dashbord' component = {Dashboard} exact/>
                <Route path = '/feedbackManager/CommentReport' component = {CommentReport} exact/>
            </Switch>
          
        </>
    )
}

export default Routes