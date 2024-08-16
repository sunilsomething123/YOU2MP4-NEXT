// file created

import React, { useState } from 'react'
import { Input, Row, Col, Card, Typography, Spin } from 'antd'
import { Api } from '@/core/trpc'

const { Title, Text } = Typography

export const DiscoverBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const {
    data: quotes,
    isLoading,
    refetch,
  } = Api.quote.findMany.useQuery({
    where: {
      OR: [
        { text: { contains: searchTerm, mode: 'insensitive' } },
        { author: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    refetch()
  }

  return (
    <div>
      <Input
        placeholder="Search quotes..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
      />
      <Row gutter={[16, 16]}>
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
    </div>
  )
}
