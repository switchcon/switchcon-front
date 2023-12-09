import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-items: center;
	flex-direction: column;
`;

export const Inputs = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	margin-right: 10px;
`;

export const Form = styled.div`
	display: flex;
	height: 100%;
`;

export const Title = styled.div`
	font-size: 30px;
	font-weight: 700;
	margin-bottom: 30px;
`;

export const Input = styled.input`
<<<<<<< HEAD
	font-size: 16px;
	height: 30px;
	width: 250px;
	border-radius: 5px;
=======
	font-size: 20px;
	height: 30px;
	border-radius: 10px;
>>>>>>> 270a995c9dd5c94f4b5dadd857171979fb317b6f
	border: none;
	padding: 10px;
	&::placeholder {
		color: darkgray;
<<<<<<< HEAD
		font-size: 16px;
=======
		font-size: 20px;
>>>>>>> 270a995c9dd5c94f4b5dadd857171979fb317b6f
		font-weight: 500;
		font-family: 'OTWelcomRA';
	}
`;
