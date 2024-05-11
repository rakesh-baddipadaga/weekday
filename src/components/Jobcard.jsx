import React, { useEffect, useState } from "react";
import Jobfilter from "./Jobfilter";
import samplejobdata from "./sampledata";
import { Box, Button, Card, CardContent, Grid, Modal, Stack, Typography } from "@mui/material";
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { useDispatch, useSelector } from "react-redux";
import { setJobData } from "../redux/reducers";
import './Jobcard.css'
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
        // console.log(filters);
        let filteredJobs = jobData.filter(job => {

            return (
                (filters.minExperience === "" || (job.minExp >= parseInt(filters.minExperience))) 
                && (filters.companyName === "" || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) 
                && (filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase()))
                && (filters.role === "" || job.jobRole.toLowerCase().includes(filters.role.toLowerCase()))   
                && (filters.minbasepaysalary === "" || (job.minJdSalary >= parseInt(filters.minbasepaysalary.split("-")[0]) && job.minJdSalary <=   parseInt(filters.minbasepaysalary.split("-")[1])))
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
        <div className="main">
            <Jobfilter onFilter={filterJobs} />
            <Box className="box"></Box>
            <Grid container spacing={3}>
            {filteredData?.length === 0 ? (
                    <Typography variant="body1" ><div className="nodata"><h3>No Jobs available for this  category at the moment.</h3></div></Typography>
                ) :(
                    
                    filteredData?.map((item,index) => (
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
                        <Typography sx={{fontSize: "16px", textTransform:"capitalize"}}>
                            {item.location}
                        </Typography>
                        <div className="details">
                            {item.minJdSalary && item.maxJdSalary && (
                                <Typography color="textSecondary" className="salary">
                                    Expected Salary: {item.minJdSalary} - {item.maxJdSalary} {item.salaryCurrencyCode}
                                    <CheckBoxIcon color="success" style={{verticalAlign:'middle'}}></CheckBoxIcon>
                                </Typography>
                            )}
                            <Typography className="about">About Company :</Typography>
                            <Typography className="about-us">About us:</Typography>

                            <Typography variant="body2" component="p" className="jobDescription">
                                {showMore[index] ? item.jobDetailsFromCompany : item.jobDetailsFromCompany.substring(0, 150) + '...'}
                            </Typography>
                            <a href="#" onClick={() => handleLoadMore(index)} className="showMoreLink">
                                Show More
                            </a>
                            {item.minExp && (
                                <Typography color="textSecondary" className="experience">
                                    Minimum Experience:{item.minExp} years
                                </Typography>
                            )}
                            <Button component="a" variant="contained" color="primary" href={item.jdLink} className="applyButton"  startIcon={<FlashOnIcon />}>
                                Easy Apply
                            </Button>
                        </div>
                </Stack>
                            </CardContent>
                        </Card>
                        <Modal open={showMore[index]} onClose={() => handleCloseMore(index)} className="modal">
                            <Card className="modalcard">
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
                )))}


            </Grid>
        </div>
    )
}

export default Jobcard;