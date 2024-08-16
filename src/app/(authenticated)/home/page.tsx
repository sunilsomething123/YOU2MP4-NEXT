'use client'

import { Typography, Row, Col, Card, Spin, Input, Upload, message } from 'antd'
import {
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [searchTerm, setSearchTerm] = useState('')
  const [fileList, setFileList] = useState([])

  const { data: quotes, isLoading: isLoadingQuotes } =
    Api.quote.findMany.useQuery({})
  const { data: images, isLoading: isLoadingImages } =
    Api.image.findMany.useQuery({})
  const { data: videos, isLoading: isLoadingVideos } =
    Api.video.findMany.useQuery({})

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredQuotes = quotes?.filter(quote =>
    quote.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handlePreview = async file => {
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const imgWindow = window.open(src)
    imgWindow.document.write(`<img src="${src}" />`)
  }

  return (
    <PageLayout layout="narrow">
      <div
        className="relative bg-cover bg-center h-64"
        style={{
          backgroundImage: `url('https://marblism-workspace--production.s3.us-west-1.amazonaws.com/mockups/b8158ab3-e7db-4412-b043-a31256fa404c.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYZMB3IWKKKFY6QOC%2F20240816%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240816T152418Z&X-Amz-Expires=3600&X-Amz-Signature=f09fc9f9b36325e2a1879af22624f606e9da0a14407cf873e95f4f2c55f472b5&X-Amz-SignedHeaders=host&x-id=GetObject')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold text-center">
            Knowledge gives you power but character gives you respect
          </h1>
        </div>
      </div>

      <Title level={1} className="text-4xl mt-8">Discover Quotes</Title>
      <Input
        placeholder="Search quotes..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-8"
      />

      <Title level={2} className="text-4xl mt-8">Famous Quotes</Title>
      <Paragraph className="text-lg">Get inspired by these famous quotes.</Paragraph>
      {isLoadingQuotes ? (
        <Spin />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredQuotes?.map(quote => (
            <Col span={24} key={quote.id}>
              <Card className="shadow-lg rounded-lg">
                <Text strong className="text-xl">{quote.text}</Text>
                <Paragraph className="text-lg">— {quote.author}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Title level={2} className="text-4xl mt-8">Upload Content</Title>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUploadChange}
        beforeUpload={() => false}
      >
        {fileList.length >= 8 ? null : <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>}
      </Upload>

      <Title level={2} className="text-4xl mt-8">Recommended Content</Title>
      <Paragraph className="text-lg">Explore new content posted by other users.</Paragraph>
      {isLoadingImages || isLoadingVideos ? (
        <Spin />
      ) : (
        <Row gutter={[16, 16]}>
          {images?.map(image => (
            <Col span={8} key={image.id}>
              <Card
                className="shadow-lg rounded-lg"
                cover={<img alt={image.description} src={image.url} className="rounded-t-lg" />}
                actions={[
                  <LikeOutlined key="like" />,
                  <CommentOutlined key="comment" />,
                  <ShareAltOutlined key="share" />,
                ]}
              >
                <Card.Meta
                  title={<Text className="text-xl">{image.description}</Text>}
                  description={<Text className="text-lg">Category: {image.category}</Text>}
                />
              </Card>
            </Col>
          ))}
          {videos?.map(video => (
            <Col span={8} key={video.id}>
              <Card
                className="shadow-lg rounded-lg"
                cover={<video controls src={video.url} className="rounded-t-lg" />}
                actions={[
                  <LikeOutlined key="like" />,
                  <CommentOutlined key="comment" />,
                  <ShareAltOutlined key="share" />,
                ]}
              >
                <Card.Meta
                  title={<Text className="text-xl">{video.description}</Text>}
                  description={<Text className="text-lg">Category: {video.category}</Text>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
