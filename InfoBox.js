import React from 'react'
import {Card , CardContent , Typography } from "@material-ui/core";  
function InfoBox({ title , cases, total }) {
	return (
		<Card className="infoBox">
		  <CardContent>
		     {/* title of corna cases */}
		    <Typography className="infoBox__title" color ="textSecondary">
			    {title}
		  </Typography> 
		     
		         {/* +120k no of cases */}
		     
		     <h2 className="infoBox__cases">{cases}</h2>
		 


		     {/* 1,3m total */}
		     <Typography className="infoBox__total" color="textSecondary">
			     {total} Total
		     </Typography>
		 
		  </CardContent>
			
		</Card>
	)
}

export default InfoBox
