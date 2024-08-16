'use client'

import { Prisma } from '@prisma/client'
import { Typography, Row, Col, Button, Input, List, Avatar } from 'antd'
import { LikeOutlined, CommentOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function VideoDetailPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const videoId = params.videoId
  const {
    data: video,
    isLoading: videoLoading,
    refetch: refetchVideo,
  } = Api.video.findUnique.useQuery({
    where: { id: videoId },
    include: { user: true, comments: { include: { user: true } }, likes: true },
  })

  const { mutateAsync: createComment } = Api.comment.create.useMutation()
  const { mutateAsync: createLike } = Api.like.create.useMutation()

  const [commentText, setCommentText] = useState('')

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      await createComment({
        data: {
          text: commentText,
          contentId: videoId,
          contentType: 'video',
          userId: user.id,
        },
      })
      setCommentText('')
      refetchVideo()
      enqueueSnackbar('Comment added successfully', { variant: 'success' })
    } else {
      enqueueSnackbar('Comment cannot be empty', { variant: 'error' })
    }
  }

  const handleLike = async () => {
    await createLike({
      data: {
        contentId: videoId,
        contentType: 'video',
        userId: user.id,
      },
    })
    refetchVideo()
    enqueueSnackbar('Video liked successfully', { variant: 'success' })
  }

  if (videoLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>{video?.description}</Title>
      <Text type="secondary">
        Uploaded by {video?.user?.name} on{' '}
        {dayjs(video?.dateCreated).format('MMMM D, YYYY')}
      </Text>
      <div style={{ margin: '20px 0' }}>
        <video width="100%" controls>
          <source src={video?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button type="primary" icon={<LikeOutlined />} onClick={handleLike}>
            Like ({video?.likes?.length})
          </Button>
        </Col>
        <Col span={24}>
          <Input.TextArea
            rows={4}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Add a comment"
          />
          <Button
            type="primary"
            icon={<CommentOutlined />}
            onClick={handleCommentSubmit}
            style={{ marginTop: '10px' }}
          >
            Comment
          </Button>
        </Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={video?.comments}
        renderItem={comment => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{comment.user?.name?.charAt(0)}</Avatar>}
              title={comment.user?.name}
              description={comment.text}
            />
          </List.Item>
        )}
        style={{ marginTop: '20px' }}
      />
    </PageLayout>
  )
}
