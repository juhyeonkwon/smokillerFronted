import React,{useState ,useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Graph() {

  const [startDate, setStartDate] = useState(new Date('2021-01-01'));
  const [endDate, setEndDate] = useState(new Date());

  const options = {
    legend: {
      display: false, // label 보이기 여부
    },
    scales: {
      yAxes: [{
        ticks: { 
          min: 0, // y축 스케일에 대한 최소값 설정
          stepSize: 1, // y축 그리드 한 칸당 수치
        }
      }]
    },
    // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    // true : 크기가 알아서 결정됨.
    maintainAspectRatio: false 
  }

  let data = {
    // 각 막대별 라벨 = 날짜
    labels: [],
    datasets: [
      {
        label : "Smoking count",
        borderWidth: 3, // 테두리 두께
        data: [], // 수치
        backgroundColor: 'rgba(255,99,132,0.2)', // 각 막대 색
        borderColor: 'rgba(255,99,132,1)'
      }
    ]
  };

    
    // photos, setPhotos 비구조화 할당
    let [photos, setPhotos] = useState([]);




    // 통신 메서드
    function searchApi() {
        const url = "/api/photo/photochart";

        axios.get(url, {params: {startDate: startDate , endDate :endDate}})
        .then(function(response) {
            setPhotos(photos=response.data.photochart);
            console.log("성공");
            console.log(startDate);
            console.log(endDate);                       
        })
        .catch(function(error) {
            console.log("실패");
        })
    }

     useEffect(() => {
       searchApi()       
        } ,[]);

    //데이터 푸시
     let date = [];
        let count = [];
        photos.map(photochart => (
            date.push(photochart.date),
            count.push(photochart.count)
        ))
        data.labels = date
        data.datasets[0].data = count

        return (
        <>
        <div>
        <Bar 
            data={data}
            width={50}
            height={200}
            options={options}
        />
        </div>
        <div>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          dateFromat='YYYY-MM-dd'
        />
        ~
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          dateFromat='YYYY-MM-dd'
        />
        <button onClick={searchApi}>조회</button>
        </div>
        </>        
        )
}

export default Graph;