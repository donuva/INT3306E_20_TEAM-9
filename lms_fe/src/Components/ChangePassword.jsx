import { List, Card, message, Button, Modal, Avatar, Input, Space, Form, Grid } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const { useBreakpoint } = Grid;

    const [messageApi, contextHolder] = message.useMessage();
    const [username, setUsername] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { md } = useBreakpoint();

    const handleResetPassword = async () => {
        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://fall2324w20g9.int3306.freeddns.org/api/resetPassword?username=' + username
            };

            message.loading({
                content: "Processing ...",
                duration: 5
            });
            const response = await axios.request(config);
            console.log(response.data.data)
            messageApi.success('Check your mailbox');
            setIsSent(true);
        } catch (error) {
            console.log(error);
            messageApi.error('Request failed');
        }
    }


    const onFinish = async () => {
        if (form.getFieldValue('password') != form.getFieldValue('re-password')) {
            message.error('Re-enter password is not match');
            return;
        }

        try {
            const values = await form.validateFields();

            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                if (key != 're-password') {
                    formData.append(key, values[key]);
                }
            });

            // Gửi yêu cầu API tại đây
            // Sử dụng fetch hoặc thư viện tương tự để gửi yêu cầu API đến server
            const url = 'http://fall2324w20g9.int3306.freeddns.org/api/resetPassword'
            axios.post(url, formData)
                .then(() => {
                    message.success('Update password successful');
                    navigate('/login')
                })
        }
        catch (error) {
            console.error('Update password failed:', error.response.data);
            message.error('Update password failed: ' + error.response.data);
        }
    };

    return (
        <>
            {contextHolder}

            <Card title="Change password" style={{ minHeight: '800px', alignItems: 'center', display: 'flex', flexDirection: 'column', width: '50vw', margin: 'auto', marginTop: '50px', marginBottom: '50px' }} bordered>
                {isSent == false && <>
                    <h5>Enter your username:</h5>
                    <Input style={{ width: '200px' }} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <br></br>
                    <Button style={{ marginTop: '20px' }} type="primary" onClick={handleResetPassword}>Submit</Button>
                </>
                }
                {isSent && <Form style={{ width: md ? 500 : '100%' }} form={form} name="register" onFinish={onFinish} scrollToFirstError>
                    <Form.Item
                        name="token"
                        label="Token"
                        rules={[{ required: true, message: 'Please input your token in email!' }]}
                        labelCol={{ span: md ? 8 : 24 }}
                        wrapperCol={{ span: md ? 16 : 24 }}
                    >
                        <Input placeholder="Enter your token" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Enter your new password"
                        type="password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                        labelCol={{ span: md ? 8 : 24 }}
                        wrapperCol={{ span: md ? 16 : 24 }}
                    >
                        <Input placeholder="Enter your new password" />
                    </Form.Item>
                    <Form.Item
                        name="re-password"
                        type="password"
                        label="Re-Enter your new password"
                        rules={[{ required: true, message: 'Please re-enter your new password!' }]}
                        labelCol={{ span: md ? 8 : 24 }}
                        wrapperCol={{ span: md ? 16 : 24 }}
                    >
                        <Input placeholder="Re-Enter your new password" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: md ? 16 : 24, offset: md ? 8 : 0 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                }
            </Card>


        </>
    )
}