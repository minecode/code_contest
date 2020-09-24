import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import store from '../store'
import GlobalStyles from '../styles/GlobalStyles'
import { Provider } from 'react-redux'
import { loadReCaptcha } from 'react-recaptcha-v3'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	useEffect(() => {
		loadReCaptcha('6LewbMwZAAAAAAeKjMMbilsGbBNGC5IRrdrXe-v9')
	}, [])

	return (
		<Provider store={store}>
			<Component {...pageProps} />
			<GlobalStyles />
		</Provider>
	)
}

export default App
