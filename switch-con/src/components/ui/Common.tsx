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
	font-size: 16px;
	height: 30px;
	width: 250px;
	border-radius: 5px;
	border: none;
	padding: 10px;
	&::placeholder {
		color: darkgray;
		font-size: 16px;
		font-weight: 500;
		font-family: 'OTWelcomRA';
	}
`;
