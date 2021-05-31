import React, { Component } from 'react';
import "./VideoFooter.css";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Ticker from "react-ticker"

class VideoFooter extends Component {
    render() {

        const{
            channel,
            description,
            songName
        } = this.props;

        return (
            <div className="video-footer">
                <div className="video-footer__text">
                    <h3>@{channel}</h3>
                    <p>{description}</p>
                    <div className="video-footer__ticker">
                        <MusicNoteIcon className="video-footer__icon" />
                        <Ticker mode="smooth">
                            {
                                ({ index }) => (
                                    <>
                                        <p>{songName}</p>
                                    </>
                                )
                            }
                        </Ticker>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoFooter;