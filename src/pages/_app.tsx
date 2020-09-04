import React from 'react'
import { AppProps } from 'next/app'
import store from '../store'
import GlobalStyles from '../styles/GlobalStyles'
import { Provider } from 'react-redux'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
			<GlobalStyles />
		</Provider>
	)
}

export default App
