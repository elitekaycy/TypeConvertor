import React from 'react';
import {Link} from 'react-scroll';

export const ScrollToSectionButton = ({children}) => {
    return (
        <Link activeClass="active" to="codeMirror"
            spy={true}
            smooth={true}
            offset={-60}
            // Adjust the offset based on your layout and design
            duration={500}>
            {children} </Link>
    );
};
