/* eslint-disable */ //warning 무시
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Inputs, Title, Wrapper } from '@components/ui/Common';
import { styled } from 'styled-components';
import { signUp } from '../../apis/signUp';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { signUp } from '@api/UserAPI';
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
			<h1 className='mt-20 mb-16 text-lg font-bold'>스위치콘 회원가입</h1>
			<Inputs>
				<Input placeholder='아이디' value={accountId} onChange={onChangeID} />
				<Input placeholder='비밀번호' type='password' value={password} onChange={onChangePW} />
				<Input placeholder='비밀번호 확인' type='Password' value={checkPassword} onChange={onChangeName} />
				<Input placeholder='닉네임' value={nickname} onChange={onChangeAge} />
			</Inputs>
			<Button className='w-3/5 mt-8 rounded-lg ' onClick={onClick}>
				회원 등록
			</Button>
		</Wrapper>
	);
};

export default Signup;
