import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Spin,
  Alert
} from 'antd';
import AWS from 'aws-sdk'
import passwordValidator from 'password-validator';
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  setState: any
}

const Register: React.FC<Props> = (props) => {

  let setState = props.setState;

  const [uploaded, setUploaded] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [error, setError] = useState(false)

  const [form] = Form.useForm();

  const schema = new passwordValidator();

  schema
    .is()
    .min(8)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .symbols();

  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
		apiVersion: '2016-04-18',
		region: process.env.NEXT_PUBLIC_AWS_REGION,
		accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID
	});

  const onFinish = values => {


    var params = {
      ClientId: process.env.NEXT_PUBLIC_CLIENT_ID, 
      Username: values.email,
      Password: values.password,
      UserAttributes: [
        {
          Name: 'family_name',
          Value: values.last_name
        },
        {
          Name: 'given_name',
          Value: values.first_name
        },
        {
          Name: 'picture',
          Value: imageUrl
        }
      ],
    };
    cognitoidentityserviceprovider.signUp(params, function(err, data) {
      if (err) {
        setError(true)
        console.log(err, err.stack);
      } // an error occurred
      else     {
        setError(false)
        localStorage.setItem('@code_contest:username', values.email)
        setState('validate_code')
      };           // successful response
    });
  };

  const formatPasswordValidateError = (errors: Array<string>) => {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i] === 'min') {
        return 'Password length should be a at least 8 characters';
      } else if (errors[i] === 'lowercase') {
        return 'Password should contain lowercase letters';
      } else if (errors[i] === 'uppercase') {
        return 'Password should contain uppercase letters';
      } else if (errors[i] === 'digits') {
        return 'Password should contain digits';
      } else if (errors[i] === 'symbols') {
        return 'Password should contain symbols';
      }
    }
  };

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      {error && <Alert
        style={{minWidth: '100%', marginBottom: 15}}
        message="Error"
        description="Some error has occorred. Please try again later."
        type="error"
        showIcon
      />}
      <Form
        layout='vertical'
        form={form}
        name="register"
        onFinish={onFinish}
        style={{minWidth: '100%'}}
        scrollToFirstError
      >
        <Form.Item
          name="first_name"
          label={
            <span>
              First name&nbsp;
            </span>
          }
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="last_name"
          label={
            <span>
              Last name&nbsp;
            </span>
          }
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
          rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                const validationRulesErrors = schema.validate(value, { list: true });

                if (typeof validationRulesErrors === 'object' && validationRulesErrors.length > 0) {
                  return Promise.reject([formatPasswordValidateError(validationRulesErrors)])
                }

                return Promise.resolve();
              }
            })
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        
      
        {!uploaded ? <Form.Item
          name="avatar"
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Please upload your avatar!'
            }
          ]}
        >
          <Upload name="logo" listType="picture" beforeUpload={(file) => {
            setUploaded(true)
            var s3 = new AWS.S3({
              apiVersion: '2006-03-01',
              region: process.env.NEXT_PUBLIC_AWS_REGION,
              accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID
            })

            var params = {
              Body: file,
              Bucket: 'code-contest-website',
              Key: `user_pool/${file.uid}/${file.name}`,
            }

            s3.putObject(params, function (err, data) {
              if (err) {
                console.log(err, err.stack)
                setUploaded(false)
                return false
              } // an error occurred
              else {
                setImageUrl(`https://code-contest-website.s3.amazonaws.com/user_pool/${file.uid}/${file.name}`)
                setUploaded(true)
                return true
              } // successful response
            })

            return false
          }}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item> : (uploaded && !imageUrl) ? <Form.Item name="avatar"
        label="Avatar">
          <Spin />
        </Form.Item> :
        <Form.Item name="avatar"
        label="Avatar">
          <Avatar size={64} src={imageUrl} />
        </Form.Item>}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>{' '}or if you already have been account,{' '}<a onClick={() => {
            setState('login')
          }}>Login now!</a>
        </Form.Item>
      </Form>
    </>
  )

}

export default Register