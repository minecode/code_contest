import React from 'react'
import base64 from 'base-64'
import apiDatabase from '../../services/apiDatabase'
import { Data } from '../Interface'
import { Auth, BtnGoogle, LogoutIcon, LoginIcon } from './styles'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useSelector, useDispatch } from 'react-redux'


const Authentication: React.FC = () => {
    const dispatch = useDispatch()
    const data = useSelector((state: Data) => state.data)
    const authenticated = useSelector((state: Data) => state.data.auth.authenticated)

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

    const badResponseGoogle = (response: string) => {
        dispatch({ type: 'BAD_RESPONSE', data: null })
    }

    const logout = () => {
        const newData = { data: data }
        newData.data.auth.authenticated = false
        dispatch({ type: 'LOGOUT', data: newData })
    }

    return (
        <Auth>
            {authenticated ? (
                <GoogleLogout
                    clientId="156221636932-bvl7ocr3bhrkikgcqc99k4g1a1s0sla1.apps.googleusercontent.com"
                    onLogoutSuccess={logout}
                    render={(renderProps) => (
                        <BtnGoogle
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <span>Logout </span>
                            <LogoutIcon />
                        </BtnGoogle>
                    )}
                ></GoogleLogout>
            ) : (
                <GoogleLogin
                    clientId="156221636932-bvl7ocr3bhrkikgcqc99k4g1a1s0sla1.apps.googleusercontent.com"
                    onSuccess={login}
                    onFailure={badResponseGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    render={(renderProps) => (
                        <BtnGoogle
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <span>Login w/ Google </span>
                            <LoginIcon />
                        </BtnGoogle>
                    )}
                />
            )}
        </Auth>
    )
}

export default Authentication
