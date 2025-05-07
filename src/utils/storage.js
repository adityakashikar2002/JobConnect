export const initializeMockData = () => {
    if (!localStorage.getItem('jobPortalJobs')) {
      const mockJobs = [
        {
          id: '1',
          companyId: '1',
          title: 'Frontend Developer',
          description: 'We are looking for a skilled Frontend Developer to join our team.',
          requirements: ['React', 'JavaScript', 'HTML/CSS'],
          location: 'Nagpur, IN',
          salary: 'Rs.80000 - Rs.100000',
          type: 'Full-time',
          status: 'active',
          postedDate: '2024-05-15'
        },
        {
          id: '2',
          companyId: '2',
          title: 'Backend Engineer',
          description: 'Join our backend team to build scalable APIs and services.',
          requirements: ['Node.js', 'Python', 'SQL'],
          location: 'Remote',
          salary: 'Rs.90000 - Rs.110000',
          type: 'Full-time',
          status: 'active',
          postedDate: '2024-05-10'
        },
        {
          id: '3',
          companyId: '1',
          title: 'UX Designer',
          description: 'Creative UX Designer needed for product design team.',
          requirements: ['Figma', 'User Research', 'Prototyping'],
          location: 'Banglore, IN',
          salary: 'Rs.75000 - Rs.95000',
          type: 'Contract',
          status: 'active',
          postedDate: '2025-04-20'
        }
      ];
      localStorage.setItem('jobPortalJobs', JSON.stringify(mockJobs));
    }
  
    if (!localStorage.getItem('jobPortalCompanies')) {
      const mockCompanies = [
        {
          id: '1',
          name: 'TechCorp',
          email: 'contact@techcorp.com',
          password: 'company123',
          description: 'Leading technology solutions provider',
          industry: 'Information Technology',
          foundedYear: '2010',
          employees: '500',
          website: 'https://techcorp.com',
          logo: 'https://fakeimg.pl/600x400',
          address: '123 Tech Street, Raipur, IN'
        },
        {
          id: '2',
          name: 'DevSolutions',
          email: 'info@devsolutions.com',
          password: 'company123',
          description: 'Software development company',
          industry: 'Software',
          foundedYear: '2015',
          employees: '200',
          website: 'https://devsolutions.com',
          logo: 'https://fakeimg.pl/600x400',
          address: '456 Dev Avenue, Hyderabad, IN'
        }
      ];
      localStorage.setItem('jobPortalCompanies', JSON.stringify(mockCompanies));
    }
  
    if (!localStorage.getItem('jobPortalApplicants')) {
      const mockApplicants = [
        {
          id: '1',
          name: 'Rani Mehta',
          email: 'rani@example.com',
          password: 'applicant123',
          phone: '123-456-7890',
          skills: ['React', 'JavaScript', 'CSS'],
          experience: '3 years',
          education: 'Bachelor in Computer Science',
          resume: 'https://example.com/resume/rani.pdf'
        },
        {
          id: '2',
          name: 'Sam Curran',
          email: 'sam@example.com',
          password: 'applicant123',
          phone: '987-654-3210',
          skills: ['Node.js', 'Python', 'SQL'],
          experience: '5 years',
          education: 'Master in Software Engineering',
          resume: 'https://example.com/resume/sam.pdf'
        }
      ];
      localStorage.setItem('jobPortalApplicants', JSON.stringify(mockApplicants));
    }
  
    if (!localStorage.getItem('jobPortalApplications')) {
      const mockApplications = [
        {
          id: '1',
          jobId: '1',
          applicantId: '1',
          applicationDate: '2023-05-20',
          status: 'pending'
        }
      ];
      localStorage.setItem('jobPortalApplications', JSON.stringify(mockApplications));
    }
  };