import React from 'react';
import '../css/poster.css';
import $ from "jquery";
import Firebase from 'firebase';
const content = <div>hello world</div>;
$(document).ready(function () {
    $("#poster>#writeHolder>#more>#emogi>img").click(function () {
        $(this).toggleClass("Jclass");
    });
    $("#poster>#writeHolder>#more>#color>img").click(function () {
        $(this).toggleClass("Jclass");
    });



});



export class Poster extends React.Component{
    constructor(){
        super();
        this.state={
            text:'',
            emoji:false,
            color:false,
            imageVideo:{selected:false,file:'null',src:'src/home/images/post.jpg',progress:'',firebaseLink:''},
            location:{show:false,selectedItemShow:false,searchItems:[{place:'Jomsom, Mustang',people:2536},{place:'Kathmandu, Nepal',people:2542},{place:'Chame, Manang',people:12},{place:'Pokhara, Kaski',people:147}],selectedItems:[]},
            deadline:{selectedShow:false,show:false,selectedItem:''},
            poll:{show:false,items:['option 1','option 2']},
            postType:{postTypeItemShow:false,postTypeItemSelected:0,postTypeItems:['Ask a question/recommendation','Find a business Partner','Do a sale','do a advertisement','Event/Invitation','Make a business Poll']}
        };
        this.hideShowEmojiOrColor = this.hideShowEmojiOrColor.bind(this);
        this.addEmoji = this.addEmoji.bind(this);
        this.addColor=this.addColor.bind(this);
        this.fileSelected=this.fileSelected.bind(this);
        this.locationHandler = this.locationHandler.bind(this);
        this.deadlineHandler= this.deadlineHandler.bind(this);
        this.pollHandler = this.pollHandler.bind(this);
        this.pollEditOption = this.pollEditOption.bind(this);
        this.postType = this.postType.bind(this);
        this.handlePost= this.handlePost.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleContentEdit= this.handleContentEdit.bind(this);

        // let config = {
        //     apiKey: "AIzaSyCBCM5colION5bSz9gZ6uMst1hIGZXeHc4",
        //     authDomain: "project-43f8b.firebaseapp.com",
        //     databaseURL: "https://project-43f8b.firebaseio.com",
        //     projectId: "project-43f8b",
        //     storageBucket: "project-43f8b.appspot.com",
        //     messagingSenderId: "368619453998"
        // };
        // Firebase.initializeApp(config);
    }
    handlePost(){
        let poster = Firebase.database().ref('posts').push();
        poster.set({
            posterId:1,
            Type:this.state.postType.postTypeItemSelected,
            caption:this.state.text,
            photo:this.state.imageVideo.firebaseLink,
            deadline:this.state.deadline.selectedItem,
            instd:10,
            egmt:5,
            pollItems:this.state.poll.items
        })
    }
    postType(data,data1){
        let postType= this.state.postType;
        if(data==='show'){
            postType['postTypeItemShow'] = !this.state.postType.postTypeItemShow;
        }
        if(data==='itemSelected'){
            postType.postTypeItemSelected = data1;
        }
        this.setState({postType:postType});
    }
    fileSelected(e){
        let imageVideo =  this.state.imageVideo;
        imageVideo['selected']  = true;
        this.setState({imageVideo:imageVideo});

        var preview = document.querySelector('img');
        var file    = e.target.files[0];
        var reader  = new FileReader();

        reader.onloadend = ()=> {
            let imageVideo =  this.state.imageVideo;
            imageVideo['src']  = reader.result;
            this.setState({imageVideo:imageVideo});
        };


        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }


