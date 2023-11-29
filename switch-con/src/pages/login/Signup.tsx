/* eslint-disable */ //warning 무시
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Inputs, Title, Wrapper } from '@components/ui/Common';
import { styled } from 'styled-components';
import { signUp } from '../../apis/signUp';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
//home signup mypage

const Signup = () => {
	const [accountId, setId] = useState('');
	const [password, setPW] = useState('');
	const [checkPassword, setName] = useState('');
	const [nickname, setAge] = useState('');
	const router = useNavigate();

	const onChangeID = (e) => {
		setId(e.target.value);
	};
	const onChangePW = (e) => {
		setPW(e.target.value);
	};
	const onChangeName = (e) => {
		setName(e.target.value);
	};
	const onChangeAge = (e) => {
		setAge(e.target.value);
	};

	const onClick = async () => {
		await signUp(accountId, password, checkPassword, nickname);
		router('/login');
	};

	return (
		<Wrapper>
			<Title>회원가입</Title>
			<Inputs>
				<Input placeholder='아이디' value={accountId} onChange={onChangeID} />
				<Input placeholder='비밀번호' type='password' value={password} onChange={onChangePW} />
				<Input placeholder='비밀번호 확인' type='Password' value={checkPassword} onChange={onChangeName} />
				<Input placeholder='닉네임' value={nickname} onChange={onChangeAge} />
			</Inputs>
			<Button onClick={onClick}>Sign Up</Button>
		</Wrapper>
	);
};

export default Signup;
// const Button = styled.button`
// 	background-color: black;
// 	color: white;
// 	padding-left: px;
// 	paddiing-right: px;
// 	padding-top: 10px;
// 	padding-bottom: 10px;
// 	border-radius: 10px;
// 	margin-top: 20px;
// `;
