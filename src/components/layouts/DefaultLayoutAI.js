'use strict';

import AcademicInstituteSideNav from '../AISideNav';

export default function DefaultLayoutAI({ children, footerLocation }) {
  return (
    <div className={'flex relative custom-scroll min-h-screen'}>
      {/* <SideNav /> */}
      <AcademicInstituteSideNav />
      <div className='w-5/6 max-w-7xl mx-auto pr-8 sm:pr-6 lg:pr-10'>{children}</div>
      {/* <Footer location={footerLocation} /> */}
    </div>
  );
}