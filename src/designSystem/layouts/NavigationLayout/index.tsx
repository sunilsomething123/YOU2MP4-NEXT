import { useUserContext } from '@/core/context'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useDesignSystem } from '../../provider'
import { Leftbar } from './components/Leftbar'
import { Topbar } from './components/Topbar'

import { Logo } from './components/Logo'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const { authenticationStatus: isLoggedIn } = useUserContext()

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  let itemsLeftbar = []

  let itemsTopbar = [
    {
      key: '/home',
      label: 'Home Page',
      onClick: () => goTo('/home'),
    },

    {
      key: '/quotes',
      label: 'Quotes Page',
      onClick: () => goTo('/quotes'),
    },

    {
      key: '/images',
      label: 'Images Page',
      onClick: () => goTo('/images'),
    },

    {
      key: '/videos',
      label: 'Videos Page',
      onClick: () => goTo('/videos'),
    },

    {
      key: '/post',
      label: 'Post Content Page',
      onClick: () => goTo('/post'),
    },
  ]

  let itemsMobile = [
    {
      key: '/profile',
      label: 'Profile',
      onClick: () => goTo('/profile'),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  let itemsLeftbarBottom = []

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                header={<Logo height={40} />}
                items={itemsLeftbar}
                itemsBottom={itemsLeftbarBottom}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              itemsMobile={itemsMobile}
              isLoggedIn={isLoggedIn === 'authenticated'}
              items={itemsTopbar}
              header={!isLeftbar && <Logo height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
