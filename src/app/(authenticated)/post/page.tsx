'use client'

import { useState } from 'react'
import { Prisma } from '@prisma/client'
import { Typography, Input, Button, Upload, Form, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function PostContentPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync: createQuote } = Api.quote.create.useMutation()
  const { mutateAsync: createImage } = Api.image.create.useMutation()
  const { mutateAsync: createVideo } = Api.video.create.useMutation()
  const { mutateAsync: upload } = useUploadPublic()

  const [form] = Form.useForm()
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (values: any) => {
    try {
      setUploading(true)
      let fileUrl = ''
      if (values.file) {
        const file = values.file.file.originFileObj
        const uploadResult = await upload({ file })
        fileUrl = uploadResult.url
      }

      if (values.type === 'quote') {
        await createQuote({
          data: {
            text: values.text,
            author: values.author,
            category: values.category,
            userId: user.id,
          },
        })
      } else if (values.type === 'image') {
        await createImage({
          data: {
            url: fileUrl,
            description: values.description,
            category: values.category,
            userId: user.id,
          },
        })
      } else if (values.type === 'video') {
        await createVideo({
          data: {
            url: fileUrl,
            description: values.description,
            category: values.category,
            userId: user.id,
          },
        })
      }

      enqueueSnackbar('Content posted successfully!', { variant: 'success' })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Failed to post content. Please try again.', {
        variant: 'error',
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Post New Content</Title>
      <Text>
        Share your inspirational quotes, images, or videos with others.
      </Text>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="type"
          label="Content Type"
          rules={[{ required: true, message: 'Please select a content type' }]}
        >
          <Select placeholder="Select content type">
            <Option value="quote">Quote</Option>
            <Option value="image">Image</Option>
            <Option value="video">Video</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please enter a category' }]}
        >
          <Input placeholder="Enter category" />
        </Form.Item>

        <Form.Item
          name="text"
          label="Quote Text"
          rules={[{ required: true, message: 'Please enter the quote text' }]}
        >
          <TextArea rows={4} placeholder="Enter quote text" />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: 'Please enter the author' }]}
        >
          <Input placeholder="Enter author" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item name="file" label="Upload File" valuePropName="fileList">
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={uploading}>
            Post Content
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
