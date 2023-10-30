import { Form, FormControl, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import './Filter.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Filter({ filterValue }) {
    const [scoreValue, setScoreValue] = useState('');

    const handleSearch = () => {
      filterValue(scoreValue)
    }

    return (
      <div>
        <Form>
          <FormControl
            type="text"
            placeholder="Filter by minimum score"
            onChange={(e) => setScoreValue(e.target.value)}
            id="search-bar"
          />
          <Button id="search-button" variant="primary" type="button" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </div>
  );
}

export default Filter;
