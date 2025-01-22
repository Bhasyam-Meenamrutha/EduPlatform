import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBuilding, FaShieldAlt, FaCertificate } from 'react-icons/fa';

const HomeContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
  background: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  color: white;
  
  @media (min-width: 1024px) {
    padding: 60px 40px;
  }
`;

const Hero = styled.div`
  text-align: center;
  padding: 80px 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    
    @media (min-width: 768px) {
      font-size: 3.5rem;
    }

    @media (min-width: 1440px) {
      font-size: 4rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto 40px;
    
    @media (min-width: 768px) {
      font-size: 1.4rem;
    }

    @media (min-width: 1440px) {
      font-size: 1.6rem;
      max-width: 1000px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  background: ${props => props.$primary ? '#6366f1' : 'transparent'};
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: 2px solid ${props => props.$primary ? '#6366f1' : 'white'};
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.$primary ? '#4f46e5' : 'rgba(255, 255, 255, 0.1)'};
  }

  @media (min-width: 1440px) {
    font-size: 1.2rem;
    padding: 15px 30px;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 80px;
  padding: 0 20px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;

    @media (min-width: 1440px) {
      font-size: 1.8rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;

    @media (min-width: 1440px) {
      font-size: 1.2rem;
    }
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Content>
        <Hero>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Secure Educational Credentials Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Store, manage, and verify educational certificates securely. Connect students with organizations seamlessly.
          </motion.p>
          <ButtonGroup>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <StyledLink to="/register" $primary>
                Get Started
              </StyledLink>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <StyledLink to="/login">
                Sign In
              </StyledLink>
            </motion.div>
          </ButtonGroup>
        </Hero>

        <Features>
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3><FaGraduationCap /> For Students</h3>
            <p>Securely store and manage your educational certificates. Share them with potential employers easily.</p>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3><FaBuilding /> For Organizations</h3>
            <p>Verify student credentials instantly. Access a comprehensive database of verified certificates.</p>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h3><FaShieldAlt /> Secure Storage</h3>
            <p>Your data is protected with industry-standard security measures. Full control over your information.</p>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h3><FaCertificate /> Easy Verification</h3>
            <p>Quick and reliable certificate verification process. Reduce fraudulent credentials.</p>
          </FeatureCard>
        </Features>
      </Content>
    </HomeContainer>
  );
};

export default Home;