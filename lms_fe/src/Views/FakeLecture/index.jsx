
import { Empty, Row, Col, Space } from 'antd'

import Video from './components/Video'
import VideoInfo from './components/VideoInfo'
import PlaylistMenu from './components/PlaylistMenu'
import LectureComments from './components/LectureComments'


const selectLecture = (lectures, lectureId) => {
  if (!Array.isArray(lectures) || !lectures.length) return null
  if (!lectureId) return lectures[0]
  const index = lectures.findIndex((lecture) => lecture.id === lectureId)
  if (index === -1) return null
  return lectures[index]
}

const LecturePage = (props) => {

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} xl={18}>
          <Space size="middle" direction="vertical" style={{ width: '100%' }}>
            <Video></Video>
            <VideoInfo />
            <LectureComments />
          </Space>
        </Col>

        <Col xs={24} sm={24} xl={6}>
          <PlaylistMenu></PlaylistMenu>
        </Col>
      </Row>
    </>
  )
}

const Lectures = () => {


  // if (loading) {
  //   return <Spinner size="large" />
  // }

  return <LecturePage />
}

export default Lectures
