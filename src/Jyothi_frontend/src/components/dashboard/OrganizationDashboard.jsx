import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaBuilding, FaSearch, FaCertificate, FaUserGraduate, FaEye } from 'react-icons/fa';
import { auth } from '/home/meenamrutha/MCA/Jyothi/src/Jyothi_frontend/src/components/utils/auth.js';
import { storage } from '/home/meenamrutha/MCA/Jyothi/src/Jyothi_frontend/src/components/utils/storage.js';

const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
  background: url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') center/cover fixed no-repeat;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2rem;
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;

    @media (min-width: 1024px) {
      font-size: 2.5rem;
    }
  }

  p {
    margin: 0;
    opacity: 0.9;
  }
`;

const SearchBar = styled(motion.div)`
  margin: 20px 0;
  display: flex;
  gap: 10px;
  position: relative;

  input {
    flex: 1;
    padding: 12px 20px 12px 40px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
      border-color: #6366f1;
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
  }

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #6366f1;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
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

const StudentList = styled.div`
  display: grid;
  gap: 15px;
`;

const StudentCard = styled(motion.div)`
  background: #f8fafc;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f1f5f9;
    transform: translateX(5px);
  }

  .info {
    h4 {
      margin: 0 0 5px 0;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    small {
      color: #64748b;
    }
  }

  .certificate-count {
    background: #6366f1;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
  }
`;

const CertificateDetails = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-top: 15px;

  h4 {
    color: #1a1a1a;
    margin: 0 0 15px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }
  }

  .view-button {
    color: #6366f1;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      background: #f1f5f9;
    }
  }
`;

const OrganizationDashboard = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const user = auth.getCurrentUser();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const studentUsers = users.filter(u => u.userType === 'student');
    const studentsWithCerts = studentUsers.map(student => ({
      ...student,
      certificates: storage.getCertificates(student.id)
    }));
    setStudents(studentsWithCerts);
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1><FaBuilding /> Welcome, {user.organizationName}!</h1>
          <p>View and verify student certificates</p>
        </Header>

        <SearchBar
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaSearch />
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <Grid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>
              <FaUserGraduate /> Students
            </h3>
            <StudentList>
              {filteredStudents.map((student, index) => (
                <StudentCard
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="info">
                    <h4><FaUserGraduate /> {student.name}</h4>
                    <small>{student.email}</small>
                  </div>
                  <span className="certificate-count">
                    {student.certificates.length} certificates
                  </span>
                </StudentCard>
              ))}
            </StudentList>
          </Card>

          {selectedStudent && (
            <Card
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>
                <FaCertificate /> Certificates
              </h3>
              <CertificateDetails>
                <h4><FaUserGraduate /> {selectedStudent.name}'s Certificates</h4>
                <ul>
                  {selectedStudent.certificates.map((cert) => (
                    <li key={cert.id}>
                      <div>
                        <strong>{cert.name}</strong>
                        <br />
                        <small>{new Date(cert.uploadDate).toLocaleDateString()}</small>
                      </div>
                      <button className="view-button">
                        <FaEye /> View
                      </button>
                    </li>
                  ))}
                </ul>
              </CertificateDetails>
            </Card>
          )}
        </Grid>
      </Content>
    </DashboardContainer>
  );
};

export default OrganizationDashboard;