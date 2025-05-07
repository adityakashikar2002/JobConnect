// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useJobs } from '../../context/JobContext';
// import './ApplicantProfile.css'; // Import CSS

// const ApplicantProfile = () => {
//   const { user } = useAuth();
//   const { applicants, updateApplicant } = useJobs();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     skills: '',
//     experience: '',
//     education: '',
//     resume: ''
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const currentApplicant = applicants.find(a => a.id === user.id);
//     if (currentApplicant) {
//       setFormData({
//         name: currentApplicant.name,
//         email: currentApplicant.email,
//         phone: currentApplicant.phone || '',
//         skills: currentApplicant.skills?.join(', ') || '',
//         experience: currentApplicant.experience || '',
//         education: currentApplicant.education || '',
//         resume: currentApplicant.resume || ''
//       });
//     }
//   }, [applicants, user.id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedApplicant = {
//       ...user,
//       ...formData,
//       skills: formData.skills.split(',').map(skill => skill.trim())
//     };

//     updateApplicant(updatedApplicant);
//     setIsEditing(false);
//   };

//   return (
//     <div className="applicant-profile-container">
//       <div className="profile-header">
//         <h1 className="profile-title">Your Profile</h1>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className={`edit-button ${isEditing ? 'cancel' : ''}`}
//         >
//           {isEditing ? 'Cancel' : 'Edit Profile'}
//         </button>
//       </div>

//       {isEditing ? (
//         <form onSubmit={handleSubmit} className="profile-form">
//           <div className="form-group">
//             <label htmlFor="name" className="form-label">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className="form-input"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email" className="form-label">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="form-input"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               disabled
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone" className="form-label">Phone Number</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               className="form-input"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="skills" className="form-label">Skills (comma separated)</label>
//             <input
//               type="text"
//               id="skills"
//               name="skills"
//               className="form-input"
//               value={formData.skills}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="experience" className="form-label">Experience</label>
//             <input
//               type="text"
//               id="experience"
//               name="experience"
//               className="form-input"
//               value={formData.experience}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="education" className="form-label">Education</label>
//             <input
//               type="text"
//               id="education"
//               name="education"
//               className="form-input"
//               value={formData.education}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="resume" className="form-label">Resume URL</label>
//             <input
//               type="url"
//               id="resume"
//               name="resume"
//               className="form-input"
//               value={formData.resume}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="save-button">Save Changes</button>
//         </form>
//       ) : (
//         <div className="profile-details">
//           <div className="detail-row">
//             <span className="detail-label">Full Name:</span>
//             <span className="detail-value">{formData.name}</span>
//           </div>
//           <div className="detail-row">
//             <span className="detail-label">Email:</span>
//             <span className="detail-value">{formData.email}</span>
//           </div>
//           <div className="detail-row">
//             <span className="detail-label">Phone:</span>
//             <span className="detail-value">{formData.phone || 'Not provided'}</span>
//           </div>
//           <div>
//             <span className="detail-label">Skills:</span>
//             <div className="skills-container">
//               {formData.skills.split(',').map((skill, index) => (
//                 <span key={index} className="skill-tag">{skill.trim()}</span>
//               ))}
//             </div>
//           </div>
//           <div className="detail-row">
//             <span className="detail-label">Experience:</span>
//             <span className="detail-value">{formData.experience || 'Not provided'}</span>
//           </div>
//           <div className="detail-row">
//             <span className="detail-label">Education:</span>
//             <span className="detail-value">{formData.education || 'Not provided'}</span>
//           </div>
//           {formData.resume && (
//             <div className="detail-row">
//               <span className="detail-label">Resume:</span>
//               <a
//                 href={formData.resume}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="resume-link"
//               >
//                 View Resume
//               </a>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApplicantProfile;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { motion } from 'framer-motion';
import './ApplicantProfile.css';

const ApplicantProfile = () => {
  const { user } = useAuth();
  const { applicants, updateApplicant } = useJobs();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    education: '',
    resume: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const currentApplicant = applicants.find(a => a.id === user.id);
    if (currentApplicant) {
      setFormData({
        name: currentApplicant.name,
        email: currentApplicant.email,
        phone: currentApplicant.phone || '',
        skills: currentApplicant.skills?.join(', ') || '',
        experience: currentApplicant.experience || '',
        education: currentApplicant.education || '',
        resume: currentApplicant.resume || ''
      });
    }
  }, [applicants, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedApplicant = {
      ...user,
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    updateApplicant(updatedApplicant);
    setIsEditing(false);
  };

  return (
    <motion.div 
      className="applicant-profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="profile-card"
        whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="profile-header">
          <h1 className="profile-title">Your Profile</h1>
          <motion.button
            onClick={() => setIsEditing(!isEditing)}
            className={`edit-button ${isEditing ? 'cancel' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </motion.button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="skills" className="form-label">Skills (comma separated)</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  className="form-control"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="experience" className="form-label">Experience</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  className="form-control"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="education" className="form-label">Education</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  className="form-control"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="resume" className="form-label">Resume URL</label>
                <input
                  type="url"
                  id="resume"
                  name="resume"
                  className="form-control"
                  value={formData.resume}
                  onChange={handleChange}
                />
              </div>
            </div>
            <motion.button
              type="submit"
              className="save-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Full Name:</span>
              <span className="detail-value">{formData.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{formData.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{formData.phone || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Skills:</span>
              <div className="skills-container">
                {formData.skills.split(',').map((skill, index) => (
                  <motion.span 
                    key={index} 
                    className="skill-tag"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill.trim()}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">Experience:</span>
              <span className="detail-value">{formData.experience || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Education:</span>
              <span className="detail-value">{formData.education || 'Not provided'}</span>
            </div>
            {formData.resume && (
              <div className="detail-row">
                <span className="detail-label">Resume:</span>
                <a
                  href={formData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-link"
                >
                  View Resume
                </a>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ApplicantProfile;