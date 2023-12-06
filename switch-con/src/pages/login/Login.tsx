/* eslint-disable */ //warning 무시
import { useState } from 'react';
import { Input, Form, Wrapper } from '@components/ui/Common';
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
	&:hover {
		text-decoration: underline;
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
