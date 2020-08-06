import React from 'react'

import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import base64 from 'base-64'
import apiDatabase from '../../services/apiDatabase'

import { Auth, BtnGoogle } from './styles'

const Authentication: React.FC = () => {
    const data = useSelector((state: any) => state.data)
    const authentication = useSelector(
        (state: any) => state.data.auth.authenticated
    )

    const dispatch = useDispatch()

    const login = async (response: any) => {
        const newData = { data: data }
        newData.data.auth = {
            authenticated: true,
            user: {
                id: response.googleId,
                name: response.profileObj.givenName,
                surname: response.profileObj.familyName,
                image: response.profileObj.imageUrl
            },
            token: response.tokenId
        }
        await apiDatabase.post(
            `/user/${response.googleId}/${response.profileObj.givenName}/${
                response.profileObj.familyName
            }/${base64.encode(response.profileObj.imageUrl)}`
        )
        dispatch({ type: 'LOGIN', data: newData })
    }

    const badResponseGoogle = (response: any) => {
        console.log(response)
        dispatch({ type: 'BAD_RESPONSE', data: null })
    }

    const logout = () => {
        const newData = { data: data }
        newData.data.auth = {
            authenticated: false,
            user: {
                id: null,
                name: null,
                surname: null,
                image: null
            },
            token: null
        }
        dispatch({ type: 'LOGOUT', data: newData })
    }

    return (
        <Auth>
            {authentication ? (
                <GoogleLogout
                    clientId="156221636932-bvl7ocr3bhrkikgcqc99k4g1a1s0sla1.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    className="BtnGoogle"
                    render={(renderProps) => (
                        <BtnGoogle
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
              Logout
                        </BtnGoogle>
                    )}
                ></GoogleLogout>
            ) : (
                <GoogleLogin
                    clientId="156221636932-bvl7ocr3bhrkikgcqc99k4g1a1s0sla1.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={login}
                    onFailure={badResponseGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    render={(renderProps) => (
                        <BtnGoogle
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
              Sign In w/ Google
                        </BtnGoogle>
                    )}
                />
            )}
        </Auth>
    )
}

export default Authentication
