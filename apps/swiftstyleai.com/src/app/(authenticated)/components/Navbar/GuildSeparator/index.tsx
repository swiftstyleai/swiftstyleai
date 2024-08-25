import React from 'react';

const GuildSeparator = () => {
  return (
    <div className='h-0.5 w-8 bg-[hsl(228_calc(1_*_6%)_32.5%_/_0.48)] rounded-[1px]' />
  );
};

export default React.memo(GuildSeparator);
