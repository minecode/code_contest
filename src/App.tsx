import React from 'react'
import store from './store'
import Layout from './components/Layout'
import GlobalStyles from './styles/GlobalStyles'
import { Provider } from 'react-redux'

function App () {
    return (
        <Provider store={store}>
            <Layout />
            <GlobalStyles />
        </Provider>
    )
}

export default App
