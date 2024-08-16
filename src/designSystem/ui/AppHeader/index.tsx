import { Logo } from '@/designSystem/layouts/NavigationLayout/components/Logo'
import { Typography } from 'antd'
import React from 'react'

const { Text, Title } = Typography

type Props = {
  title?: string
  description?: string
}

export const AppHeader: React.FC<Props> = ({
  title = 'TheGenuine',
  description,
}) => {
  return (
    <div className="flex flex-col items-center py-4 bg-black text-white">
      <div className="flex justify-center mb-4">
        <Logo height="100" />
      </div>
      <div className="text-center">
        <Title level={1} className="text-4xl font-bold m-0">
          {title}
        </Title>
        {description && (
          <Text className="text-base font-normal text-gray-400">
            {description}
          </Text>
        )}
      </div>
    </div>
  )
}
