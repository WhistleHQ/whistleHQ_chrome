import React from 'react';
import PropTypes from 'prop-types';

const Messages = ({comments}) => {
    // no comments found
    if (Object.keys(comments).length === 0) {
        return (
            <div>No comments on for this domain</div>
        )
    } else {
        console.log("state updates");
        return (
            <div>
                {comments["comments"].map(function(comment, index){
                    return <div key={index}>
                        <h3>{comment.user}</h3>
                        <p>{comment.comment}</p>
                    </div>
                })}
            </div>
        )
    }
};

Messages.propTypes = {
    comments: PropTypes.object
};

export default Messages;