import React from 'react';
import PropTypes from 'prop-types';

const Messages = ({ data }) => {
    // no data found
    if (Object.keys(data).length === 0 || data.comments === false) {
        return (
            <div>No comments on for this domain</div>
        )
    } else {
        // console.log(data.data);
        return (
            <div>
                {data.comments.map(function (comment, index) {
                    return <div key={index}>
                        <h3>{comment.user}</h3>
                        <h4>{comment.org}</h4>
                        <p>{comment.message}</p>
                    </div>
                })}
            </div>
        )
    }
};

Messages.propTypes = {
    data: PropTypes.object
};

export default Messages;