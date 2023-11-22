import React, { useEffect, useState } from 'react';
import { Card, Typography, Space, Button, Modal, Form, Input, DatePicker, message, Upload } from 'antd';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { InboxOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ExerciseDetail = ({ checkTokenExpiration, isTeacher }) => {
    const navigate = useNavigate();
    const { cid } = useParams();
    const { eid } = useParams();
    const [exercise, setExercise] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [work, setWork] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);


    useEffect(() => {
        if (!checkTokenExpiration()) {
            alert('You need to re-login');
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/lms/exercise/${eid}`,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        };

        axios
            .request(config)
            .then((response) => {
                setExercise(response.data);
            })
            .catch((error) => {
                if (error.response.status === 402) {
                    navigate(`/app/courses/preview/${cid}`);
                }
                console.log(error);
            });
    }, []);

    //get ra bài nộp 
    useEffect(() => {
        if (isTeacher !== true) {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/lms/student/getExerciseScore/${eid}`,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                },
            };

            axios
                .request(config)
                .then((response) => {
                    setWork(response.data);
                })
                .catch((error) => {
                    if (error.response.status === 402) {
                        navigate(`/app/courses/preview/${cid}`);
                    }
                    console.log(error);
                });
        }
    }, []);



    const showModal = () => {
        const moment = require('moment')
        const outputFormat = "YYYY-MM-DD";
        const inputFormat = "DD/MM/YYYY";
        const date = exercise.deadline;
        const parsedDate = moment(date, inputFormat);
        const formattedDate = parsedDate.format(outputFormat);
        setIsModalVisible(true);
        form.setFieldsValue({
            title: exercise.title,
            content: exercise.content,
            deadline: formattedDate
        });
    };

    const handleOk = () => {
        const moment = require('moment')
        const inputFormat = "YYYY-MM-DD";
        const outputFormat = "DD/MM/YYYY";


        form
            .validateFields()
            .then((values) => {
                const date = values.deadline;
                const parsedDate = moment(date, inputFormat);
                const formattedDate = parsedDate.format(outputFormat);
                const updateConfig = {
                    method: 'put',
                    url: `http://localhost:8080/lms/teacher/exercise/update`,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                        'Content-Type': 'application/json',
                    },
                    data: {
                        id: eid,  // Assuming exercise id is needed for updating
                        title: values.title,
                        content: values.content,
                        course: {
                            id: cid
                        },
                        deadline: formattedDate
                    },
                };

                axios.request(updateConfig)
                    .then((response) => {
                        // Handle success, e.g., close the modal
                        setIsModalVisible(false);
                        window.location.reload();
                    })
                    .catch((error) => {
                        // Handle error
                        console.log(error);
                    });
            })
            .catch((errorInfo) => {
                console.log('Failed:', errorInfo);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleUpdate = () => {
        showModal();
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/lms/teacher/exercise/delete/${eid}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((response) => {
            messageApi.open({
                type: 'warning',
                content: 'Delete exercise succeed',
                duration: 5,
            });
            navigate(`/app/courses/${cid}`)
        }).catch((error) => {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'Delete exercise failed',
                duration: 5,
            });
        });
    }

    const submitWork = () => {
        const moment = require('moment');
        const outputFormat = "YYYY-MM-DD";
        const inputFormat = "DD/MM/YYYY";
        const date = exercise.deadline;
        const parsedDate = moment(date, inputFormat);
        const formattedDate = parsedDate.format(outputFormat);



        Modal.confirm({

            title: 'Submit your work',
            content: (
                <Form form={form} layout="vertical">
                    <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please input your content!' }]}>
                        <Input.TextArea required />
                    </Form.Item>
                    <Form.Item
                        label="Upload"
                        name="file"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e && e.fileList}
                    // Allow only the latest file
                    >
                        <Upload.Dragger
                            beforeUpload={() => false}
                            maxCount={1} // Limit the number of files to 1
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text" style={{ overflow: 'clip' }}>Click or drag file to this area to upload</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            ),
            onOk: async () => {
                try {
                    const values = await form.validateFields();

                    const formData = new FormData();
                    formData.append('content', values.content);
                    if (values.file !== undefined) {
                        formData.append('file', values.file[0].originFileObj);
                    }
                    formData.append('exercise.id', eid);
                    formData.append('student.id', localStorage.getItem('student_id'));
                    const submitWorkConfig = {
                        method: 'post',
                        url: `http://localhost:8080/lms/student/exercise/submit`,
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                            'Content-Type': 'multipart/form-data',
                        },
                        data: formData,
                    };

                    await axios.request(submitWorkConfig);

                    message.success('Work submitted successfully!');
                    setIsModalVisible(false);
                    window.location.reload();
                } catch (errorInfo) {
                    console.log('Failed:', errorInfo);
                }
            },
            onCancel: () => {
                form.resetFields();
            },
            width: '50vw'
        });
    }

    const deleteWork = async () => {
        try {

            const config = {
                method: 'delete',
                url: `http://localhost:8080/lms/student/exercise/delete/${work.id}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                },
            };

            await axios.request(config);

            message.success('Deleted successfully!');
            setWork(null);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    const showEditModal = () => {
        const initialValues = {
            content: work.content, // Set other initial values if needed
        };

        form.setFieldsValue(initialValues);

        setIsEditModalVisible(true);
    };

    const handleEditOk = async () => {
        try {
            const values = await form.validateFields();

            // Update the editing logic based on your requirements
            const formData = new FormData();
            formData.append('content', values.content);
            if (values.file !== undefined) {
                formData.append('file', values.file[0].originFileObj);
            }
            formData.append('exercise.id', eid);
            formData.append('student.id', localStorage.getItem('student_id'));
            formData.append('id', work.id)
            const submitWorkConfig = {
                method: 'post',
                url: `http://localhost:8080/lms/student/exercise/submit`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                    'Content-Type': 'multipart/form-data',
                },
                data: formData,
            };

            await axios.request(submitWorkConfig);

            message.success('Work submitted successfully!');
            setIsEditModalVisible(false);
            window.location.reload();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }
    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };

    const editWork = () => {
        showEditModal();
    };

    return (
        <>
            {contextHolder}
            <div style={{ display: 'flex', minHeight: '1000px' }}>
                <Sidebar cid={cid} isTeacher={isTeacher} selected={'0'}></Sidebar>
                <div style={{ margin: '30px', flex: '1', textAlign: 'left' }}>
                    <h1>{exercise.title}</h1>
                    <hr />
                    <div style={{ backgroundColor: 'whitesmoke' }}>
                        <p style={{ padding: '8px', marginLeft: '5px' }}>
                            <span style={{ fontWeight: 'bold' }}>Created: </span>
                            <span>{exercise.createdAt}</span>
                            <br />
                            <span style={{ fontWeight: 'bold' }}>Deadline: </span>
                            <span>{exercise.deadline}</span>
                        </p>
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        <h5>Detail:</h5>
                        <p>{exercise.content}</p>
                    </div>
                    {isTeacher === true && (
                        <Space>
                            <Link to={`/app/courses/${cid}/teacher/exercise/${eid}`}>
                                <Button type="primary" style={{ backgroundColor: 'green' }}>
                                    Get submitted work
                                </Button>
                            </Link>
                            <Button type="primary" onClick={handleUpdate}>
                                Edit
                            </Button>
                            <Button type="primary" style={{ backgroundColor: 'red' }} onClick={handleDelete}>
                                Delete
                            </Button>
                        </Space>
                    )}

                    {!isTeacher && work === null &&
                        <div>
                            <Button type="primary" onClick={submitWork}>
                                Submit your work
                            </Button>
                        </div>
                    }

                    {!isTeacher && work !== null &&
                        <div style={{ marginTop: '10vh' }}>
                            <hr></hr>
                            <h4>Review your submitted assignment</h4>
                            <table style={{ marginBottom: '20px' }}>
                                <tbody>
                                    <tr>
                                        <td><strong>Last updated: </strong></td>
                                        <td style={{ fontStyle: 'italic', paddingLeft: '30px' }}>{work.updatedAt}</td>
                                    </tr>

                                    <tr>
                                        <td><strong>Grade: </strong></td>
                                        <td style={{ fontStyle: 'italic', paddingLeft: '30px' }}>{work.grade}</td>
                                    </tr>

                                </tbody>
                            </table>

                            <h5>Content:</h5>
                            {work.content}

                            <Space style={{ marginTop: '5vh', display: 'flex', }}>
                                <Button style={{ width: '80px' }} type='primary' onClick={editWork}>
                                    Edit
                                </Button>
                                <Button type='primary' style={{ backgroundColor: 'red', color: 'white', width: '80px' }} onClick={deleteWork}>
                                    Delete
                                </Button>
                            </Space>


                        </div>
                    }
                </div>

                {/* Edit Exercise Modal */}
                <Modal
                    title="Edit Exercise"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item label="Title" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Content" name="content">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Deadline" name="deadline">
                            <Input
                                type="date"
                            />
                        </Form.Item>
                        {/* Add more form fields as needed */}
                    </Form>
                </Modal>

                <Modal
                    title="Edit Work"
                    visible={isEditModalVisible}
                    onOk={handleEditOk}
                    onCancel={handleEditCancel}
                >
                    <Form form={form} layout="vertical">
                        {/* Add form fields for editing work */}
                        <Form.Item label="Content" name="content">
                            <Input.TextArea required />
                        </Form.Item>
                        <Form.Item
                            label="Upload"
                            name="file"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e && e.fileList}
                        >
                            <Upload.Dragger
                                beforeUpload={() => false}
                                maxCount={1}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text" style={{ overflow: 'clip' }}>Click or drag file to this area to upload</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form>
                </Modal>

            </div>

        </>
    );
};

export default ExerciseDetail;