        let storageRef = Firebase.storage().ref('images');
        let uploadTask = storageRef.child(e.target.files[0].name).put(file);
        uploadTask.on('state_changed', (snapshot)=>{
            let imageVideo =  this.state.imageVideo;
            imageVideo['progress'] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({imageVideo:imageVideo});
        })

    }
    hideShowEmojiOrColor(data){
        if(data==="emoji"){
            this.setState({emoji:!this.state.emoji});
        }else if(data==="color"){
            this.setState({color:!this.state.color});
        }
    }
    addEmoji(data){
        this.setState({text:this.state.text+":"+data});
        let src ="src/home/icons/poster/emoji/";
        let res = src.concat(data+".png");
        $("#poster>#writeHolder>#content").append("<img src='"+res+"'/>");
    }
    addColor(data){
        $("#poster>#writeHolder>#content").css('backgroundColor',data);
        $("#poster>#writeHolder>#content").css('color','rgba(255,255,255,0.8)');
        if(data==='white'){
            $("#poster>#writeHolder>#content").css('color','rgba(0,0,0,0.8)');
        }
    }

    locationHandler(data,data1){
        let location=this.state.location;
        if(data==='show'){
            location['show']=!this.state.location.show;
        }
        if(data==='itemClicked'){
            location['selectedItemShow'] = true;
            if(location['selectedItems'].indexOf(data1)===-1){
                location['selectedItems'].push(data1);
            }else{
                alert("already added");
            }
        }
        if(data==='removeItem'){
            location['selectedItems'].pop();
            if(location['selectedItems'].length===0){
                location['selectedItemShow'] = false;
            }
        }

        this.setState({location:location});
    }

    deadlineHandler(data,data1){

        let deadline= this.state.deadline;
        if(data==='selectedShow'){
            deadline['selectedShow']=!this.state.deadline.selectedShow;
        }
        if(data==='show'){
            deadline['show']=!this.state.deadline.show;
        }
        if(data==='selectedItem'){
            deadline['selectedItem']=data1;
        }
        this.setState({deadline:deadline});
    }

    pollHandler(data){
        let poll= this.state.poll;
        if(data==='show'){
            poll['show']=!this.state.poll['show'];
        }
        if(data==='addItem'){
            poll['items'].push("option "+parseInt(poll['items'].length+1));
        }
        if(data==='removeItem'){
            poll['items'].pop();
            if(poll['items'].length===0){
                poll['show']=false;
            }
        }
        if(data==='removePoll'){
            poll['show']=!this.state.poll['show'];
        }
        this.setState({poll:poll});
    }

    pollEditOption(e){
        let poll= this.state.poll;
        poll.items[e.target.name]=e.target.value;
        this.setState({poll:poll});
    }
    handleText(e){
        //alert(e.target.textContent);
        this.setState({text:this.state.text+e.target.textContent.charAt(e.target.textContent.length-1)})
    }
    handleContentEdit(e){
        if(e.target.innerHTML === 'Type a Post...'){
            e.target.innerHTML = "";
        }else {

        }
    }
    render(){
        if(this.props.addPost===false){
            return null
        }else{
            return <div id="shadow">
                <div id="poster">
                    <div id="header">
                        <div id="title">
                            <img src="src/home/icons/poster/006-quill-pen.png"/>
                            <span>Compose A Post</span>
                        </div>
                        <div id="select">
                            <img src="src/home/icons/poster/other/creative.png"/>
                            <span>{this.state.postType.postTypeItems[this.state.postType.postTypeItemSelected]}</span>
                            <div id="change" onClick={()=>this.postType('show')}>
                                <span>Change</span>
                                <SelectPostType postType={this.state.postType} postTypeSelected={this.postType}/>
                            </div>
                        </div>
                        <div id="close">
                            <img onClick={this.props.removePost} src="src/home/icons/poster/other/cross-out.png"/>
                        </div>
                    </div>
                    <div id="writeHolder">
                        <div id="img">
                            <img src="src/home/images/sideProfile/girl.jpg"/>
                        </div>
                        <div id="content"  onKeyUp={this.handleText} contentEditable='true' onClick={this.handleContentEdit}>
                            Type a Post...
                        </div>
                        <div id="more">
                            <div id="emogi">
                                <span>Add emogi<div> </div></span>
                                <img  onClick={()=>this.hideShowEmojiOrColor('emoji')} src="src/home/icons/poster/003-happiness.png"/>
                                <Emoji currentState={this.state.emoji} addEmoji={this.addEmoji}/>
                            </div>
                            <div id="color">
                                <span>Add color<div> </div></span>
                                <img  onClick={()=>this.hideShowEmojiOrColor('color')}  src="src/home/icons/poster/001-paint.png"/>
                                <Color currentState={this.state.color} addColor={this.addColor}/>
                            </div>
                        </div>
                    </div>
                    <div id="selected">
                        <PollSelected poll={this.state.poll} addItem={this.pollHandler} editOption={this.pollEditOption}/>
                        <ImageVideoSelected imageVideo = {this.state.imageVideo}/>
                        <LocationSelected  location={this.state.location} removeItem={this.locationHandler}/>
                        <DeadlineSelected  deadline={this.state.deadline} DeadlineHandler={this.deadlineHandler} />
                    </div>

                    <div id="attach">
                        <div id="photo">
                            <span>Upload  Image <div> </div></span>
                            <img src="src/home/icons/poster/photo.png"/>
                            <form>
                                <input type="file" onChange={this.fileSelected}/>
                            </form>
                        </div>
                        <div id="location">
                            <span>Add location<div> </div></span>
                            <img src="src/home/icons/poster/location.png" onClick={()=>this.locationHandler('show')}/>
                            <LocationShow location={this.state.location} locationHandler={this.locationHandler}/>
                        </div>
                        <div>
                            <span>Add poll<div> </div></span>
                            <img onClick={()=>this.pollHandler('show')} src="src/home/icons/poster/poll.png"/>
                        </div>
                        <div id="deadline">
                            <span>Post deadline<div> </div></span>
                            <img  onClick={()=>this.deadlineHandler('show')} src="src/home/icons/poster/deadline.png"/>
                            <DeadlineSelect deadline={this.state.deadline} deadlineHandler={this.deadlineHandler} />
                        </div>
                        <div>
                            <span>More selection<div> </div></span>
                            <img src="src/home/icons/poster/select.png"/>
                        </div>
                        <div>
                            <span>Other if exits<div> </div></span>
                            <img src="src/home/icons/poster/more.png"/>
                        </div>
                        <input type="button" onClick={this.handlePost} value="Post It"/>
                    </div>
                    <div className="sectionBreak"> </div>
                    <div id="select">
                        <div id="location_search">
                            <b>Setting </b>
                        </div>
                        <div className="container">

                        </div>
                    </div>
                </div>
            </div>
        }

    }
}

