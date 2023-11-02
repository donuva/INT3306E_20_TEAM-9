import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router';

const Course = ({ checkTokenExpiration }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: null,
    name: '',
    birthdate: '',
    username: '',
    ava_url: null,
    bio: '',
    email: '',
    phone: '',
    role: '',
  });
  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert("You need to re-login")

      navigate('/login');
    } else {
      setUserData(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const page = searchParams.get("page") || 1;
  const x = "Hello world";
  let col = (
    <Col span={8} style={{ marginBottom: "40px" }}>
      <Card
        hoverable
        bordered={true}
        style={{
          width: "240px",
          margin: "auto",
        }}
        cover={
          <div
            style={{
              backgroundImage:
                "url('data:image/jpeg;base64,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')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              maxWidth: "240px",
              height: "180px",
              position: "relative",
            }}
          >
            <p
              style={{
                color: "white",
                bottom: "0",
                position: "absolute",
                paddingLeft: "20px",
              }}
            >
              0% Complete
            </p>
            <Button
              style={{ position: "absolute", bottom: "20px", right: "20px" }}
              shape="circle"
            >
              ...
            </Button>
          </div>
        }
      >
        {x}
      </Card>
    </Col>
  );
  const renderPagination = () => {
    return (
      <nav className="footer">
        <ul className="pagination justify-content-center">

          <li className={page == 1 ? "page-item active" : "page-item"}>
            <Link className="page-link" to={"/app/courses" + '?page=1'} >1</Link>
          </li>
          <li className={page == 2 ? "page-item active" : "page-item"}>
            <Link className="page-link" to={"/app/courses" + '?page=2'} >2</Link>
          </li>
          <li className={page == 3 ? "page-item active" : "page-item"}>
            <Link className="page-link" to={"/app/courses" + '?page=3'} >3</Link>
          </li>
          <li className={page == 4 ? "page-item active" : "page-item"}>
            <Link className="page-link" to={"/app/courses" + '?page=4'} >4</Link>
          </li>
          <li className={page == 5 ? "page-item active" : "page-item"}>
            <Link className="page-link" to={"/app/courses" + '?page=5'} >5</Link>
          </li>

        </ul>
      </nav>
    )

  }
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  return (
    <>
      <h1> Lectures </h1>
      <Link to="/app/courseDetail">
        <Row gutter={16}>{arr.map((i) => col)}</Row>
      </Link>
      {renderPagination()}
    </>

  );
};
export default Course;