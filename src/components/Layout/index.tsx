import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import UserList from '../UserList'
import LoginMessage from '../LoginMessage'
import ChallengeInfo from '../ChallengeInfo'
import ChallengeCode from '../ChallengeCode'
import ContestList from '../ContestList'
import Authentication from '../Authentication'
import { Grid, Container } from './styles'
import { useSelector } from 'react-redux'
import { Data } from '../Interface'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Object } from 'aws-sdk/clients/s3'
import Dashboard from '../Dashboard'

import AWS from 'aws-sdk';


const Layout: React.FC = () => {
    const authenticated = useSelector((state: Data) => state.data.auth.authenticated)
    const selectedChallengeName = useSelector((state: Data) => state.data.selectedChallenge.name)

    const [load, setLoad] = useState(false)
    const [contents, setContents] = useState<Object[]>()

    var s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-east-1', accessKeyId: 'AKIA3M6MCOV556RF6YQG', secretAccessKey: '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'});

    useEffect(() => {
        var params = {
            Bucket: 'code-contest',
        };
        
        s3.listObjectsV2(params, function(err, objects) {
            if (err) console.log(err, err.stack); // an error occurred
            else    {
                setLoad(true)
                setContents(objects.Contents)
            }
        });
    }, [])


    return (
        <Grid>
            {load ?
            <>
                <Router>
                    <Switch>
                        <Route path="/code_contest/authenticate">
                            <Authentication />
                        </Route>
                        <Route path="/code_contest/dashboard">
                            <Navbar />
                            <Dashboard />
                        </Route>
                        <Route path="/">
                            <Navbar />
                            <ContestList contents={contents} />
                            <Container>
                                {selectedChallengeName && selectedChallengeName.split('/').length > 1 && selectedChallengeName.split('/')[1].length > 1 ? (
                                    <>
                                        <ChallengeInfo />
                                        {authenticated ? 
                                            <ChallengeCode /> :
                                            <LoginMessage />
                                        }
                                    </>
                                ) : (
                                    <>Place home page here!</>
                                )}
                            </Container>
                            <UserList />
                        </Route>
                    </Switch>
                </Router>
                
            </>
            : <></> }
        </Grid>
    )
}

export default Layout
