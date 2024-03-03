import React, { useEffect, useState,useCallback } from "react";
import { ProgressBar } from 'react-bootstrap';
import TranscoderService from '../service/Transcoder.service';

const TranscoderFail = ()=> {

  const [failSessions,setFailSessions] = useState([]);
  const [selectedSessions,setSelectedSessions] = useState([]);
  const [percentCompleted,setPercentCompleted] = useState(0);
  useEffect(() => {
    getData();
  },[]);

  const getData = useCallback(async () => {
    try {
      setFailSessions([]);
      setSelectedSessions([]);
      const response = await TranscoderService.GetFailFileDetails();
      if(response?.data?.sessions){
        setFailSessions(response.data.sessions);
      }
    } catch (error) {
      console.error("TranscoderFail","getData",error);
    }
  },[]);

  const sendToProcess = async ()=>{
    try {
      const config = {
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted)
          setPercentCompleted(percentCompleted)
        }
      }
      const response = await TranscoderService.SendToProcess(selectedSessions.map(s=>s.session),config);
      if(response?.isSuccess === true){
        setFailSessions(response.data.sessions);
      }
    } catch (error) {
      console.error("TranscoderFail","onSelectFailItem",error);
    }finally{
      getData();
    }
  }

  const onSelectFailItem = (item,index)=>{
    try {
      const temp = [...failSessions];
      temp.splice(index, 1); 
      setSelectedSessions([...selectedSessions, item]);
      setFailSessions(temp);
    } catch (error) {
      console.error("TranscoderFail","onSelectFailItem",error);
    }
  }

  const onSelectAllFailItems = ()=>{
    try {      
      setSelectedSessions([...selectedSessions, ...failSessions]);
      setFailSessions([]);
    } catch (error) {
      console.error("TranscoderFail","onSelectFailItem",error);
    }
  }

  const onSelectSelectedItem = (item,index)=>{
    try {
      const temp = [...selectedSessions];
      temp.splice(index, 1); 
      setFailSessions([...failSessions, item]);
      setSelectedSessions(temp);
    } catch (error) {
      console.error("TranscoderFail","onSelectSelectedItem",error);
    }
  }
  const onSelectAllSelectedItems = ()=>{
    try {      
      setFailSessions([...failSessions, ...selectedSessions]);
      setSelectedSessions([]);
    } catch (error) {
      console.error("TranscoderFail","onSelectAllSelectedItems",error);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Transcoder Fail Files </h3>
        <nav aria-label="breadcrumb">
          <button type="button" className="btn btn-gradient-primary btn-fw" onClick={()=>sendToProcess()} disabled={selectedSessions.length === 0} style={{cursor:`${selectedSessions.length === 0 ? "not-allowed":"pointer"}`}}>Process</button>
        </nav>
      </div>
      <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card"><ProgressBar variant="info" now={percentCompleted} /></div>        
      </div>
      
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Fail Files</h4>
              <p className="card-description"> Select file to <code>process</code>
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check">
                          <label className="form-check-label text-muted">
                            <input type="checkbox" className="form-check-input" checked={false} onClick={()=>onSelectAllFailItems()}/>
                            <i className="input-helper"></i> 
                            All                     
                          </label>
                        </div>
                      </th>
                      <th>#</th>
                      <th>Session</th>
                      <th>legs count</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    { failSessions.map((item, index)=>{
                      return(
                        <tr key={index}>
                          <td>
                            <div className="form-check">
                              <label className="form-check-label text-muted">
                                <input type="checkbox" className="form-check-input" checked={false} onClick={()=>onSelectFailItem(item,index)}/>
                                <i className="input-helper"></i>                      
                              </label>
                            </div>
                          </td>
                          <td>{index}</td>
                          <td>{item.session}</td>
                          <td>{item.legs?.length??0}</td>
                          <td><label className="badge badge-danger">Fail</label></td>
                        </tr>
                      )
                    })} 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Selected Files</h4>
              <p className="card-description"> Select file to <code>remove</code>
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check">
                          <label className="form-check-label text-muted">
                            <input type="checkbox" className="form-check-input" checked={false} onClick={()=>onSelectAllSelectedItems()}/>
                            <i className="input-helper"></i> 
                            All                     
                          </label>
                        </div>
                      </th>
                      <th>#</th>
                      <th>Session</th>
                      <th>legs count</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    { selectedSessions.map((item, index)=>{
                        return(
                          <tr key={index}>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label text-muted">
                                  <input type="checkbox" className="form-check-input" checked={false} onClick={()=>onSelectSelectedItem(item,index)}/>
                                  <i className="input-helper"></i>                      
                                </label>
                              </div>
                            </td>
                            <td>{index}</td>
                            <td>{item.session}</td>
                            <td>{item.legs?.length??0}</td>
                            <td><label className="badge badge-warning">Pending</label></td>
                          </tr>
                        )
                      })
                    } 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>          
      </div>
    </div>
  )
}

export default TranscoderFail;


