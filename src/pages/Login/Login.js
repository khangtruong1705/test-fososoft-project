import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import { DOMAIN } from "../../util/config";
import { Button, message, Checkbox, Form, Input } from 'antd';
import styles from './Login.module.css'
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const newValue = {
                'email': values.email,
                'password': values.password
            }
            let res = await axios.post(`${DOMAIN}/api/users/login`, newValue);
            localStorage.setItem('token', res.data);
            const data = {
                'message': t('loginsuccessful'),
                'type': 'success'
            }
            openMessage(data)
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } catch (error) {
            const data = {
                'message': t('loginfailed'),
                'type': 'error'
            }
            openMessage(data)
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const openMessage = (data) => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: data.type,
                content: data.message,
                duration: 2,
            });
        }, 1000);
    };
    const handleLoginSuccess = async (credentialResponse) => {
        try {
            const token = {
                'token': credentialResponse.credential

            }
            const response = await axios.post(`${DOMAIN}/api/users/auth/google`,token);
            localStorage.setItem('token', response.data);
            const data = {
                'message': t('loginsuccessful'),
                'type': 'success'
            }
            openMessage(data)
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } catch (error) {
            console.error('Error sending token to backend:', error);
            console.log('Login Failed');
        }
    };
    const handleLoginFailure = () => {
        const data = {
            'message': t('loginfailed'),
            'type': 'error'
        }
        openMessage(data)
        console.log('Login Failed');
    };

    return <>
        <div>
            <div className="header">
                <div className='d-flex justify-content-between align-items-center w-75 mx-auto'>
                    <NavLink to='/' className='d-flex align-items-center'>
                        <img className="w-25" src={process.env.PUBLIC_URL + '/asset/images/logo.jpg'} />
                    </NavLink>
                    <NavLink to='/shopeehelp' style={{ color: '#0373f3', textDecoration: 'none' }}>
                        {t('areyouhelp')}
                    </NavLink>
                </div>
            </div>
            <div className="body p-5 d-flex justify-content-around" style={{ backgroundColor: '#0373f3' }}>
                <div>
                    <h1 className="text-white">SUNFIL1</h1>
                    <div className={styles.tagmarquee}>
                        <div className={styles.tagtrack}>
                            <p>Sunfil1 - Bộ lọc chất lượng, bảo vệ động cơ bền vững.</p>
                        </div>
                    </div>
                </div>
                <div className="card w-25 mx-auto">
                    <div className="card-header text-center">
                        {t('login')}
                    </div>
                    <div className="card-body">
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label={t('password')}
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" label={null}>
                                <Checkbox>{t('rememberme')}</Checkbox>
                            </Form.Item>

                            <Form.Item label={null}>
                                {contextHolder}
                                <Button type="primary"
                                    htmlType="submit"
                                >
                                    {t('submit')}
                                </Button>
                            </Form.Item>
                            <div className="d-flex justify-content-between mt-2" style={{ fontSize: '0.8rem', color: '#1877f2' }}>
                                <NavLink to={`/forgotpassword`}>{t('forgotpassword')}</NavLink>
                                <NavLink to={`/enterphonenumber`}>{t('loginwithsms')}</NavLink>
                            </div>
                        </Form>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-around">
                        <div className="p-2" style={{ border: '1px solid #e7e9eb',borderRadius:'4px' }}>
                            <i className="fa-brands fa-facebook mx-1" style={{ color: '#1877f2' }}></i>
                            <span>Facebook</span>
                        </div>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                        />
                    </div>
                    <div className="mt-3 text-center">
                        {t('youknowshopee')} <NavLink to='/register'>{t('signup')}</NavLink>
                    </div>
                </div>

            </div>

            <Footer></Footer>
        </div>
    </>
};


export default Login