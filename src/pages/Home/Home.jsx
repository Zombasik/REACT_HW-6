import React, {useEffect, useState} from 'react';
import { Select } from 'antd';

import { Table, Progress } from 'antd';


const BASE_URL = 'https://api.sampleapis.com/beers';

export default function Home() {
  const [beers, setBeers] = useState([])
  const [type, setType] = useState('ale')
  const [sortType, setSortType] = useState()

  const { Option } = Select;

  useEffect(() => {
    fetchData();
  }, [type]);

  useEffect(() => {
    console.log('sort type changed')

  }, [sortType]);

  const fetchData = () => {
    fetch(`${BASE_URL}/${type}`)
      .then(resp => resp.json())
      .then(data => setBeers(data));
  };

  const onChange = (value) => {
    setType(value);

  }
  
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => {
        if(a.id > b.id){
            return 1
        }
        if(a.id < b.id){
            return -1
        }
    } ,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        if(a.name > b.name){
            return 1
        }
        if(a.name < b.name){
            return -1
        }
    } ,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => {
        if(a.price > b.price){
            return 1
        }
        if(a.price < b.price){
            return -1
        }
      }

    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating, record) => {
        const percent = (rating.average * 100 / 5).toFixed(0);
        return (
          <div>
       
          <Progress
            strokeColor={{
              from: '#108ee9',
              to: '#87d068',
            }}
            percent={percent}
            status="active"
          />
            {' | '} 
            <span>{rating.reviews}</span>
          </div>
        )
      },
    },
  ];

  return (
    <div className="container">
      <Select
        placeholder="Select a beer"
        onChange={onChange}
      >
        <Option value="ale">Ale</Option>
        <Option value="stouts">Stouts</Option>
      </Select>
      
      <Table dataSource={beers} columns={columns} />;
    </div>
  )
}