import React, { FC } from 'react';
import { Card, Avatar } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { IMember } from '../../types/types';
import style from './UserCard.module.scss';

interface IUserCardProps {
  jobStatus: string;
  isYou: boolean;
  children: React.ReactNode;
  members: IMember[];
  onKick?: (user: React.ReactNode) => void;
}

const UserCard: FC<IUserCardProps> = ({ jobStatus, isYou, children, members, onKick }) => {
  const words = children?.toString() as string;
  return (
    <Card className={style.userCard} bodyStyle={{ padding: 10 }}>
      <div className={style.wrapper}>
        <Avatar
          className={style.avatar}
          size={60}
          style={{
            fontSize: 36,
            textShadow: '0px 4px 4px #00000040',
            backgroundColor: '#60DABF',
          }}
        >
          {getFirstUpLetters(words)}
        </Avatar>
        <div className={style.user}>
          {isYou ? <p className={style.isYou}>IT&apos;S YOU</p> : null}
          <p className={style.name}>{children}</p>
          <p className={style.jobStatus}>{jobStatus}</p>
        </div>
        {members[0].name !== children ? (
          <div className={style.kick} onClick={() => onKick && onKick(children)}>
            {isYou ? null : <StopOutlined style={{ fontSize: 30 }} />}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default UserCard;
