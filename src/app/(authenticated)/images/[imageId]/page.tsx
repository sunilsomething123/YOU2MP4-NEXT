'use client'

import { Prisma } from '@prisma/client'
import {
  Typography,
  Button,
  Input,
  Row,
  Col,
  Image as AntImage,
  Spin,
} from 'antd'
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

export default function ImageDetailPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [comment, setComment] = useState<string>('')

  const imageId = params.imageId

  const {
    data: image,
    isLoading,
    refetch,
  } = Api.image.findUnique.useQuery({
    where: { id: imageId },
    include: { user: true, comments: true, likes: true },
  })

  const { mutateAsync: likeImage } = Api.like.create.useMutation()
  const { mutateAsync: commentImage } = Api.comment.create.useMutation()

  const handleLike = async () => {
    try {
      await likeImage({
        data: { contentId: imageId, contentType: 'image', userId: user.id },
      })
      enqueueSnackbar('Image liked!', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to like the image.', { variant: 'error' })
    }
  }

  const handleComment = async () => {
    if (!comment.trim()) {
      enqueueSnackbar('Comment cannot be empty.', { variant: 'error' })
      return
    }

    try {
      await commentImage({
        data: {
          text: comment,
          contentId: imageId,
          contentType: 'image',
          userId: user.id,
        },
      })
      enqueueSnackbar('Comment added!', { variant: 'success' })
      setComment('')
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to add comment.', { variant: 'error' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!image) {
    return (
      <PageLayout layout="narrow">
        <Title level={2}>Image not found</Title>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>{image.description}</Title>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={24}>
          <AntImage
            src={image.url}
            alt={image.description}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={24}>
          <Text>Uploaded by: {image.user?.name}</Text>
        </Col>
        <Col span={24}>
          <Button type="primary" icon={<LikeOutlined />} onClick={handleLike}>
            Like ({image.likes?.length.toString()})
          </Button>
        </Col>
        <Col span={24}>
          <Input.TextArea
            rows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button
            type="primary"
            icon={<CommentOutlined />}
            onClick={handleComment}
            style={{ marginTop: '8px' }}
          >
            Comment
          </Button>
        </Col>
        <Col span={24}>
          <Title level={4}>Comments</Title>
          {image.comments?.map(comment => (
            <Paragraph key={comment.id}>
              <Text strong>{comment.user?.name}: </Text>
              {comment.text}
            </Paragraph>
          ))}
        </Col>
      </Row>
    </PageLayout>
  )
}
