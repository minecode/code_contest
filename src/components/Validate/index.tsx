import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import AWS from 'aws-sdk'

interface Props {
  setState: any
}

const Validate: React.FC<Props> = (props) => {

  const [success, setSuccess] = useState(false)

  let setState = props.setState

  var cognitoidentityserviceprovider = null

  useEffect(() => {

    cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18',
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID
    });

  }, [])

  

  const onFinish = (values) => {
    var params = {
      ClientId: process.env.NEXT_PUBLIC_CLIENT_ID, 
      ConfirmationCode: values.code,
      Username: localStorage.getItem('@code_contest:username'),
    };
    cognitoidentityserviceprovider.confirmSignUp(params, function(err, data) {
      if (err) {
        setSuccess(false)
        console.log(err, err.stack);
      }// an error occurred
      else{
        setSuccess(true)
        setState('success_code')
        console.log(data);
      }           // successful response
    });
  }

  return  (
    <>
      {success && <Alert
									style={{minWidth: '100%'}}
									message="Error"
									description="Your validation code has incorrect."
									type="error"
									showIcon
								/>
      }
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{minWidth: '100%'}}
      >
        <Form.Item
          name="code"
          rules={[{ required: true, message: 'Please input your code!' }]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Code" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Confirm
          </Button>
          {' '}or{' '}<a onClick={() => {
            var params = {
              ClientId: process.env.NEXT_PUBLIC_CLIENT_ID, 
              Username: localStorage.getItem('@code_contest:username'),
            };
            cognitoidentityserviceprovider.resendConfirmationCode(params, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred 
            });
          }}>Send new code now!</a>
        </Form.Item>
      </Form>
    </>
  )

}

export default Validate