class SelectPostType extends React.Component{
    render(){
        if(this.props.postType.postTypeItemShow===false){
            return null;
        }else{
            return <div id="items">
                        <ul>
                            {this.props.postType.postTypeItems.map((item,index)=>{
                                return <li onClick={()=>this.props.postTypeSelected('itemSelected',index)}><span>{item}</span></li>
                            })}
                        </ul>
                    </div>
        }
    }
}
class Emoji extends React.Component{
    constructor(){
        super();
        this.state={
            items:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]
        };
    }
    render(){
        if(this.props.currentState===false){
            return null;
        }else{
            return  <div id="emogi_container">
                <div id="header">Select Emoji</div>
                <div id="items">
                    {this.state.items.map((data)=> <img onClick={()=>this.props.addEmoji(data)} src={"src/home/icons/poster/emoji/"+data+".png"}/>)}
                </div>
            </div>
        }
    }
}
class Color extends React.Component{
    constructor(){
        super();
        this.state={
            colors:["red","blue","black","green","brown","white"]
        }
    }
    render(){
        if(this.props.currentState===false){
            return null;
        }else{
            return  <div id="color_container">
                <div id="header">Add Colors</div>
                <div id="items">
                    {this.state.colors.map((data)=> <div id={data} onClick={()=>this.props.addColor(data)} style={{backgroundColor:data}}></div> )}
                </div>
            </div>
        }
    }
}

class ImageVideoSelected extends React.Component{
    constructor(){
        super();
    }

