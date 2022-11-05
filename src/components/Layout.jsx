import React from 'react'

function Layout({ data_cy, child }) {
  return (
    <section data-cy={data_cy}>
      <header
        data-cy="header-background"
        className='bg-color-primary px-[13.75rem] h-[105px] flex items-center'
      >
        <span data-cy="header-title" className='text-white font-bold text-2xl'>TO DO LIST APP</span>
      </header>
      {child}
    </section>
  )
}

export default Layout
