import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {

  const authCtx =  useContext(AuthContext);
  console.log(authCtx.isLoggedIn);
	return (
		<section className={classes.starting}>
			{authCtx.isLoggedIn ? <h1>Welcome Aboard sir! 🫡</h1>: <h2> 🛂 Login Comrade 👮🏻‍♂️</h2>}
      
		</section>
	);
};

export default StartingPageContent;
