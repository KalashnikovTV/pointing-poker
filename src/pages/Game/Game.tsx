import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import IssueList from '../../components/IssueList/IssueList';
import Title from '../../components/Title/Title';
import Timer from '../../components/Timer/Timer';
import UserCard from '../../components/UserCard/UserCard';
import BtnsControl from '../../components/BtnsControl/BtnsControl';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './Game.module.scss';
import { changeGameStatus } from '../../store/roomDataReducer';

const Game: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeGameStatus(true));
  }, []);

  const { users, admin } = useTypedSelector((state) => state.roomData);
  const { issueList } = useTypedSelector((state) => state.issues);
  const { showTimer } = useTypedSelector((state) => state.settings.settings);

  return (
    <div className={style.gamePage}>
      <div className={style.scramControl}>
        <Title editAvailable={false} />
        <p className={style.scramMaster}>Scram master:</p>
        <div className={style.fieldControl}>
          <div className={style.card}>
            {users.length ? (
              <UserCard
                jobStatus={admin.position}
                name={admin.name}
                lastName={admin.lastName}
                avatar={admin.avatarUrl}
                id={admin.id}
                role={admin.role}
              />
            ) : null}
          </div>
          <div className={style.btns}>
            <BtnsControl />
          </div>
        </div>
        <div className={style.field}>
          <IssueList view="vertical" />
          <div className={style.timer}>{showTimer ? <Timer /> : null}</div>
        </div>
      </div>
      <div className={style.userControl}>
        <div className={style.score}>
          <p className={style.title}>Score:</p>
          {issueList.map((item, index) => {
            return <div key={item.grades[users[index].name]}>{item.grades[users[index].name]}</div>;
          })}
        </div>
        <div className={style.players}>
          <p className={style.title}>Players:</p>
          {users.length &&
            users.map((item, index) =>
              index !== 0 ? (
                <UserCard
                  key={uuidv4()}
                  jobStatus={item.position}
                  name={item.name}
                  lastName={item.lastName}
                  avatar={item.avatarUrl}
                  id={item.id}
                  role={item.role}
                />
              ) : null,
            )}
        </div>
      </div>
    </div>
  );
};

export default Game;
