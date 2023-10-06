import React from 'react'

import styled from 'styled-components'

export const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
`

export const VideoFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Video = (props) => {
  const { selectedLecture } = props
  const fakeVideoUrl = "https://www.youtube.com/watch?v=uP7uzdoKQB4"
  let regexpNames =
  /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/i
  const videoId = regexpNames.exec(fakeVideoUrl)
  return (
    <VideoWrapper>
      <VideoFrame
        title="courseVideo"
        // src={`https://www.youtube.com/embed/${selectedLecture.videoId}`}
        src={`https://www.youtube.com/embed/${videoId}`}

        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
      ></VideoFrame>
    </VideoWrapper>
  )
}

export default Video
