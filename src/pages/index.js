import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import CountriesTable from '../components/CountriesTable/CountriesTable'
import { useState } from 'react';
export default function Home({countries}) {

  const [keyword, setKeyword]= useState("");
  const filteredCountries = countries.filter(country=>
    country.name.toLowerCase().includes(keyword) || 
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword));

  const onInputChange = (e) =>{
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  }

  return (
  <Layout title="Эрэмбэ">
    <div className={styles.counts}> Found {countries.length} countries</div>
    <SearchInput  placeholder="Хайх утгаа оруулна уу" onChange={onInputChange}/>
    <CountriesTable  countries={filteredCountries}/>
  </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};