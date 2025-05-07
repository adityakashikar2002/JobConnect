import React from 'react';
import { useAuth } from '../context/AuthContext';
import ApplicantProfile from '../components/Profile/ApplicantProfile';
import CompanyProfile from '../components/Profile/CompanyProfile';
import './ProfilePage.css'; // Import CSS

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      {user?.type === 'applicant' ? (
        <ApplicantProfile />
      ) : (
        <CompanyProfile />
      )}
    </div>
  );
};

export default ProfilePage;