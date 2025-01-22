// Simple storage service using localStorage
export const storage = {
    uploadCertificate: (userId, file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
          const newCertificate = {
            id: Date.now().toString(),
            studentId: userId,
            name: file.name,
            data: reader.result,
            uploadDate: new Date().toISOString()
          };
          certificates.push(newCertificate);
          localStorage.setItem('certificates', JSON.stringify(certificates));
          resolve(newCertificate);
        };
      });
    },
  
    getCertificates: (userId) => {
      const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
      return certificates.filter(cert => cert.studentId === userId);
    },
  
    getAllCertificates: () => {
      return JSON.parse(localStorage.getItem('certificates') || '[]');
    }
  };