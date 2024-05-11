import { Grid, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";

function Jobfilter({onFilter}) {
    const [filters, setFilters] = useState({
        role: "",
        minExperience: "",
        remote: "",
        minBasePay: "",
        location: "",
        companyName: "",
        minbasepaysalary:"0-1000"
        // techStack: "",
    });

    //for handling the input change of search
    const handleinputchange=(event)=>{
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
        onFilter({...filters,[name]:value});
    }



    return (
        <div>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField name="role" 
                            label="Roles"
                            values={filters?.role}
                            onChange={handleinputchange}
                            fullWidth
                            select
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="Frontend">Frontend</MenuItem>
                            <MenuItem value="Backend">Backend</MenuItem>
                            <MenuItem value="Fullstack">Fullstack</MenuItem>
                            <MenuItem value="IOS">IOS</MenuItem>
                            <MenuItem value="Flutter">Flutter</MenuItem>
                        </TextField>
                    </Grid>
                    {/* The filter is not used, because the the given data doesn't contain the no of employees attribute */}
                    {/* <Grid item xs={12} sm={6} md={2}>
                        <TextField name="no of employees"
                            label="No Of Employees"
                        ></TextField>
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField name="minExperience" 
                            label="Experience"
                            values={filters?.minExperience}
                            onChange={handleinputchange}
                            fullWidth
                            select
                        >
                            <MenuItem value="">Any</MenuItem>
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
                            label="Remote"
                            values={filters?.remote}
                            onChange={handleinputchange}
                            fullWidth
                            select
                            >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="bangalore">bangalore</MenuItem>
                            <MenuItem value="chennai">chennai</MenuItem>
                            <MenuItem value="delhi ncr">delhi ncr</MenuItem>
                            <MenuItem value="remote">Remote</MenuItem>

                            </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField name="minbasepaysalary"
                            label="Minimum Base Pay Salary"
                            values={filters?.minBasePay}
                            onChange={handleinputchange}
                            fullWidth
                            select
                        >

                            <MenuItem value="0-1000">Any</MenuItem>
                            <MenuItem value="0-20">0 - 20</MenuItem>
                            <MenuItem value="20-50">20 - 50</MenuItem>
                            <MenuItem value="50-100">50 - 100</MenuItem>
                            <MenuItem value="100-150">100 - 150</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField name="companyName"
                            label="Search Company Name"
                            values={filters?.companyName}
                            onChange={handleinputchange}
                            fullWidth
                        ></TextField>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Jobfilter;