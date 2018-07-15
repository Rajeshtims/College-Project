import React from 'react';
import Firebase from 'firebase';
import NextStage from './nextStage';
import {SideAbout} from './sideAbout';
import {Verification} from './verification';
export class SignUp extends React.Component{
    constructor(){
        super();
        this.state={
            fullName:"Full Name",
            username:"shures123",
            emailOrPhone : "shures.nepali@gmail.com",
            password: "*********",
            nextStage: false,
            verification: "",
        };
        this.handleInputs= this.handleInputs.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
        if (Firebase.auth().isSignInWithEmailLink(window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            let password = window.localStorage.getItem('passwordForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }else{
                Firebase.auth().createUserWithEmailAndPassword(email,password).then((hey)=>{
                    this.setState({verification:'emailVerified'})
                }).catch((error)=> {
                    alert(error.code);
                });
            }
        }
    }

    signUp() {

        let actionCodeSettings = {
            url: 'http://localhost:8080/',
            handleCodeInApp: true
        };
        Firebase.auth().sendSignInLinkToEmail(this.state.emailOrPhone, actionCodeSettings)
            .then(()=> {
                window.localStorage.setItem('emailForSignIn', this.state.emailOrPhone);
                window.localStorage.setItem('passwordForSignIn', this.state.password);
                this.setState({verification:"emailLinkSent"});
            })
            .catch(function(error) {
                alert(error);
            });

        //
        // Firebase.auth().signInWithEmailAndPassword("shures.nepali@gmail.com", "password666").catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     if(errorCode!==null && errorMessage!==null ){
        //         alert("not registered");
        //     }else{
        //
        //     }
        //     // ...
        // });
        // Firebase.auth().languageCode = 'nepali';
        // window.recaptchaVerifier = new Firebase.auth.RecaptchaVerifier('container_re');
        // Firebase.auth().signInWithPhoneNumber("+9779847742665", window.recaptchaVerifier)
        //     .then(function (confirmationResult) {
        //         alert("sms sent");
        //         // SMS sent. Prompt user to type the code from the message, then sign the
        //         // user in with confirmationResult.confirm(code).
        //         window.confirmationResult = confirmationResult;
        //     }).catch(function (error) {
        //     // Error; SMS not sent
        //     // ...
        // });
    }


    handleInputs(e){
        if(e.target.name==='name'){
            this.setState({fullName:e.target.value});
        }else if(e.target.name==='username'){
            this.setState({username:e.target.value});
        } else if(e.target.name==='emailOrPhone'){
            this.setState({emailOrPhone:e.target.value});
        }else if(e.target.name==='password'){
            this.setState({password:e.target.value});
        }
    }
    handleSubmit(e) {
        e.preventDefault();
    }

    render(){
        if(this.state.verification!==""){
            return <Verification verification ={this.state.verification}/>;
        }else{
            return(
                <div id="about">
                    <div id="container_re">

                    </div>
                    <div id="right_panel">
                        <form  onSubmit={this.handleSubmit}>
                            <div id="title">
                                <center id="app_name">पेशाघर</center><br/>
                                <center id="dis">अब जागिर खाेज्नुहाेस्र एउदै ठाउमा</center>
                            </div><br/>
                            <input type="text" value={this.state.fullName} name='name' onChange={this.handleInputs}/><br/>
                            <input type="text" value={this.state.username} name='username' onChange={this.handleInputs}/><br/>
                            <input type="email" value={this.state.emailOrPhone} name="emailOrPhone" onChange={this.handleInputs}/><br/>
                            <input type="password" value={this.state.password}  name="password" onChange={this.handleInputs} required="required"/><br/>
                            <button onClick={this.signUp} id="sign-in-button">Sign Up</button>
                            <button  style={{backgroundColor:'forestgreen'}} onClick={this.signUp}>Sign Up With Facebook</button>
                            <div id="condition">
                                <center>By signing up, you agree to our Terms & Privacy Policy.</center>
                            </div>
                        </form>
                    </div>
                    <SideAbout/>
                    <NextStage nextStage={this.state.nextStage}/>
                </div>
            )
        }

    }
}



