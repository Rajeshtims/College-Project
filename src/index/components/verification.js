import React from 'react';
import './../css/verification.css';
export class Verification extends React.Component{
    constructor(props){
        super(props);
        this.state={
            code:"######",
        };
        this.setCode = this.setCode.bind(this);
    }
    setCode(e) {
        if (e.target.type === "text") {
            this.setState({code: e.target.value});
        }
    }
    render(){
        if(this.props.verification==="phone"){
            return <div id="verification">
                <div id="appName"><center>पेशाघर</center></div>
                <div id="msg"><center>Just one more step. Enter the 6-digit code we sent to 9847742665</center></div>
                <input type="text" value={this.state.code} onChange={this.setCode}/><br/>
                <input type="button" value="Conform"/><br/><br/>
                <div id="setagn">
                    <center><a href="#">Change Number</a> | <a href="#">Resent New Code</a></center>
                </div>
                <div id="login_link">
                    <center>Have an Account ? <a href="#"><b> Log In</b></a></center>
                </div>
            </div>
        }else if(this.props.verification==="emailLinkSent"){
            return <div id="verification">
                <div id="appName"><center>पेशाघर</center></div>
                <div id="msg"><center>A conformation email link has been sent to your email {window.localStorage.getItem('emailForSignIn')} Please check your email for verification</center></div>
                <div id="setagn">
                    <center><a href="#">Change email</a> | <a href="#">Resent link again</a></center>
                </div>
                <div id="login_link">
                    <center>Have an Account ? <a href="#"><b> Log In</b></a></center>
                </div>
            </div>
        }else if(this.props.verification==="emailVerified"){
            return <div id="verification">
                <div id="appName"><center>पेशाघर</center></div>
                <div id="msg"><center>Your email is successfully verified. Please Log in to your account with your email and password </center></div>
                <div id="login_link">
                    <center><a href="#"><b> Log In</b></a></center>
                </div>
            </div>
        }else{
            return null;
        }

    }
}