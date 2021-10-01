import { v4 as uuidv4 } from 'uuid';
import useTypedSelector from '../../hooks/useTypedSelector';
import UserCard from '../UserCard/UserCard';
import style from './Members.module.scss';

const Members: React.FC = () => {
  const { users } = useTypedSelector((state) => state.roomData);

  const onlyTeamMembers = users.filter((_, index) => index !== 0);

  return (
    <div className={style.members}>
      {onlyTeamMembers.length ? (
        <>
          <p className={style.title}>Members:</p>
          <div className={style.users}>
            {onlyTeamMembers.map((item) => (
              <UserCard
                key={uuidv4()}
                jobStatus={item.position}
                name={item.name}
                lastName={item.lastName}
                avatar={item.avatarUrl}
                id={item.id}
                role={item.role}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Members;
