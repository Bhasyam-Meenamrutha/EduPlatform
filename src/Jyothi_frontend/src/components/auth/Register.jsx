import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaBuilding } from 'react-icons/fa';
import { auth } from '/home/meenamrutha/MCA/Jyothi/src/Jyothi_frontend/src/components/utils/auth.js';
import { toast } from 'react-toastify';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') center/cover fixed no-repeat;
  padding: 100px 20px 40px;
  position: relative;

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
`;

const RegisterForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 2;

  h2 {
    color: #1a1a1a;
    text-align: center;
    margin-bottom: 30px;
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
  color: #1a1a1a;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    border-color: #6366f1;
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 20px 12px 40px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  color: #1a1a1a;
  background: white;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #6366f1;
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'student',
    organizationName: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = auth.register(formData);
    
    if (error) {
      toast.error(error);
      return;
    }

    toast.success('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <RegisterContainer>
      <RegisterForm
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Create Account
        </motion.h2>

        <FormGroup>
          <IconWrapper>
            {formData.userType === 'student' ? <FaUser /> : <FaBuilding />}
          </IconWrapper>
          <Select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="organization">Organization</option>
          </Select>
        </FormGroup>

        {formData.userType === 'student' ? (
          <FormGroup>
            <IconWrapper>
              <FaUser />
            </IconWrapper>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
        ) : (
          <FormGroup>
            <IconWrapper>
              <FaBuilding />
            </IconWrapper>
            <Input
              type="text"
              name="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
            />
          </FormGroup>
        )}

        <FormGroup>
          <IconWrapper>
            <FaEnvelope />
          </IconWrapper>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <IconWrapper>
            <FaLock />
          </IconWrapper>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>

        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
        >
          Register
        </Button>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;