import { Component } from 'react-subx'
import { Button, List, Switch, Tag, Icon, Spin } from 'antd'
import logo from '../images/rc128.png'
import _ from 'lodash'

const { server } = window.rc
export default class App extends Component {
  componentDidMount () {
    window.particleBg && window.particleBg('#bg', {
      color: '#eee'
    })
    this.fetchUserInfo()
  }

  fetchUserInfo = () => {
    this.props.store.getUser()
  }

  renderFooter () {
    return (
      <div className='mg3t pd1y'>
        Powered by
        <a href='https://github.com/ringcentral/ringcentral-personal-chatbot-js' target='_blank' className='mg1x'>ringcentral-personal-chatbot</a>
        and
        <a href='https://github.com/tylerlong/subx' target='_blank' className='mg1x'>Subx</a>
      </div>
    )
  }

  renderSkills (skills = this.props.store.botInfo.skills) {
    if (!skills.length) {
      return null
    }
    return (
      <div className='pd2y'>
        <List
          dataSource={skills}
          bordered
          header={<div>Loaded Skills</div>}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  <span>
                    {
                      item.homepage
                        ? <a href={item.homepage} title='Skill homepage' target='_blank'><Icon type='home' /></a>
                        : null
                    }
                    <b className='mg1l'>{item.name}</b>
                  </span>

                }
                description={
                  <div>
                    {item.description}
                    {
                      item.settingPath
                        ? (
                          <a target='_blank' className='mg1l' href={server + item.settingPath}>
                            <Button type='ghost' icon='setting'>Skill setting</Button>
                          </a>
                        )
                        : null
                    }
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    )
  }

  renderTitle () {
    let { botInfo } = this.props.store
    return (
      <div>
        <div className='pd2b'>
          <h1>
            {botInfo.name}
            <sup className='mg1l'><Tag color='red'>Beta</Tag></sup>
          </h1>
          <p className='pd1b'>{botInfo.description}</p>
        </div>
        <ul>
          <li>
            Built-in commands:
            <b className='mg1l'>__help__(show bot info)</b>
          </li>
          <li>
            You can talk to self by post message starts with
            <b className='mg1l'>#me </b>
          </li>
          <li>
            You can pause the bot in current chatgroup for <b>10</b> minutes by sending message
            <b className='mg1l'>pause 10m</b> or <b className='mg1l'>pause</b>(5 minutes)
          </li>
          <li>
            * If bot stop working, you can try fix it by <b>turn off</b> and <b>turn it on</b> again
          </li>
        </ul>
      </div>
    )
  }

  renderSwitch () {
    let { enabled } = this.props.store.user
    let { swithing, updateEnable } = this.props.store
    let turnOnUrl = window.rc.authUrlDefault.replace(window.rc.defaultState, 'user')
    if (enabled) {
      return (
        <Button
          type='danger'
          icon='disconnect'
          loading={swithing}
          onClick={() => updateEnable(false)}
        >Turn off Bot</Button>
      )
    } else {
      return (
        <a href={turnOnUrl}>
          <Button
            type='primary'
            icon='check'
            loading={swithing}
          >Turn on Bot</Button>
        </a>
      )
    }
  }

  renderLogined () {
    let { loading, user = {}, updateSigned, updateReplyWithoutMentionInTeam } = this.props.store
    let txt = 'Enabled bot message signature'
    let { enabled } = user
    let txt1 = enabled
      ? 'Bot is working now, you can close this page, bot will still work. You can stop the bot by come back and '
      : 'Bot is offline now, you can '
    let txt2 = 'Reply without mention in team'
    return (
      <div className='outer'>
        <div className='header alignright mg3b pd2x pd1y'>
          <a href={`${server}/logout`} className='iblock'>
            <Icon type='logout' /> logout
          </a>
        </div>
        <div className='wrap'>
          {this.renderTitle()}
          <p className='pd1y'>{txt1} {this.renderSwitch()}.</p>
          <div className='pd1b'>
            <Switch
              loading={loading}
              checked={user.signed}
              onChange={updateSigned}
              checkedChildren={txt}
              unCheckedChildren={txt}
            />
            <span className='mg1l'>When enabled, every message sent by bot has a "[sent by bot]" signature.</span>
          </div>
          <div className='pd1b'>
            <Switch
              loading={loading}
              checked={!!_.get(user, 'data.replyWithoutMentionInTeam')}
              onChange={updateReplyWithoutMentionInTeam}
              checkedChildren={txt2}
              unCheckedChildren={txt2}
            />
            <span className='mg1l'>When enabled, bot will trigger without mention in team chat.</span>
          </div>
          {this.renderSkills()}
          {this.renderFooter()}
        </div>
      </div>
    )
  }

  renderNotLogined () {
    let { fetchingUser } = this.props.store
    return (
      <div className='aligncenter wrap'>
        {this.renderTitle()}
        <Spin spinning={fetchingUser}>
          <div className='pd1b pd1t'>
            <a href={window.rc.authUrlDefault}>
              <Button icon='login' type='primary' size='large'>
                Login
              </Button>
            </a>
          </div>
        </Spin>
        <p className='pd1b'>After login, bot system will hook into your account, reply some message for you 😏.</p>
        {this.renderSkills()}
        {this.renderFooter()}
      </div>
    )
  }

  render () {
    let { logined } = this.props.store
    return logined
      ? this.renderLogined()
      : this.renderNotLogined()
  }
}
