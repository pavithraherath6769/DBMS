import React, { useEffect,useState,useCallback } from 'react';
import {Doughnut, Bar} from 'react-chartjs-2';
import TranscoderService from '../service/Transcoder.service';
import DataReloader from '../shared/Timmer';
import circle from "../../assets/images/dashboard/circle.svg";

export const Dashboard = React.memo(()=>{
  
  console.debug("Dashboard redering......................................");
  const [trafficData,SetTrafficData] = useState({});
  const [processedPercentage ,SetProcessedPercentage] = useState(0);
  const [processingPercentage,SetProcessingPercentage] = useState(0);
  const [failPercentage,SetFailPercentage] = useState(0);
  const [processedCount,SetProcessedCount] = useState(0);
  const [processingCount,SetProcessingCount] = useState(0);
  const [failCount,SetFailCount] = useState(0);

  
  const trafficOptions = {
    doughnut : {
      responsive: true,
      animation: {
        animateScale: true,
        animateRotate: true
      },
      legend: {
        position: 'bottom',
      },
    },
    bar : {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 0
        }
      }
  
    }
  }

  useEffect(()=>{
    try {
      var ctx = document.getElementById('visitSaleChart').getContext("2d")
    
      var gradientdonut1 = ctx.createLinearGradient(0, 0, 0, 181)
      gradientdonut1.addColorStop(0, 'rgba(54, 215, 232, 1)')
      gradientdonut1.addColorStop(1, 'rgba(177, 148, 250, 1)')

      var gradientdonut2 = ctx.createLinearGradient(0, 0, 0, 50)
      gradientdonut2.addColorStop(0, 'rgba(6, 185, 157, 1)')
      gradientdonut2.addColorStop(1, 'rgba(132, 217, 210, 1)')

      var gradientdonut3 = ctx.createLinearGradient(0, 0, 0, 300)
      gradientdonut3.addColorStop(0, 'rgba(254, 124, 150, 1)')
      gradientdonut3.addColorStop(1, 'rgba(255, 205, 150, 1)')

      const newTrafficData = {
          labels: ['Fail','Processing','Proceed'],
          datasets: [{
            data: [30, 30, 40],
            backgroundColor: [
              gradientdonut1,
              gradientdonut2,
              gradientdonut3
            ],
            hoverBackgroundColor: [
              gradientdonut1,
              gradientdonut2,
              gradientdonut3
            ],
            borderColor: [
              gradientdonut1,
              gradientdonut2,
              gradientdonut3
            ],
            legendColor: [
              gradientdonut1,
              gradientdonut2,
              gradientdonut3
            ]
          }]          
        };
        SetTrafficData({...newTrafficData});
        getData();        
    } catch (error) {
      console.error("Dashboard","useEffect",error);
    }
  },[]);
  
  const getData = useCallback(async () => {
    try {
      
      const response = await TranscoderService.GetDashboardDetails();
      if(response?.data){
        const processed = response.data.processed?.length ?? 0;
        const processing = response.data.processing?.length ?? 0;
        const fail = response.data.fail?.length ?? 0;
        const total = processed + processing + fail;
        SetProcessedPercentage((processed/total)*100);
        SetProcessingPercentage((processing/total)*100);
        SetFailPercentage((fail/total)*100);
        SetProcessedCount(processed);
        SetProcessingCount(processing);
        SetFailCount(fail);

        const temp = {...trafficData};
        temp.datasets[0].data = [fail,processing,processed];
        temp.labels = ['Fail','Processing','Proceed'];
        SetTrafficData({...temp});
      }
    } catch (error) {
      console.error("Dashboard","getData",error);
    }    
  },[]);

  

  return (
    <div>        
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-home"></i>
          </span> Dashboard </h3> 
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb" onClick={()=>getData()} style={{cursor:"pointer"}}>
              <li className="breadcrumb-item active" aria-current="page">
                <span></span>Reload <i className="mdi mdi-autorenew icon-sm text-primary align-middle "></i>
              </li>
            </ul>
          </nav>  
      </div>
      <div className="row">
        <DataReloader getData={getData}/>
        <div className="col-md-4 stretch-card grid-margin" >
          <div className="card bg-gradient-danger card-img-holder text-white ">
            <div className="card-body ">
              <img src={circle} className="card-img-absolute" alt="circle" />
              <h4 className="font-weight-normal mb-3">Fail Sessions <i className="mdi mdi-server-network-off mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">{failCount}</h2>
              <h6 className="card-text" title={`${failPercentage}%`}>by {failPercentage.toFixed(2)}%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <img src={circle} className="card-img-absolute" alt="circle" />
              <h4 className="font-weight-normal mb-3">Processing Sessions <i className="mdi mdi-server mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">{processingCount}</h2>
              <h6 className="card-text" title={`${processingPercentage}%`}>by {processingPercentage.toFixed(2)}%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <img src={circle} className="card-img-absolute" alt="circle" />
              <h4 className="font-weight-normal mb-3">Proceed Sessions<i className="mdi mdi-server-network mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">{processedCount}</h2>
              <h6 className="card-text" title={`${processedPercentage}%`}>by {processedPercentage.toFixed(2)}%</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row">                    
          <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                  <div className="card-body">
                      <h4 className="card-title">Performance</h4>
                          <Bar data={trafficData} options={trafficOptions.bar} />
                  </div>
              </div>
          </div>
          <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                  <div className="card-body">
                      <h4 className="card-title">Performance</h4>
                          <Doughnut data={trafficData} options={trafficOptions.doughnut}  id="visitSaleChart"/>
                  </div>
              </div>
          </div>
      </div>        
    </div> 
  );
})
export default Dashboard;