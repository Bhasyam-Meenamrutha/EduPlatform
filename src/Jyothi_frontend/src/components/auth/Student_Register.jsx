import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaBuilding } from 'react-icons/fa';
import { auth } from '/home/srujan/MCA/EduPlatform/src/Jyothi_frontend/src/components/utils/auth.js';
import { toast } from 'react-toastify';
import { Principal } from '@dfinity/principal';
import { Jyothi_backend } from '../../../../declarations/Jyothi_backend';

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
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   Address: '',
  //   userType: 'student',
  //   organizationName: '',

  // });
  const navigate = useNavigate();
  const [name , setname] = useState("");
  const [email , setemail] = useState("");
  const [Address , setAddress] = useState("");
  const [Rollno , setRollno] = useState("");
  const [DOB , setDOB] = useState("");
  const [collegeNm , setcollegeNm] = useState("");

  const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e){
    e.preventDefault();
    // const { error } = auth.register(formData);
    // if (error) {
    //   toast.error(error);
    //   return;
    // }

    // toast.success('Registration successful! Please login.');
    // navigate('/login');
    if(name && Rollno && email && DOB && collegeNm && Address){
      var StdRegistration = {
        name: name,
        rollno:(Rollno),
        email:email,
        dob:DOB,
        collegeName:collegeNm,
        address:Address,
        prin:Principal.fromText(localStorage.getItem("principal")),
        role:BigInt(2),
      };
      console.log("before register" , StdRegistration);
      var result = await Jyothi_backend.set_std_registration(StdRegistration);
      console.log("result",result);
    }
    
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
          Student Registration
        </motion.h2>

        {/* <FormGroup>
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
        </FormGroup> */}

        {/* {formData.userType === 'student' ? ( */}
          <FormGroup>
            <IconWrapper>
              <FaUser />
            </IconWrapper>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              // value={formData.name}
              onChange={(e) =>setname(e.target.value)}
              required 
            />
          </FormGroup>
        {/* ) : ( */}
          {/* <FormGroup>
            <IconWrapper>
              <FaBuilding />
            </IconWrapper>
            <Input
              type="text"
              name="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
              required 
            />
          </FormGroup> */}
        {/* )} */}

        <FormGroup>
          <IconWrapper>
            <FaEnvelope />
          </IconWrapper>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            // value={formData.email}
            onChange={(e) =>setemail(e.target.value)}
            required 
          />
        </FormGroup>

        {/* <FormGroup>
          <IconWrapper>
            <FaLock />
          </IconWrapper>
          <Input
            type="text"
            name="Principal"
            placeholder="Principal"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup> */}

        
          <FormGroup>
            <IconWrapper>
              <FaUser />
            </IconWrapper>
            <Input
              type="text"
              name="address"
              placeholder="Address"
              // value={formData.address}
              onChange={(e) =>setAddress(e.target.value)}
              required 
            />
          </FormGroup>
       
          {/* <FormGroup>
            <IconWrapper>
              <FaBuilding />
            </IconWrapper>
            <Input
              type="text"
              name="OrganizationLocation"
              placeholder="Organization Location"
              value={formData.organizationLoc}
              onChange={handleChange}
              required 
            />
          </FormGroup> */}
       
      
          <FormGroup>
            <IconWrapper>
              <FaUser />
            </IconWrapper>
            <Input
              type="Text"
              name="rollno"
              placeholder="Roll No"
              // value={formData.rollno}
              onChange={(e) =>setRollno(e.target.value)}
              required 
            />
          </FormGroup>
       
          {/* <FormGroup>
            <IconWrapper>
              <FaBuilding />
            </IconWrapper>
            <Input
              type="number"
              name="phno"
              placeholder="Phone Number"
              value={formData.phno}
              onChange={handleChange}
              required 
            />
          </FormGroup> */}
     

          <FormGroup>
            <IconWrapper>
              <FaUser />
            </IconWrapper>
            <Input
              type="text"
              name="DOB"
              placeholder="Date Of Birth"
              // value={formData.dob}
              onChange={(e) =>setDOB(e.target.value)}
              required 
            />
          </FormGroup>
       
          {/* <FormGroup>
            <IconWrapper>
              <FaBuilding />
            </IconWrapper>
            <Input
              type="text"
              name="about"
              placeholder="About Organization"
              value={formData.about}
              onChange={handleChange}
              required 
            />
          </FormGroup> */}
           <FormGroup>
          <IconWrapper>
            <FaEnvelope />
          </IconWrapper>
          <Input
            type="collegeNm"
            name="college_nm"
            placeholder="College Name"
            onChange={(e) =>setcollegeNm(e.target.value)}
            required 
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