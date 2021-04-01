import React from 'react';

const Avatar = ({src, name, size, type, borderRadius}) => (
    <img style={{ borderRadius: borderRadius + 'px'}}
    className={type ? type : 'round'}
    width={size}
    height={size}
    alt={name}
    title={name}
    src={src} />
)
export default Avatar;