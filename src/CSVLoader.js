import React, { useState, useEffect } from 'react';
import './CSVLoader.css';
import Papa from 'papaparse';
import Data from './/data/ta_exceedences.csv';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import Filter from './Filter';

function CSVLoader({ onDataLoaded }) {
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
      }).data;
      setData(parsedData);
      setRawData(parsedData);
      onDataLoaded(parsedData);
      };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = rawData.filter((row) => {
      return parseFloat(row.SCORE) > parseFloat(searchValue);
    });
    console.log("Search Value:", filtered);
    setData(filtered);
    onDataLoaded(filtered);
  }, [searchValue]);

  const handleSearch = (scoreValue) => {
    setSearchValue(scoreValue);
  };

  return (
    <div>
      <h3 class="title-header"> {data.length} Potential Thermal Problems Found </h3>
      <Filter filterValue={handleSearch}  />
      <Container>
        <Row>
          <Col xs>Recording ID</Col>
          <Col xs>Time Stamp</Col>
          <Col xs>LATITUDE</Col>
          <Col xs>LONGITUDE</Col>
          <Col xs>Score</Col>
        </Row>
      </Container>
      <Container class="row-container">
      {data.map((row, index) => (
        <Row key={index}>
          <Col xs>{row.RECORDING_ID}</Col>
          <Col xs={{ order: 1 }}>{moment.unix(row.UNIX_TIME).format('MMMM Do YYYY, h:mm:ss a')}</Col>
          <Col xs={{ order: 2 }}>{row.LATITUDE}</Col>
          <Col xs={{ order: 3 }}>{row.LONGITUDE}</Col>
          <Col xs={{ order: 4 }}>{row.SCORE}</Col>
        </Row>
        ))}
      </Container>
    </div>
  );
}

export default CSVLoader;
