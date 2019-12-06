import React, { Component } from "react"

import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { CardActions } from "@material-ui/core"
import CardHeader from '@material-ui/core/CardHeader';
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"


const StyledCard = styled(Card)`
  max-width: 345px !important;
  margin-left: 30px !important;
  margin-top: 28px !important;
`

const StyledTypography = styled(Typography)`
  padding: 10px;
`

export default class UserDetails extends Component{

  render(){
    return(
      <StyledCard>
        <CardHeader title="My account"/>
        <StyledTypography>username: {this.props.username}</StyledTypography>
        <StyledTypography>email: {this.props.email}</StyledTypography>
        <CardActions>   
          <Grid item><Link href="/changepassword" variant="body2">{"Change password"}</Link></Grid>
        </CardActions>
      </StyledCard>
    )
  }
}