    render(){
        if(this.props.imageVideo.selected===false){
            return null
        }else{
            return <div id="photo_selected">
                <div id="img">
                    <img src={this.props.imageVideo.src} style={{opacity:parseInt(this.props.imageVideo.progress)/100}}/>
                    <div id="progressBar">{parseInt(this.props.imageVideo.progress)}%</div>
                </div>
                <div id="title">
                    <input type="text" placeholder="Add Title here"/><br/>
                    <input type="text" placeholder="Add Description"/>
                </div>
            </div>
        }
    }
}
class LocationShow extends React.Component{
    render(){
        if(this.props.location.show===false){
            return null;
        }else{
            return  <div id="location_container">
                <div id="header">
                    <input type="text" placeholder="Add location"/>
                </div>
                <div className="sectionBreak"> </div>
                <div id="item">
                    <ul>
                        {this.props.location.searchItems.map((item)=>{
                            return <li onClick={()=>this.props.locationHandler('itemClicked',item['place'])}>
                                <div>{item['place']}</div>
                                <span>{item['people']}</span>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        }
    }
}
class LocationSelected extends React.Component{
    render(){
        if(this.props.location.selectedItemShow===false){
            return null
        }else{
            return <div id="location_selected">
                <img src="src/home/icons/poster/location.png"/>
                {this.props.location.selectedItems.map((item)=>{
                    return <span>{item}</span>
                })}
                <div onClick={()=>this.props.removeItem('removeItem')}> </div>
            </div>
        }
    }
}
class DeadlineSelected extends React.Component{
    render(){
        if(this.props.deadline.selectedShow===false){
            return null;
        }else{
            return <div id="deadline_selected">
                <img src="src/home/icons/poster/deadline.png"/>
                <span>2071-Asar-13, Sunday</span>
                <div  onClick={()=>this.props.deadlineHandler('selectedShow')}> </div>
            </div>
        }
    }
}
class PollSelected extends  React.Component{
    render(){
        if(this.props.poll.show===false){
            return null;
        }else{
            return  <div id="poll_selected">
                {this.props.poll.items.map((item,index)=>{
                    return <input type="text" name={index} value={item} onChange={this.props.editOption} />
                })}
                <br/><input type="button" onClick={()=>this.props.addItem('addItem')} value="Add Option"/>
                <br/><input type="button" onClick={()=>this.props.addItem('removeItem')} value="Remove"/>
                <div id="img">
                    <img src="src/home/icons/poster/other/cross-out.png" onClick={()=>this.props.addItem('removePoll')}/>
                </div>
            </div>
        }
    }

}

class DeadlineSelect extends React.Component{
    constructor(){
        super();
        this.costumeToggle = this.costumeToggle.bind(this);
        this.radioHandler = this.radioHandler.bind(this);
        this.takeDate=this.takeDate.bind(this);
        this.addDate=this.addDate.bind(this);
        this.state = {
            costume:false,
            items : ['Run for 24 hours','Run for a week','Run for a month','Choose Costume'],
            itemSelected:0,
            date : [1,1,1],
            day:[31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
            month:[12,11,10,9,8,7,6,5,4,3,2,1],
            year:[2018,2019]
        }
    }
    costumeToggle(){
        if(this.state.costume===false){
            return null;
        }else{
            return <div id="costume">
                <select name="day" onChange={this.takeDate}>
                    {this.state.day.map((item)=>{
                        return <option>{item}</option>
                    })}
                </select>
                <select name="month" onChange={this.takeDate}>
                    {this.state.month.map((item)=>{
                        return <option onSelect={()=>this.takeDate("month")}>{item}</option>
                    })}
                </select>
                <select name="year" onChange={this.takeDate}>
                    {this.state.year.map((item)=>{
                        return <option onSelect={()=>this.takeDate("year")}>{item}</option>
                    })}
                </select>
            </div>
        }
    }

    radioHandler(data){
         if(data===3){
            this.setState({costume:true})
         }else{
             this.setState({costume:false,itemSelected:data});
         }
    }

    takeDate(event){
        let date = this.state.date;
        if(event.target.name==='day'){
           date[0]=event.target.value;
        }else if(event.target.name==='month'){
            date[1]=event.target.value;
        }else if(event.target.name==='year'){
            date[2]=event.target.value;
        }
        this.setState({date:date});
    }

    addDate(){
        if(this.state.costume===true){
            let date = this.state.date[0]+":"+this.state.date[1]+":"+this.state.date[2];
            this.props.deadlineHandler('selectedItem',date);
        }else{
            this.props.deadlineHandler('selectedItem',this.state.itemSelected);
        }
    }

    render(){
        if(this.props.deadline.show===false){
            return null;
        }else{
            return <div id="deadlineSelect">
                <div id="header">Choose Deadline</div>
                <div id="sectionBreak"> </div>
                <div id="container">
                    <ul>
                        {this.state.items.map((item,index)=>{
                           return <li><input type="radio" onClick={()=>this.radioHandler(index)} name="deadlineDate"/><span>{item}</span> </li>
                        })}
                    </ul>
                    {this.costumeToggle()}
                    <input type="button" onClick={this.addDate} value="Add"/>
                </div>
            </div>
        }
        }

}
