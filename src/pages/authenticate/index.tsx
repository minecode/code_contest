import React, { useState, useEffect} from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { Grid, Container } from '../../styles/pages/Home'
import Authentication from '../../components/Authentication'

const Authenticate: React.FC = () => {

	const [load, setLoad] = useState(false)

	useEffect(() => {
		setLoad(true)
	})

	return (
		<Grid>
			<Head>
				<title>Code Contest</title>
			</Head>
			{load &&
				<>
					<Navbar />
					<Authentication />
				</>
			}
		</Grid>
	)
}

export default Authenticate
