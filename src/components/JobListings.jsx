import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';
import jobsData from '../jobs.json'; // Import the JSON file

const JobListings = ({ isHome = false }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = () => {
            // Get data from JSON, applying limit if needed
            const data = isHome ? jobsData.jobs.slice(0, 3) : jobsData.jobs;
            setJobs(data);
            setLoading(false);
        };

        fetchJobs();
    }, [isHome]); // Add isHome to dependencies

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHome ? "Recent Jobs" : "Browse Jobs"}
                </h2>
                {loading ? (<Spinner loading={loading} />) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <JobListing job={job} key={job.id} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default JobListings;
