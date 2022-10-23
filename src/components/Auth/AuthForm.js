import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
	
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const authCtx = useContext(AuthContext);
	//to redirect user
	const navigate = useNavigate();

	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// optional: Add validation

		setIsLoading(true);

		let url;

	
		
		if (isLogin) {
			url =
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
		} else {
			url =
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
		}

		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: enteredEmail,
				password: enteredPassword,
				returnSecureToken: true,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				setIsLoading(false);

				if (res.ok) {
					return res.json();
				} else {
					return res.json().then((data) => {
						console.log(data.error.code, data.error.message);
						
						let errorMessage = `${data.error.code} : ooops! ${data.error.message}`;
					

						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
				console.log(data);
				//convert the expiresIn from firebase
				const expirationTime = new Date(
					new Date().getTime() + +data.expiresIn * 1000
				);
				//get the login and expiration Time
				authCtx.login(data.idToken, expirationTime.toISOString());
				//redirect user
				navigate('/');
			})
			.catch((err) => {
				
				alert(err.message);
			});

		
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					{!isLoading && (
						<button className={classes.actionsBtn}>{isLogin ? 'Login' : 'Create Account'}</button>
					)}
					{isLoading && <p>Sending request...</p>}
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;

/**

 * @expirationTime -
 * ** 1. we  convert the time to millisecond inside date object
 * ** 2. Firebase 'expiresIn' returns an string with seconds. so we convert it to number with a '+' and multiply with 1000 to turn it into Milliseconds.
 * we return the value with ISOstring() which converts into date string with ISO format.
 */
