import React from 'react'

import { Grid } from './styles'

import Challenge from '../Challenge'
import UserList from '../UserList'
import Navbar from '../Navbar'

const Layout: React.FC = () => {
    return (
        <Grid>
            <Navbar />
            <Challenge />
            <UserList />
        </Grid>
    )
}

export default Layout
