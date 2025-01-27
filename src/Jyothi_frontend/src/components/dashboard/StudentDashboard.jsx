import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaUpload, FaCertificate, FaUserGraduate, FaDownload, FaEye } from 'react-icons/fa';
import { auth } from '/home/srujan/MCA/EduPlatform/src/Jyothi_frontend/src/components/utils/auth.js';
import { storage } from '/home/srujan/MCA/EduPlatform/src/Jyothi_frontend/src/components/utils/storage.js';
import { toast } from 'react-toastify';

const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
  background: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') center/cover fixed no-repeat;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    z-index: 1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 1024px) {
    padding: 40px;
  }
`;

const Header = styled(motion.div)`
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;

    @media (min-width: 1024px) {
      font-size: 2.5rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const UploadButton = styled(motion.button)`
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #4f46e5;
    transform: translateY(-2px);
  }

  @media (min-width: 1024px) {
    font-size: 1.1rem;
    padding: 15px 30px;
  }
`;

const CertificateList = styled.div`
  display: grid;
  gap: 15px;
`;

const CertificateItem = styled(motion.div)`
  background: #f8fafc;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: #f1f5f9;
    transform: translateX(5px);
  }

  .info {
    flex: 1;
    h4 {
      margin: 0 0 5px 0;
      color: #1a1a1a;
    }
    small {
      color: #64748b;
    }
  }

  .actions {
    display: flex;
    gap: 10px;
  }
`;

const IconButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: #6366f1;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  &:hover {
    color: #4f46e5;
  }
`;

const StudentDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const user = auth.getCurrentUser();

  useEffect(() => {
    if (user) {
      setCertificates(storage.getCertificates(user.id));
    }
  }, [user]);

  const handleCertificateUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const certificate = await storage.uploadCertificate(user.id, file);
      setCertificates(prev => [...prev, certificate]);
      toast.success('Certificate uploaded successfully!');
    } catch (error) {
      toast.error('Error uploading certificate');
    }
  };

  if (!user) {
    return <div>Please login to access the dashboard</div>;
  }

  return (
    <DashboardContainer>
      <Content>
        <Header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1><FaUserGraduate /> Welcome, {user.name}!</h1>
            <p>Manage your educational achievements</p>
          </div>
          <div>
            <label htmlFor="certificate-upload">
              <UploadButton
                as="span"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUpload /> Upload Certificate
              </UploadButton>
            </label>
            <input
              id="certificate-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
              onChange={handleCertificateUpload}
            />
          </div>
        </Header>

        <Grid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>
              <FaCertificate /> Your Certificates
            </h3>
            <CertificateList>
              {certificates.map((cert, index) => (
                <CertificateItem
                  key={cert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="info">
                    <h4>{cert.name}</h4>
                    <small>{new Date(cert.uploadDate).toLocaleDateString()}</small>
                  </div>
                  <div className="actions">
                    <IconButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEye />
                    </IconButton>
                    <IconButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaDownload />
                    </IconButton>
                  </div>
                </CertificateItem>
              ))}
            </CertificateList>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>
              <FaUserGraduate /> Profile Overview
            </h3>
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </Card>
        </Grid>
      </Content>
    </DashboardContainer>
  );
};

export default StudentDashboard;