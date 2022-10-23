import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
	
	const newPasswordInputRef = useRef();
	const authCtx = useContext(AuthContext);

	const navigate = useNavigate();

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredNewPassword = newPasswordInputRef.current.value;

		// add validation
		fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
			{
				method: 'POST',
				body: JSON.stringify({
					idToken: authCtx.token,
					password: enteredNewPassword,
					returnSecureToken: false,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => {
			
				if (res.ok) {
					
					navigate('/');
				} else {
					throw new Error(
						`Server returned with${res.status}: Something went wrong!`
					);
				}
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					minLength="7"
					ref={newPasswordInputRef}
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;

/**
 * this feature allows user to send a request to the firebase to change the passoword.
 * @useRef - We get the user input via ref here.
 * @authCtx - to get the user IdToken for firebase verification.
 * enteredpass is the new password.
 * @body - This 'POST' object structure is the way firebase set their strucutre to set new password.You can always see these Docs on firebase auth rest API.

 */
