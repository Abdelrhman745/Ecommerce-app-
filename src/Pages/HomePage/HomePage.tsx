import React from 'react'
import About from '../../components/Aboutcomponent/Aboutcomponent'
import Categories from '../../components/Categories/Categories'
import TextSec from '../../components/TextSection/TextSection'
import Gallery from '../../components/Gallery/Gallery'
import SupremeSkinFortification from '../../components/productComponents/SupremeSkinFortification'

export default function HomePage() {
  return (
    <>
      <Categories/>
      <TextSec/>
      <Gallery/>
      <SupremeSkinFortification/>
      <About/>
    </>
  )
}
