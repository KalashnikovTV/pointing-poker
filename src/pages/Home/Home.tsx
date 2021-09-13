import { useDispatch } from 'react-redux';
import { Avatar, Button, Form, Input, Modal, Switch } from 'antd';
import { useHistory } from 'react-router';
import axios from 'axios';
import socket from '../../utils/soketIO';
import useTypedSelector from '../../hooks/useTypedSelector';
import imagePokerPlanning from '../../assets/images/poker-planning.png';
import style from './Home.module.scss';
import { chageModalActive } from '../../store/homeReducer';
import ModalRegistation from '../../components/ModalRegistration/ModalRegistation';
import { changeDealer, changeLink } from '../../store/lobbyReducer';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { isDealer } = useTypedSelector((state) => state.lobby);
  // const { link } = useTypedSelector((state) => state.lobby);

  const { roomId } = useTypedSelector((state) => state.roomData);

  const hadlerStartNewGame = () => dispatch(chageModalActive(true));

  const handlerChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeLink(e.target.value));
    if (roomId.length) {
      dispatch(changeDealer(false));
    } else {
      dispatch(changeDealer(true));
    }
  };

  return (
    <>
      <div className={style.wrapper}>
        <img className={style.image} src={imagePokerPlanning} alt="poker-planning" />
        <div className={style.row}>
          <h1 className={style.title}>Start your planning:</h1>
          <div className={style.box}>
            {isDealer ? (
              <p className={style.session}>Create a session: </p>
            ) : (
              <p className={style.session}>Connect to session: </p>
            )}
            <Button type="primary" size="large" onClick={hadlerStartNewGame}>
              {isDealer ? 'Start new game' : 'Connect to lobby'}
            </Button>
          </div>
        </div>

        <div className={style.row}>
          <div className={`${style.box} ${style.box_lobby}`}>
            <p className={style.session}>
              Connect to lobby by <span>ID:</span>
            </p>
            <Input size="large" type="text" placeholder="ID" value={roomId} onInput={handlerChangeLink} />
            <p>
              введите id чтобы присоединится к лобби, если хотите создать комнату поле с id должно быть пустым
              (маленький текст)
            </p>
          </div>
        </div>
      </div>
      <ModalRegistation />
    </>
  );
};

export default Home;
