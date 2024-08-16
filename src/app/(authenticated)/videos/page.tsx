'use client'

import { useState, useEffect } from 'react'
import { Prisma } from '@prisma/client'
import { Typography, Select, Row, Col, Card, Spin } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function VideosPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [category, setCategory] = useState<string | undefined>(undefined)
  const {
    data: videos,
    isLoading,
    refetch,
  } = Api.video.findMany.useQuery({
    where: category ? { category } : {},
    include: { user: true },
  })

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    refetch()
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Motivational Videos</Title>
      <Text>
        Watch and get inspired by our collection of motivational videos.
      </Text>
      <Select
        placeholder="Filter by category"
        style={{ width: 200, margin: '20px 0' }}
        onChange={handleCategoryChange}
        allowClear
      >
        <Option value="inspiration">Inspiration</Option>
        <Option value="success">Success</Option>
        <Option value="life">Life</Option>
        <Option value="career">Career</Option>
      </Select>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {videos?.map(video => (
            <Col xs={24} sm={12} md={8} lg={6} key={video.id}>
              <Card
                hoverable
                cover={<img alt={video.description} src={video.url} />}
                onClick={() => router.push(`/videos/${video.id}`)}
              >
                <Card.Meta
                  avatar={<PlayCircleOutlined style={{ fontSize: '24px' }} />}
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
