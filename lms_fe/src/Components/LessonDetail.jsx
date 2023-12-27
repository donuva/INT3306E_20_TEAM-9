import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Card, message } from "antd";
import axios from "axios";
import { CameraFilled, FileOutlined } from "@ant-design/icons";


export default function LessonDetail({ isTeacher, checkTokenExpiration }) {
    const [messageApi, contextHolder] = message.useMessage();
    const { cid } = useParams();
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [selectedLesson, setSelectedLesson] = useState({});
    useEffect(() => {
        if (!checkTokenExpiration()) {
            alert('You need to re-login');
            navigate('/login');
        }
    }, []);

    useEffect(() => {

        const lessonApiUrl = `http://fall2324w20g9.int3306.freeddns.org/api/course/lesson/${lessonId}`;
        axios
            .get(lessonApiUrl, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                },
            })
            .then((response) => {
                console.log(response.data);
                setSelectedLesson({
                    id: lessonId,
                    topic: response.data.topic,
                    content: response.data.content,
                    url: response.data.url,
                    createdAt: response.data.createdAt,
                    updatedAt: response.data.updatedAt,
                });
            })
            .catch((error) => {
                console.error('Error fetching lesson:', error);
            });

    }, [lessonId]);

    return (
        <>
            {contextHolder}
            <div style={{ display: 'flex', minHeight: '1000px' }}>
                <Sidebar cid={cid} isTeacher={isTeacher} selected={'0'}></Sidebar>

                <div style={{ margin: '30px', flex: '1', textAlign: 'left' }}>
                    <h1>{selectedLesson.topic}</h1>
                    <hr />
                    <div style={{ backgroundColor: 'whitesmoke' }}>
                        <p style={{ padding: '8px', marginLeft: '5px' }}>
                            <span style={{ fontWeight: 'bold' }}>Created: </span>
                            <span>{selectedLesson.createdAt}</span>
                            <br />
                            <span style={{ fontWeight: 'bold' }}>Updated: </span>

                            <span>{selectedLesson.updatedAt}</span>

                        </p>
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        <h5>Detail:</h5>
                        <p style={{ fontSize: 'larger' }}>{selectedLesson.content}</p>

                    </div>


                    <Card style={{ marginTop: '40px' }}>
                        {selectedLesson.url ? (
                            <a style={{ textDecoration: 'none' }} href={`/storage/${selectedLesson.url}`} target="_blank" rel="noopener noreferrer">
                                <h6> <FileOutlined></FileOutlined> Open File</h6>
                            </a>
                        ) : (
                            'File not found'
                        )}
                    </Card>
                </div>
            </div>
        </>
    )
}