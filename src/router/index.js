import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';
import { useState } from 'react'
import styles from './AppRouter.module.scss';
import { getUser } from '../utilities/users-service';
import { getToken } from '../utilities/users-service';
import AuthPage from '../pages/AuthPage/AuthPage';

const AppRouter = () => {
	const [user, setUser] = useState(getUser())
	return (
		<Router>
			<main className={styles.App}>
			{
				user ?
			<>
			<Routes>
				{routes.map(({ Component, key, path }) => (
					<Route
						key={key}
						path={path}
						element={
						<Component 
							page={key} 
							user={user}
							setUser={setUser}
						/>
						}
					></Route>
				))}
				<Route path='/*' element={<Navigate to="/home"/>}/>
			</Routes>
			</>
			:
				<AuthPage setUser={setUser}/>
	
		
		}
		</main>
		</Router>
	);
};

export default AppRouter;
