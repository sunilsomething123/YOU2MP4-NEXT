'use client'

import { useState } from 'react'
import { Prisma } from '@prisma/client'
import { Typography, Select, Row, Col, Card, Spin } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function ImagesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  )

  const {
    data: images,
    isLoading,
    refetch,
  } = Api.image.findMany.useQuery({
    where: selectedCategory ? { category: selectedCategory } : {},
    include: { user: true },
  })

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    refetch()
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Inspirational Image Gallery</Title>
      <Text>
        Browse through a collection of inspirational images. Use the filter to
        find images by category.
      </Text>

      <Select
        placeholder="Select a category"
        onChange={handleCategoryChange}
        style={{ width: 200, margin: '20px 0' }}
      >
        <Option value="nature">Nature</Option>
        <Option value="technology">Technology</Option>
        <Option value="people">People</Option>
        <Option value="architecture">Architecture</Option>
        <Option value="animals">Animals</Option>
      </Select>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {images?.map(image => (
            <Col key={image.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={image.description} src={image.url} />}
                actions={[
                  <PictureOutlined
                    key="view"
                    onClick={() => router.push(`/images/${image.id}`)}
                  />,
                ]}
              >
                <Card.Meta
                  title={image.description}
                  description={`Category: ${image.category}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
