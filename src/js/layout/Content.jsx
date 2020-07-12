import React from 'react';

const Content = (props) => {
    return(
        <div className="container-fluid">
            {props.children}
        </div>
    )
}

export default Content;