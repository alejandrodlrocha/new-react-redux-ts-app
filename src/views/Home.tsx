import Logo from '../assets/img/new-react-redux-ts-app.png';
import styles from '../App.module.scss';
import { increment } from '../store/slices/counter/actions';
import { fetchUser } from '../store/slices/users/actions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCounterValue, selectUserData, selectUserLoading } from '../store/selectors'


const Home = () => {
  const dispatch = useAppDispatch();
  const countValue = useAppSelector(selectCounterValue);
  const userData = useAppSelector(selectUserData)
  const isLoadingUser = useAppSelector(selectUserLoading)

  const getUserData = () => {
    const newId = Math.floor(Math.random() * 10) + 1;
    dispatch(increment());
    dispatch(fetchUser(newId));
  };

  return (
    <div className={styles.centeredContent}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={Logo} className="animate-pulse mt-[50px] items-center" style={{ width: '900px' }} />
      </div>
      <p>
        <small className="text-2xl">If the image is pulsing, tailwind is installed and configured correctly</small>
      </p>
      <button
        className="cursor-pointer mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={getUserData}
      >
        Test users sample API Call and redux counter: {countValue}
      </button>

      {isLoadingUser ? <p className="mt-4">Loading...</p> : null}


      {userData.id !== 0 ? (
        <div className="mt-4 space-y-2">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Website:</strong> {userData.website}</p>

          <div>
            <strong>Address:</strong>
            <ul className="list-disc ml-5">
              <li>Street: {userData.address.street}</li>
              <li>Suite: {userData.address.suite}</li>
              <li>City: {userData.address.city}</li>
              <li>Zipcode: {userData.address.zipcode}</li>
              <li>Geo: lat {userData.address.geo.lat}, lng {userData.address.geo.lng}</li>
            </ul>
          </div>

          <div>
            <strong>Company:</strong>
            <ul className="list-disc ml-5">
              <li>Name: {userData.company.name}</li>
              <li>Catch Phrase: {userData.company.catchPhrase}</li>
              <li>BS: {userData.company.bs}</li>
            </ul>
          </div>
        </div>

      ) : null}
    </div>
  );
}

export default Home;
