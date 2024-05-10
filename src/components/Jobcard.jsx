import React, { useEffect, useState } from "react";
import Jobfilter from "./Jobfilter";
import samplejobdata from "./sampledata";
import { Button, Card, CardContent, Grid, Modal, Typography } from "@mui/material";
import FlashOnIcon from '@material-ui/icons/FlashOn';

function Jobcard() {

    const [data, setData] = useState(samplejobdata);
    
    const [filteredata,setFiltereddata]=useState([...data]);
    const [showMore, setShowMore] = useState({});


    useEffect(()=>{
        setFiltereddata([...data]);
    },[data]);

    //Function for filtering the jobs based on search criteria
    const filterJobs = (filters) => {
        let filteredJobs = data.filter(job => {
            // Check if each filter criteria matches with the job listing
            return (
                (filters.minExperience === "" || (job.minExp >= parseInt(filters.minExperience))) &&
                (filters.companyName === "" || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) &&
                (filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
                (filters.remote === "" || job.remote === (filters.remote === "true")) &&
                (filters.techStack === "" || job.techStack.toLowerCase().includes(filters.techStack.toLowerCase())) &&
                (filters.role === "" || job.role.toLowerCase().includes(filters.role.toLowerCase())) &&
                (filters.minBasePay === "" || (job.minJdSalary >= parseInt(filters.minBasePay)))
            );
        });

        // Update filtered data state
        setFiltereddata(filteredJobs);
    };


    const handleLoadMore = (index) => {
        setShowMore({ ...showMore, [index]: true });
    };

    const handleCloseMore = (index) => {
        setShowMore({ ...showMore, [index]: false });
    };



    return (
        <div>
            <Jobfilter />
            <Grid container spacing={3}>
                {data?.map((item,index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={item.jdUid}>
                        <Card className="cardcontainer">
                        <CardContent>
                                <div className="companyandtitle">
                                    <div>
                                        <img src={item.logoUrl} alt={item.companyName} className="logo" />
                                    </div>
                                    <div className="companyandtitletext">
                                        <Typography color="textSecondary" className="companyName">
                                            {item.companyName}
                                        </Typography>
                                        <Typography variant="h5" component="h2" className="jobTitle">
                                            {item.jobRole}
                                        </Typography>
                                        <Typography variant="h5" component="h2" className="jobTitle">
                                            {item.location}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="details">
                                    {item.minJdSalary && item.maxJdSalary && (
                                        <Typography color="textSecondary" className="salary">
                                            Expected Salary: {item.minJdSalary} - {item.maxJdSalary} {item.salaryCurrencyCode}
                                        </Typography>
                                    )}
                                    <Typography className="about">About Company :</Typography>
                                    <Typography variant="body2" component="p" className="jobDescription">
                                        {showMore[index] ? item.jobDetailsFromCompany : item.jobDetailsFromCompany.substring(0, 150) + '...'}
                                    </Typography>
                                    <a href="#" onClick={() => handleLoadMore(index)} className="showMoreLink">
                                        Show More
                                    </a>
                                    {item.minExp && (
                                        <Typography color="textSecondary">
                                            Minimum Experience: {item.minExp} years
                                        </Typography>
                                    )}
                                    <Button component="a" variant="contained" color="primary" href={item.jdLink} className="applyButton"  startIcon={<FlashOnIcon />}>
                                        Easy Apply
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Modal open={showMore[index]} onClose={() => handleCloseMore(index)} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Card style={{ height: '450px', width: '350px' }}>
                                <CardContent>
                                    <Typography color="textSecondary">
                                        {item.companyName}
                                    </Typography>
                                    <Typography>
                                        {item.jobDetailsFromCompany}
                                    </Typography>
                                    {/* Add more details about the company and role here */}
                                </CardContent>
                            </Card>
                        </Modal>
                    </Grid>
                ))}

            </Grid>
        </div>
    )
}

export default Jobcard;