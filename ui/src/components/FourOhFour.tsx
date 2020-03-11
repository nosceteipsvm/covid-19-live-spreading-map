import React from 'react';
import { Link } from 'react-router-dom';

const FourOhFour: React.FC = () => {
	return (
		<>
			<div className="flex flex-col justify-center items-center p-6"
				 style={{
				 	minHeight: "80vh"
				 }}
			>
				<h1 className="text-4xl font-black text-gray-300 text-center">
					Page not found
				</h1>
				<Link to="/" className="text-xl font-light text-gray-500 text-center">
					← Go back home
				</Link>
			</div>
		</>
	)
};

export default FourOhFour;