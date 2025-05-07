import { createContext, useContext, useState, useEffect } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem('jobPortalJobs');
    const storedApplications = localStorage.getItem('jobPortalApplications');
    const storedCompanies = localStorage.getItem('jobPortalCompanies');
    const storedApplicants = localStorage.getItem('jobPortalApplicants');

    if (storedJobs) setJobs(JSON.parse(storedJobs));
    if (storedApplications) setApplications(JSON.parse(storedApplications));
    if (storedCompanies) setCompanies(JSON.parse(storedCompanies));
    if (storedApplicants) setApplicants(JSON.parse(storedApplicants));
  }, []);

  const addJob = (job) => {
    const newJobs = [...jobs, job];
    setJobs(newJobs);
    localStorage.setItem('jobPortalJobs', JSON.stringify(newJobs));
  };

  const updateJob = (updatedJob) => {
    const newJobs = jobs.map(job => job.id === updatedJob.id ? updatedJob : job);
    setJobs(newJobs);
    localStorage.setItem('jobPortalJobs', JSON.stringify(newJobs));
  };

  const deleteJob = (jobId) => {
    const newJobs = jobs.filter(job => job.id !== jobId);
    setJobs(newJobs);
    localStorage.setItem('jobPortalJobs', JSON.stringify(newJobs));
  };

  const applyForJob = (application) => {
    const newApplications = [...applications, application];
    setApplications(newApplications);
    localStorage.setItem('jobPortalApplications', JSON.stringify(newApplications));
  };

  const addCompany = (company) => {
    const newCompanies = [...companies, company];
    setCompanies(newCompanies);
    localStorage.setItem('jobPortalCompanies', JSON.stringify(newCompanies));
  };

  const addApplicant = (applicant) => {
    const newApplicants = [...applicants, applicant];
    setApplicants(newApplicants);
    localStorage.setItem('jobPortalApplicants', JSON.stringify(newApplicants));
  };

  const updateApplicant = (updatedApplicant) => {
    const newApplicants = applicants.map(applicant => 
      applicant.id === updatedApplicant.id ? updatedApplicant : applicant
    );
    setApplicants(newApplicants);
    localStorage.setItem('jobPortalApplicants', JSON.stringify(newApplicants));
  };

  const updateCompany = (updatedCompany) => {
    const newCompanies = companies.map(company => 
      company.id === updatedCompany.id ? updatedCompany : company
    );
    setCompanies(newCompanies);
    localStorage.setItem('jobPortalCompanies', JSON.stringify(newCompanies));
  };

  return (
    <JobContext.Provider value={{
      jobs,
      applications,
      companies,
      applicants,
      addJob,
      updateJob,
      deleteJob,
      applyForJob,
      addCompany,
      addApplicant,
      updateApplicant,
      updateCompany
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);