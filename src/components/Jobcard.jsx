import React, { useEffect, useState } from "react";
import Jobfilter from "./Jobfilter";
import samplejobdata from "./sampledata";
import { Button, Card, CardContent, Grid, Modal, Stack, Typography } from "@mui/material";
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { useDispatch, useSelector } from "react-redux";
import { setJobData } from "../redux/reducers";
import './Jobcard.css'

function Jobcard() {

    const jobData = useSelector(state => state.jobData);
    const dispatch = useDispatch();



    const [filteredData, setFilteredData] = useState([...jobData]); // Initialize filteredData with all job listings
    const [showMore, setShowMore] = useState({});


    useEffect(()=>{
        dispatch(setJobData(samplejobdata));
        },[dispatch])

    useEffect(()=>{
        setFilteredData([...jobData]);
    },[jobData]);

    //Function for filtering the jobs based on search criteria
    const filterJobs = (filters) => {
        console.log(filters);
        let filteredJobs = jobData.filter(job => {

             return (
                 (filters.minExperience === "" || (job.minExp >= parseInt(filters.minExperience))) &&
                 (filters.companyName === "" || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) &&
                 (filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
                //  (filters.remote === "" || job.remote === (filters.remote === "true")) &&
                 (filters.role === "" || job.jobRole.toLowerCase().includes(filters.JobRole.toLowerCase())) 
                //  (filters.minBasePay === "" || (job.minJdSalary >= parseInt(filters.minBasePay)))
             );
        });

        // Update filtered data state
        setFilteredData([...filteredJobs]);
    };


    const handleLoadMore = (index) => {
        setShowMore({ ...showMore, [index]: true });
    };

    const handleCloseMore = (index) => {
        setShowMore({ ...showMore, [index]: false });
    };



    return (
        <div>
            <Jobfilter onFilter={filterJobs} />
            <Grid container spacing={3}>
                {filteredData?.map((item,index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={item.jdUid}>
                        <Card className="cardcontainer">
                        <CardContent>
                        <Stack spacing={2}>

                        <div className="companyandtitle">
                            <div style={{width: "60px", height: "60px"}}>
                                <img style={{width: "60px", height: "60px"}} src={item.logoUrl} alt={item.companyName} className="logo" />
                            </div>
                            <div className="companyandtitletext">
                                <Typography color="textSecondary" className="companyName">
                                    {item.companyName}
                                </Typography>
                                <Typography variant="h5" component="h2" className="jobTitle">
                                    {item.jobRole}
                                </Typography>
                            </div>
                        </div>
                        <Typography sx={{fontSize: "16px"}}>
                            {item.location}
                        </Typography>
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
                </Stack>
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