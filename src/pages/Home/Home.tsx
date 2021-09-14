import { useDispatch } from 'react-redux';
import { Button, Input } from 'antd';
import useTypedSelector from '../../hooks/useTypedSelector';
import imagePokerPlanning from '../../assets/images/poker-planning.png';
import style from './Home.module.scss';
import { chageModalActive } from '../../store/homeReducer';
import ModalRegistation from '../../components/ModalRegistration/ModalRegistation';
import { changeDealer } from '../../store/lobbyReducer';
import { setRoomId } from '../../store/roomDataReducer';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const { isDealer } = useTypedSelector((state) => state.lobby);
  const { roomId } = useTypedSelector((state) => state.roomData);

  const handlerStartNewGame = () => {
    dispatch(changeDealer(true));
    dispatch(chageModalActive(true));
  };

  const handlerChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRoomId(e.target.value));
  };

  const handlerConnectToGame = () => {
    dispatch(changeDealer(false));
    dispatch(chageModalActive(true));
  };

  return (
    <>
      <div className={style.wrapper}>
        <img className={style.image} src={imagePokerPlanning} alt="poker-planning" />
        <div className={style.row}>
          <h1 className={style.title}>Start your planning:</h1>
          <div className={style.box}>
            <p className={style.session}>Create a session: </p>
            <Button type="primary" size="large" onClick={handlerStartNewGame}>
              Start new game
            </Button>
          </div>
        </div>

        <div className={style.row}>
          <div className={`${style.box} ${style.box_lobby}`}>
            <p className={style.session}>
              Connect to lobby by <span>ID:</span>
            </p>
            <div className={style.connect}>
              <Input size="large" type="text" placeholder="ID" value={roomId} onChange={handlerChangeLink} />
              <Button type="primary" size="large" onClick={handlerConnectToGame}>
                Connect
              </Button>
            </div>
            <p>
              введите id чтобы присоединится к лобби, если хотите создать комнату поле с id должно быть пустым
              (маленький текст и на англ!)
            </p>
          </div>
        </div>
      </div>
      <ModalRegistation />
    </>
  );
};

export default Home;
