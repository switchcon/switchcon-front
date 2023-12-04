/* eslint-disable */ //warning 무시
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Inputs, Form, Title, Wrapper } from '@components/ui/Common';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../../apis/loginApi';

import { Button } from '@components/ui/button';

//home signup mypage

// const Button = styled.button`
// 	backgroud-color: black;
// 	color: black;
// 	padding: 20px;
// 	border-radius: 10px;
// `;

const CustomLink = styled(Link)`
	margin-top: 20px;
	color: black;
	text-decoration: none;
	&:visited {
		color: black;
		text-decoration: none;
	}
`;

const Login = () => {
	const [accountId, setId] = useState('');
	const [password, setPW] = useState('');
	const router = useNavigate();

	const onChangeID = (e) => {
		setId(e.target.value);
	};
	const onChangePW = (e) => {
		setPW(e.target.value);
	};

	const onClick = async () => {
		const result = await loginApi(accountId, password);
		console.log(result);
		// const { accessToken, refreshToken } = result;
		// localStorage.setItem('access', accessToken);
		// localStorage.setItem('refresh', refreshToken);
		// console.log(localStorage.getItem('access'));
		// console.log(localStorage.getItem('refresh'));
		// localStorage.setItem('access', result);
		// localStorage.setItem('refresh', result);
		// console.log(localStorage.getItem('access'));
		// console.log(localStorage.getItem('refresh'));

		router('/');
	};

	return (
		<Wrapper>
			<Title>로그인</Title>
			<Form>
				<Inputs>
					<Input placeholder='아이디' value={accountId} onChange={onChangeID} />
					<Input placeholder='비밀번호' type='password' value={password} onChange={onChangePW} />
				</Inputs>
				<Button onClick={onClick}>Login</Button>
			</Form>
			<CustomLink to='/signup'>회원가입하기</CustomLink>
		</Wrapper>
	);
};

export default Login;
