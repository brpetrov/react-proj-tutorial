import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import jobsData from './jobs.json'; 

const App = () => {
  // Add Job (currently just a placeholder without backend save logic)
  const addJob = async (newJob) => {
    jobsData.jobs.push(newJob); // Adds job to the array (only in memory for now)
  };

  // Edit Job
  const editJob = async (updatedJob) => {
    const jobIndex = jobsData.jobs.findIndex((job) => job.id === updatedJob.id);
    if (jobIndex !== -1) {
      jobsData.jobs[jobIndex] = updatedJob;
    }
  };

  // Delete Job
  const deleteJob = (id) => {
    const jobIndex = jobsData.jobs.findIndex((job) => job.id === id);
    if (jobIndex !== -1) {
      jobsData.jobs.splice(jobIndex, 1); // Remove the job from the array
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path="add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="edit-job/:id" element={<EditJobPage editJobSubmit={editJob} />} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
