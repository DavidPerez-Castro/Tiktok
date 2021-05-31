import React, { Component } from 'react';
import "./VideoNav.css"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FovoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import MessageIcon from "@material-ui/icons/Message"
import ShareIcon from "@material-ui/icons/Share"

class VideoNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
    }

    render() {

        const {
            likes,
            shares,
            comments
        } = this.props;

        return (
            <div className="video-nav">
                <div className="video-nav__selection">
                    {
                        this.state.liked ?
                            (<FavoriteIcon fontSize="large" onClick={() => this.setState({ liked: !this.state.liked })} />) :
                            (<FovoriteBorderIcon fontSize="large" onClick={() => this.setState({ liked: !this.state.liked })} />)
                    }
                    <p>{this.state.liked ? likes + 1 : likes}</p>
                </div>
                <div className="video-nav__selection">
                    <MessageIcon fontSize="large"/>
                    <p>{comments}</p>
                </div>
                <div className="video-nav__selection">
                    <ShareIcon fontSize="large"/>
                    <p>{shares}</p>
                </div>
                <img src="https://static.thenounproject.com/png/934821-200.png" className="video-nav__record" alt="record" />
            </div>
        )
    }
}

export default VideoNav;