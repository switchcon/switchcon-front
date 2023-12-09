/* eslint-disable */ //warning 무시
import { useEffect, useState } from 'react';
import { Input, Form, Wrapper } from '@components/ui/Common';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import { getUserInfo, loginApi } from '@api/UserAPI';

import { Button } from '@components/ui/button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo } from '@lib/state';

const CustomLink = styled(Link)`
	margin-top: 20px;
	color: black;
	text-decoration: none;
	&:visited {
		color: black;
		text-decoration: none;
	}
	&:hover {
		text-decoration: underline;
	}
`;

const Login = () => {
	const [accountId, setId] = useState('');
	const [password, setPW] = useState('');
	const setUserInfo = useSetRecoilState(userInfo); //유저 Id 정보 전역관리를 위함

	const router = useNavigate();

	const onChangeID = (e) => {
		setId(e.target.value);
	};
	const onChangePW = (e) => {
		setPW(e.target.value);
	};

	const onClick = async () => {
		const result = await loginApi(accountId, password);
		const userInformation = await getUserInfo();
		// 유저 정보 전역변수 업데이트
		setUserInfo(userInformation);
		router('/home');
	};

	return (
		<Wrapper>
			<h1 className='mt-20 mb-16 text-lg font-bold'>스위치콘 로그인</h1>
			<Form className='flex flex-col gap-4'>
				<div className='flex flex-col gap-2'>
					<Input placeholder='아이디' value={accountId} onChange={onChangeID} />
					<Input placeholder='비밀번호' type='password' value={password} onChange={onChangePW} />
				</div>
				<Button className='rounded-lg' onClick={onClick}>
					로그인
				</Button>
			</Form>
			<CustomLink to='/signup'>회원가입하기</CustomLink>
		</Wrapper>
	);
};

export default Login;
