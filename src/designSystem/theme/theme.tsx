import { theme } from 'antd'
import { Inter } from 'next/font/google'

const interFont = Inter({
  subsets: ['latin'],
})

export const Theme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Colors
    colorPrimary: '#1DB954', // Spotify's primary green color
    colorError: '#ff4d4f',
    colorInfo: '#1DB954',
    colorSuccess: '#1DB954',
    colorWarning: '#faad14',
    colorTextBase: '#FFFFFF',
    colorLink: '#1DB954',
    colorBgBase: '#191414', // Spotify's dark background color
    colorBgContainer: '#191414',
    colorBorder: '#282828',
    colorBorderSecondary: '#404040',
    colorSplit: 'rgba(255, 255, 255, 0.1)',

    // Typography
    fontFamily: `${interFont.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 14,
    fontSizeHeading1: 48, // Adjusted for Spotify-like large headings
    fontSizeHeading2: 32,
    fontSizeHeading3: 24,
    linkDecoration: 'none',

    // Form
    controlItemBgActive: '#282828',
    controlOutline: 'rgba(255, 255, 255, 0.2)',
    controlHeight: 36,
    controlHeightSM: 32,

    // Layout
    padding: 16,
    boxShadow:
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

    borderRadius: 6,
    lineType: 'solid',
    lineWidth: 1,
    motion: false,
  },
  components: {
    Form: {
      itemMarginBottom: '22px',
    },
    Layout: {
      headerBg: '#191414',
      footerBg: '#191414',
      bodyBg: '#191414',
      siderBg: '#121212',
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      // topbar menu items
      horizontalItemSelectedColor: '#FFFFFF',
      horizontalItemSelectedBg: 'transparent',
      // leftbar menu items
      itemSelectedColor: '#FFFFFF',
      itemSelectedBg: 'transparent',
      itemActiveBg: 'transparent',
      // topbar and leftbar menu items
      itemHoverColor: '#FFFFFF',
      itemHoverBg: 'transparent',
      itemColor: '#B3B3B3',
      itemBg: 'transparent',
      iconMarginInlineEnd: 8,
      iconSize: 16,
    },
    Button: {
      paddingInlineSM: 11,
      colorTextLightSolid: 'black',
      primaryColor: '#1DB954',
      fontWeight: 500,
    },
  },
}
