import React, { useEffect, useState } from "react";
import Jobfilter from "./Jobfilter";
import samplejobdata from "./sampledata";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

function Jobcard() {

    const [data, setData] = useState(samplejobdata);


    // useEffect(()=>{
    //     setData(data?.jdList || []);
    // },[])



    return (
        <div>
            <Jobfilter />
            <Grid container spacing={3}>
                {data?.map((item) => (
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
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </div>
    )
}

export default Jobcard;