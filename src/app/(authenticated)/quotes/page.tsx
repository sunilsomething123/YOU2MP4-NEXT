'use client'

import { useState } from 'react'
import { Typography, Select, Row, Col, Card, Spin } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function QuotesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(
    undefined,
  )
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  )

  const {
    data: quotes,
    isLoading,
    refetch,
  } = Api.quote.findMany.useQuery({
    where: {
      ...(selectedAuthor && { author: selectedAuthor }),
      ...(selectedCategory && { category: selectedCategory }),
    },
  })

  const handleAuthorChange = (value: string) => {
    setSelectedAuthor(value)
    refetch()
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    refetch()
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Quotes</Title>
      <Text>
        Browse through a collection of quotes. Use the filters to find specific
        types of quotes.
      </Text>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Select
            style={{ width: '100%' }}
            placeholder="Filter by Author"
            onChange={handleAuthorChange}
            allowClear
          >
            {/* Assuming authors are predefined, otherwise fetch them dynamically */}
            <Option value="Author1">Author1</Option>
            <Option value="Author2">Author2</Option>
            <Option value="Author3">Author3</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Select
            style={{ width: '100%' }}
            placeholder="Filter by Category"
            onChange={handleCategoryChange}
            allowClear
          >
            {/* Assuming categories are predefined, otherwise fetch them dynamically */}
            <Option value="Category1">Category1</Option>
            <Option value="Category2">Category2</Option>
            <Option value="Category3">Category3</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          quotes?.map(quote => (
            <Col span={24} key={quote.id}>
              <Card>
                <Text strong>{quote.author}</Text>
                <Text>{quote.text}</Text>
                <Text type="secondary">{quote.category}</Text>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </PageLayout>
  )
}
