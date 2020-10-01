import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AWS from 'aws-sdk'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'
import createPersistedState from 'use-persisted-state';

interface Props {
  setState: any
}

const Login: React.FC<Props> = (props) => {

  let setState = props.setState

  const router = useRouter()
  
  const useloggedInState = createPersistedState('loggedIn');
	const useAccessTokenState = createPersistedState('accessToken');
	const useRefreshTokenState = createPersistedState('refreshToken');
	const useIdTokenState = createPersistedState('idToken');
	
	const [loggedIn, setLoggedIn] = useloggedInState(false)
	const [accessToken, setAccessToken] = useAccessTokenState('access_token')
	const [refreshToken, setRefreshToken] = useRefreshTokenState('refresh_token')
	const [idToken, setIdToken] = useIdTokenState('idToken')

  const [error, setError] = useState(false)

  const onFinish = values => {
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18',
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID
    });
    var params = {
      AuthFlow: 'USER_PASSWORD_AUTH', 
      ClientId: process.env.NEXT_PUBLIC_CLIENT_ID, 
      AuthParameters: {
        USERNAME: values.email,
        PASSWORD: values.password,
      },
    };
    cognitoidentityserviceprovider.initiateAuth(params, function(err, data) {
      if (err) {
        setError(true)
        console.log(err, err.stack);
      } // an error occurred
      else {
        setError(false)
        setAccessToken(data.AuthenticationResult.AccessToken)
        setRefreshToken(data.AuthenticationResult.RefreshToken)
        setIdToken(jwt_decode(data.AuthenticationResult.IdToken))
        setLoggedIn(true)
        router.push('/')
      }
    });
  };

  return (
    <>
      {error && <Alert
        style={{minWidth: '100%', marginBottom: 15}}
        message="Error"
        description="Email or password incorrect!"
        type="error"
        showIcon
      />}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{minWidth: '100%'}}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" onClick={() => {
            setState('forgot')
          }}>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          {' '}or{' '}<a onClick={() => {
            setState('register')
          }}>Register now!</a>
        </Form.Item>
      </Form>
    </>
  )


}

export default Login
