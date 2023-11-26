import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Avatar, Button, Card, List, Modal } from "antd";

export default function WorkList({ checkTokenExpiration, isTeacher }) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageInfo, setPageInfo] = useState({});
    const { cid } = useParams();
    const { eid } = useParams();
    const [list, setList] = useState();
    const page = searchParams.get("page") || 0;
    const [scoreInputs, setScoreInputs] = useState({}); // State to manage score inputs for each item
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        if (!checkTokenExpiration()) {
            alert('You need to re-login');
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/lms/teacher/getScoreByExercise/${eid}?current_page=${page}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        };

        axios.request(config)
            .then((response) => {
                setList(response.data.data);
                // Initialize score inputs state with an object for each item
                const initialScoreInputs = response.data.data.reduce((acc, item) => {
                    acc[item.id] = { visible: false, value: '' };
                    return acc;
                }, {});
                setScoreInputs(initialScoreInputs);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page, submit]);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    const handleShowScoreInput = (id) => {
        setScoreInputs((prevScoreInputs) => ({
            ...prevScoreInputs,
            [id]: { visible: true, value: '' }
        }));
    };

    const handleHideScoreInput = (id) => {
        setScoreInputs((prevScoreInputs) => ({
            ...prevScoreInputs,
            [id]: { visible: false, value: '' }
        }));
    };

    const handleScoreInputChange = (id, event) => {
        const { value } = event.target;
        setScoreInputs((prevScoreInputs) => ({
            ...prevScoreInputs,
            [id]: { ...prevScoreInputs[id], value: value }
        }));
    };

    const handleAddScore = (id) => {
        const inputValue = scoreInputs[id].value;

        let data = new FormData();
        data.append('grade', inputValue);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/lms/teacher/exercise/addScore/${id}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                // Update the list to reflect the new data
                setList((prevList) =>
                    prevList.map((item) =>
                        item.id === id ? { ...item, grade: inputValue } : item
                    )
                );

                handleHideScoreInput(id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const renderPagination = () => {
        return (
            <nav className="footer">
                {pageInfo.totalPages !== 0 &&
                    <ul className="pagination justify-content-center">
                        {page > 0 && (
                            <li className='page-item' onClick={() => handlePageChange(page - 1)}>
                                <Link className='page-link'>Previous</Link>
                            </li>
                        )}
                        {pageInfo.totalPages &&
                            Array.from({ length: pageInfo.totalPages }, (_, index) => (
                                <li
                                    onClick={() => handlePageChange(index)}
                                    key={index}
                                    className={page === index ? 'page-item active' : 'page-item'}
                                >
                                    <Link className='page-link'>{index + 1}</Link>
                                </li>
                            ))}
                        {page < pageInfo.totalPages - 1 && (
                            <li onClick={() => handlePageChange(page + 1)} className='page-item'>
                                <Link className='page-link'>Next</Link>
                            </li>
                        )}
                    </ul>}
            </nav>
        );
    };

    const handleDetailClick = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/lms/teacher/exercise/getWork/${id}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        };

        axios.request(config)
            .then((response) => {
                Modal.info({
                    title: 'Detail',
                    content: (
                        <div>
                            <Avatar src={'/storage/' + response.data.student.user.ava_url}></Avatar>
                            <p><strong>Name: </strong> {response.data.student.user.name}<br />
                                <strong>Email: </strong>{response.data.student.user.email}</p>
                            <p><strong>Content: </strong> <br />
                                {response.data.content}
                            </p>
                            {response.data.exercise_url &&
                                <a href={'/storage/' + response.data.exercise_url} target="_blank" rel="noopener noreferrer">Open File</a>
                            }
                        </div>
                    ), width: '60vw'
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDeleteScore = (id) => {

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/lms/teacher/exercise/deleteScore/${id}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
        };

        axios.request(config)
            .then((response) => {
                setSubmit(!submit);
            })
            .catch((error) => {

                console.log(error);
            });

    };

    return (
        <>
            <div style={{ display: 'flex', minHeight: '1000px' }}>
                <Sidebar cid={cid} isTeacher={isTeacher} selected={'0'}></Sidebar>
                <div style={{ marginTop: '20px', marginBottom: '20px', flex: '1' }} >
                    <Card style={{ marginLeft: '30px', marginTop: '30px', marginRight: '30px' }}>
                        <List style={{ minHeight: '1000px' }}
                            dataSource={list}
                            renderItem={(item) => (
                                <List.Item actions={[
                                    <Button
                                        key="detail"
                                        type="primary"
                                        style={{ width: '80px' }}
                                        onClick={() => handleDetailClick(item.id)}
                                    >
                                        Detail
                                    </Button>,
                                    <Button
                                        key="show_score_input"
                                        type="primary"
                                        style={{ width: '110px', background: 'green' }}
                                        onClick={() => handleShowScoreInput(item.id)}
                                        disabled={item.grade !== null || scoreInputs[item.id]?.visible}
                                    >
                                        Add Score
                                    </Button>,
                                    <Button
                                        className="delete_score-btn"
                                        key="delete_score"
                                        style={{ width: '110px', background: 'red', color: 'white' }}
                                        onClick={() => handleDeleteScore(item.id)}
                                        disabled={item.grade === null}
                                    >
                                        Delete Score
                                    </Button>
                                ]}>
                                    <div style={{ display: 'flex' }}>
                                        <Avatar style={{ marginTop: '5px' }} src={'/storage/' + item.student.user.ava_url} />
                                        <p style={{ textAlign: 'left', marginLeft: '20px', width: '20vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            <strong>Name: </strong>{item.student.user.name}<br />
                                            <strong>Email: </strong>{item.student.user.email}
                                        </p>

                                        <p style={{ marginLeft: '20vw', marginTop: '1rem' }}><strong>Grade: </strong><span> {item.grade} </span></p>
                                    </div>

                                    {/* Score Input */}
                                    {scoreInputs[item.id]?.visible && (
                                        <div style={{ marginLeft: '20px' }}>
                                            <input
                                                style={{ width: '100px' }}
                                                type="number"
                                                name="grade"
                                                placeholder="Enter Score"
                                                value={scoreInputs[item.id]?.value}
                                                onChange={(event) => handleScoreInputChange(item.id, event)}
                                                min={0}
                                                max={10}
                                                step={0.25}
                                            />
                                            <Button
                                                type="default"
                                                style={{ marginLeft: '10px' }}
                                                onClick={() => handleAddScore(item.id)}
                                            >
                                                Submit
                                            </Button>
                                            <Button
                                                type="default"
                                                style={{ marginLeft: '10px' }}
                                                onClick={() => handleHideScoreInput(item.id)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </List.Item>
                            )}
                        />
                        {renderPagination()}
                    </Card>
                </div>
            </div>
        </>
    );
}
