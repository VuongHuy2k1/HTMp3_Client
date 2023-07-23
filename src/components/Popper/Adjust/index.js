import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'
import { connect } from 'react-redux'
import {
  changePlaylist,
  setFocus,
  getPlayListId,
  selectedMess,
  selectedLoad,
} from '../../../actions'
import Wrapper from '../Wrapper'
import styles from './Adjust.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faEllipsis,
  faGear,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { title } from 'faker/lib/locales/az'

const cx = classNames.bind(styles)

function Adjust({}) {
  const [showList, setShowList] = useState(false)
  const [num, setNum] = useState(1)
  const [theme, setTheme] = useState('Sáng')
  const listTopic = [
    {
      id: 1,
      img:
        '	https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/light.jpg',
      title: 'Sáng',
      theme: 'Light',
    },
    {
      id: 2,

      img:
        'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dark.jpg',
      title: 'Tối',
      theme: 'Dark',
    },
  ]

  const selectTopic = (num, theme) => {
    setNum(num)
    if (theme === 'Dark') {
      document.documentElement.style.setProperty('--theme-1', '#292929')
      document.documentElement.style.setProperty('--theme-2', '#1E1E1E')
      document.documentElement.style.setProperty('--theme-3', '#252525')
      document.documentElement.style.setProperty('--background-base', '#333333')
      document.documentElement.style.setProperty(
        '--background-header',
        'rgba(30,30,30,0.8)',
      )

      document.documentElement.style.setProperty(
        '--background-playbar',
        '#181818',
      )
      document.documentElement.style.setProperty('--background-icon', '#353535')

      document.documentElement.style.setProperty(
        '--color-line-1',
        ' hsla(0,0%,100%,0.1)',
      )
      document.documentElement.style.setProperty(
        '--color-line-2',
        ' hsla(0,0%,100%,0.1)',
      )

      document.documentElement.style.setProperty('--color-text', '#FFFFFF')
      document.documentElement.style.setProperty('--color-text-3', '#FFFFFF80')
      document.documentElement.style.setProperty('--color-text-5', '#FFFFFF')
      document.documentElement.style.setProperty('--color-text-6', '#FFFFFF')
      document.documentElement.style.setProperty('--color-text-side', '#A0A0A0')

      document.documentElement.style.setProperty('--color-hover-1', '#404040')
      document.documentElement.style.setProperty('--color-hover-2', '#404040')
    }
    if (theme === 'Light') {
      document.documentElement.style.setProperty('--theme-1', '#F2F2F2')
      document.documentElement.style.setProperty('--theme-2', '#FFFFFF')
      document.documentElement.style.setProperty('--theme-3', '#C6C6C6')

      document.documentElement.style.setProperty('--background-base', '#FFFFFF')
      document.documentElement.style.setProperty(
        '--background-header',
        'hsla(0,0%,100%,0.8)',
      )
      document.documentElement.style.setProperty(
        '--background-playbar',
        '#FFFFFF',
      )
      document.documentElement.style.setProperty('--background-icon', '#D4D4D4')

      document.documentElement.style.setProperty(
        '--color-line-1',
        'rgba(0,0,0,0.05)',
      )
      document.documentElement.style.setProperty(
        '--color-line-2',
        'rgba(0,0,0,0.1)',
      )

      document.documentElement.style.setProperty('--color-text', '#32323d')
      document.documentElement.style.setProperty('--color-text-3', '#00000099')
      document.documentElement.style.setProperty('--color-text-5', '#000000')
      document.documentElement.style.setProperty('--color-text-6', '#8D22C3')
      document.documentElement.style.setProperty('--color-text-side', '#32323d')

      document.documentElement.style.setProperty('--color-hover-1', '#E6E6E6')
      document.documentElement.style.setProperty('--color-hover-2', '#D4D4D4')
    }
  }

  const topic = listTopic.map((topic, index) => {
    if (num === topic.id) {
      return (
        <li
          className={cx('topic', 'active')}
          id={index}
          onClick={() => selectTopic(topic.id, topic.theme)}
        >
          <img src={topic.img} alt="" className={cx('img-topic')}></img>
          <FontAwesomeIcon icon={faCheckCircle} className={cx('icon-check')} />
          <p className={cx('title')}>{topic.title}</p>
        </li>
      )
    } else {
      return (
        <li
          className={cx('topic')}
          id={index}
          onClick={() => selectTopic(topic.id, topic.theme)}
        >
          <img src={topic.img} alt="" className={cx('img-topic')}></img>

          <p className={cx('title')}>{topic.title}</p>
        </li>
      )
    }
  })

  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <Wrapper className={cx('menu-popper')}>
        <div className={cx('content')}>
          <p>Chủ đề</p>
          <div className={cx('line')}></div>
        </div>

        <ul className={cx('warrper')}>{topic}</ul>
      </Wrapper>
    </div>
  )

  const oneClick = () => {
    if (showList === false) {
      return setShowList(true)
    } else {
      return setShowList(false)
    }
  }
  return (
    <Tippy
      interactive
      visible={showList}
      placement="bottom-end"
      render={renderResult}
    >
      <FontAwesomeIcon
        className={cx('icon-setting')}
        onClick={oneClick}
        icon={faGear}
      />
    </Tippy>
  )
}

const mapStateToProps = (state) => {
  return {
    userPlaylist: state.userPlaylist,
  }
}

export default connect(mapStateToProps, {
  changePlaylist,
  setFocus,
  getPlayListId,
  selectedMess,
  selectedLoad,
})(Adjust)
