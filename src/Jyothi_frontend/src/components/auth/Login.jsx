import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaUserGraduate, FaBuilding } from 'react-icons/fa';
import { auth } from '/home/meenamrutha/MCA/Jyothi/src/Jyothi_frontend/src/components/utils/auth.js';
import { toast } from 'react-toastify';

const LoginContainer = styled.div`
  min-height: calc(100vh - 80px);
  width: 100vw;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
  position: relative;
  overflow-x: hidden;
  padding: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  
  @media (min-width: 1024px) {
    padding: 40px;
  }
`;

const LoginForm = styled(motion.form)`
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 20px;
  
  @media (min-width: 768px) {
    padding: 50px;
  }

  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #1a1a1a;
    font-size: 2rem;
    font-weight: 600;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px 12px 40px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    border-color: #6366f1;
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 20px 12px 40px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  appearance: none;
  
  &:focus {
    border-color: #6366f1;
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 12px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #4f46e5;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #6366f1;
  z-index: 1;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user, error } = auth.login(email, password, userType);
    
    if (error) {
      toast.error(error);
      return;
    }

    if (userType === 'student') {
      navigate('/student-dashboard');
    } else {
      navigate('/org-dashboard');
    }
  };

  return (
    <LoginContainer>
      <LoginForm
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleLogin}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome Back
        </motion.h2>

        <FormGroup>
          <IconWrapper>
            {userType === 'student' ? <FaUserGraduate /> : <FaBuilding />}
          </IconWrapper>
          <Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="organization">Organization</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <IconWrapper>
            <FaUser />
          </IconWrapper>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <IconWrapper>
            <FaLock />
          </IconWrapper>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
        >
          Login
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;