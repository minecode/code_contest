import React  from 'react'
import { useSelector } from 'react-redux'
import { Container, Avatar, UserInfo, Dashboard, DashboardIcon, LogoutButton, LogoutIcon, LoginButton, LoginIcon } from './styles'
import { Data } from '../Interface'
import { useLocation } from 'react-router-dom'

const Navbar: React.FC = () => {
    const dataAuth = useSelector((state: Data) => state.data.auth)

    const location = useLocation();  

    return (
        <Container>
            {dataAuth.authenticated ? (
                <div style={{display: 'flex', flex: 1, justifyContent: 'space-between'}}>
                    <UserInfo>
                        <span>Welcome, {dataAuth.user.name}!</span>
                        <Avatar src={dataAuth.user.image} />
                    </UserInfo>
                    <div style={{display: 'flex'}}>
                        <Dashboard to={location.pathname.includes('dashboard') ? '/code_contest' : '/code_contest/dashboard'}>
                            <span>{location.pathname.includes('dashboard') ? "Home" : "Dashboard" }</span>
                            <DashboardIcon />
                        </Dashboard>
                        <LogoutButton onClick={() => {}}>
                            Logout<LogoutIcon />
                        </LogoutButton>
                    </div>
                </div>
            ) : (
                <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                     <LoginButton onClick={() => {
                        window.location.href = `https://codecontestf6f8446e-f6f8446e-dev.auth.us-east-1.amazoncognito.com/login?client_id=4s0k4rrrggv6utvjbq8fsbb2jj&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/code_contest/authenticate`
                        }}>
                        Login<LoginIcon />
                    </LoginButton>
                </div>
            )}
        </Container>
    )
}

export default Navbar
