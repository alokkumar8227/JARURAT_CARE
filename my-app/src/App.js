
import React,{useEffect,useState} from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {

  const [data, setdata] = useState([]);
  const [serviceName, setserviceName] = useState();
  const [description, setdescription] = useState();
  const [price, setprice] = useState(0);
  const [id, setid] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    setdata(EmployeeData)
  }, []);


  const handleEdit = (id)=>{
    
     const dt = data.filter(item=>item.id===id);
     if(dt !== undefined)
     {
      setIsUpdate(true);
      setid(id);
      setserviceName(dt[0].serviceName);
      setdescription(dt[0].description);
      setprice(dt[0].price);
     }
  }
  const handleDelete = (id)=>{
    if(id>0){
      if(window.confirm("are you sure to delete this item?")){
        const dt=data.filter(item=>item.id !==id);
        setdata(dt);
      }
    }
  }

  const handleSave = (e)=>{

    let error ='';
    if(serviceName==='')
      error+='serviceName is required';
    if(description==='')
      error+='Description is required';
    if(price<=0)
      error+='Price is required';

    if(error === ''){
    e.preventDefault();
    const dt = [...data];
    const newObject={
      id:EmployeeData.length+1,
        serviceName:serviceName,
        description:description,
        price:price
    }
    dt.push(newObject);
    setdata(dt);
  }
  else{
    alert(error)
  }
}
  const handleUpdate =()=>{
    const index = data.map((item)=>{
      return item.id
    }).indexOf(id);
    const dt =[...data];
    dt[index].serviceName=serviceName;
    dt[index].description=description;
    dt[index].price=price;

    setdata(dt);
    handleClear();
  }
  const handleClear = (id)=>{
    setid(0);
    setserviceName('');
    setdescription('');
    setprice('');
    setIsUpdate(false);
  }
  
  return (
    <div className="App">

     <div style={{display:'flex',justifyContent:'center', marginTop:'10px',marginBottom:'10px'}}>
      <div>
        <label>Services Name:
          <input type='text' placeholder='Enter First name' onChange={(e)=>setserviceName(e.target.value)} value={serviceName}/>
        </label>
      </div>
      <div>
        <label>Description:
          <input type='text' placeholder='Enter last name'onChange={(e)=>setdescription(e.target.value)} value={description}/>
        </label>
      </div>
      <div>
        <label>Price:
          <input type='text' placeholder='Enter price' onChange={(e)=>setprice(e.target.value)} value={price}/>
        </label>
        
        {
          !isUpdate?
          <button className='btn btn-primary' onClick={(e)=>handleSave(e)}>Add New Services</button>
          :
          <button className='btn btn-primary' onClick={()=>handleUpdate()}>update</button>
        }
        
       
        <button className='btn btn-danger' onClick={()=>handleClear()}>clear</button>&nbsp;
      </div>
     </div>

     <table className='table table-hover'>
      <thead>
        <tr>
          <td>sr name</td>
          <td>id</td>
          <td>Services name</td>
          <td>Description</td>
          <td>Price</td>
          <td>actions</td>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item,index)=>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.id}</td>
                <td>{item.serviceName}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button>&nbsp;
                  <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>&nbsp;
                </td>
              </tr>
            )
          })
        }
      </tbody>
     </table>
    </div>
  );
}

export default App;
