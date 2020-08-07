import React from 'react'

import { Grid } from './styles'

import Challenge from '../Challenge'
import UserList from '../UserList'
import ContestList from '../ContestList'
import Navbar from '../Navbar'

const Layout: React.FC = () => {
    return (
        <Grid>
            <Navbar />
            <ContestList />
            <Challenge />
            <UserList />
        </Grid>
    )
}

export default Layout
