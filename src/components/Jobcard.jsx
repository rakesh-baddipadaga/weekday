import React, { useEffect, useState } from "react";
import Jobfilter from "./Jobfilter";
import samplejobdata from "./sampledata";
import { Button, Card, CardContent, Grid, Modal, Typography } from "@mui/material";

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
                                <Typography>
                                    <img src={item.logoUrl} alt={item.companyName} />
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {item.jobRole}
                                </Typography>
                                <Typography color="textSecondary">
                                    {item.companyName}
                                </Typography>
                                <Typography color="textSecondary">
                                    Location: {item.location}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {item.jobDetailsFromCompany.substring(0, 150)}...
                                    {/* Displaying a limited portion of job description */}
                                </Typography>
                                <Typography color="textSecondary">
                                    Experience: {item.minExp} - {item.maxExp} years
                                </Typography>
                                <Button variant="contained" color="primary" href={item.jdLink}>
                                    Easy Apply
                                </Button>
                                <Button variant="contained" color="primary" onClick={()=>handleLoadMore(index)}>
                                    Easy Apply
                                </Button>
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