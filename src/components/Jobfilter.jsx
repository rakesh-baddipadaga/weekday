import { Grid, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";

function Jobfilter() {
    const [filters, setFilters] = useState({
        minExperience: "",
        companyName: "",
        location: "",
        remote: "",
        techStack: "",
        role: "",
        minBasePay: ""
    });
    return (
        <div>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField name="roles" 
                            label="Roles"
                        
                        >
                            <MenuItem value="Frontend">Frontend</MenuItem>
                            <MenuItem value="Backend">Backend</MenuItem>
                            <MenuItem value="Fullstack">Fullstack</MenuItem>
                            <MenuItem value="IOS">IOS</MenuItem>
                            <MenuItem value="Flutter">Flutter</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField name="no of employees"
                            label="No Of Employees"
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField name="minExperience" 
                            label="Experience"
                        >
                            <MenuItem value="1">1 year</MenuItem>
                            <MenuItem value="2">2 years</MenuItem>
                            <MenuItem value="3">3 years</MenuItem>
                            <MenuItem value="4">4 years</MenuItem>
                            <MenuItem value="5">5 years</MenuItem>
                            <MenuItem value="6">6 years</MenuItem>
                            <MenuItem value="7">7 years</MenuItem>
                            <MenuItem value="8">8 years</MenuItem>
                            <MenuItem value="9">9 years</MenuItem>
                            <MenuItem value="10">10 years</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField name="location"
                            label="Remote"></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField name="minbasepaysalary"
                            label="Minimum Base Pay Salary"
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField name="searchcompany name"
                            label="Search Company Name"

                        ></TextField>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Jobfilter;