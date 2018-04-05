import React, { Component } from "react";
import Remarkable from 'remarkable'


class Comment extends Component {
    rawMarkup() {

        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup};
    }

    render(){
        return (
            <div className={"comment"}>
                <h2 className={"commentAuthor"}>
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
}

class CommentList extends Component{
    render() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className={"commentList"}>
                {commentNodes}
            </div>
        );
    };
}


class CommentForm extends Component{
    getInitialSate(){
        return {author: '', text: ''}
    }

    handleAuthorChange(e){
        this.setState({author: e.target.value});
    }

    handleTextChange(e){
        this.setState({text: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if(!text || !author){
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    }

    render() {
        return(
            <form className={"commentForm"} onSubmit={this.handleSubmit}>
                <input
                    type={"text"}
                    placeholder={"Your name"}
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type={"text"}
                    placeholder={"Say something..."}
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type={"submit"} value={"Post"} />
            </form>
        )
    }
}

class CommentBox extends Component{
    loadCommentsFromServer(){
        $.ajax({
            url:this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


    handleCommentSubmit(){
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({data: comments});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


    getInitialState(){
        return {data: []};
    }

    componentDidMount(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer,
            this.props.pollInterval);
    }

    render(){
        return(
            <div className={"commentBox"}>
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
}


export default CommentBox
