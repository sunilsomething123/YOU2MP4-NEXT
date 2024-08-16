'use client'

import { Typography, Row, Col, Card, Spin } from 'antd'
import {
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
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

  const { data: quotes, isLoading: isLoadingQuotes } =
    Api.quote.findMany.useQuery({})
  const { data: images, isLoading: isLoadingImages } =
    Api.image.findMany.useQuery({})
  const { data: videos, isLoading: isLoadingVideos } =
    Api.video.findMany.useQuery({})

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Famous Quotes</Title>
      <Paragraph>Get inspired by these famous quotes.</Paragraph>
      {isLoadingQuotes ? (
        <Spin />
      ) : (
        <Row gutter={[16, 16]}>
          {quotes?.map(quote => (
            <Col span={24} key={quote.id}>
              <Card>
                <Text strong>{quote.text}</Text>
                <Paragraph>— {quote.author}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Title level={2} style={{ marginTop: '2rem' }}>
        Recommended Content
      </Title>
      <Paragraph>Explore new content posted by other users.</Paragraph>
      {isLoadingImages || isLoadingVideos ? (
        <Spin />
      ) : (
        <Row gutter={[16, 16]}>
          {images?.map(image => (
            <Col span={8} key={image.id}>
              <Card
                cover={<img alt={image.description} src={image.url} />}
                actions={[
                  <LikeOutlined key="like" />,
                  <CommentOutlined key="comment" />,
                  <ShareAltOutlined key="share" />,
                ]}
              >
                <Card.Meta
                  title={image.description}
                  description={`Category: ${image.category}`}
                />
              </Card>
            </Col>
          ))}
          {videos?.map(video => (
            <Col span={8} key={video.id}>
              <Card
                cover={<video controls src={video.url} />}
                actions={[
                  <LikeOutlined key="like" />,
                  <CommentOutlined key="comment" />,
                  <ShareAltOutlined key="share" />,
                ]}
              >
                <Card.Meta
                  title={video.description}
                  description={`Category: ${video.category}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
