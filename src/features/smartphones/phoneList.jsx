import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { selectAllPhones, selectPhoneIds } from './phoneSlice';
import { PhoneCard } from './phoneCard';
import { useState } from 'react';

export function PhoneList(){
 
  const [sortedIdArray,setSortedArray] = useState([]);
  const allPhones = useSelector(selectAllPhones);
  const idsPhones = useSelector(selectPhoneIds)    
  const sortingState = useSelector(state=>state.phones.sortingState);
  function sortByObjectName(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
  
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }


useEffect(()=>{
  console.log("B");   
  const smth =[...idsPhones].sort((a,b)=>{
        const objA = allPhones.find((obj) => obj.id === a);
        const objB = allPhones.find((obj) => obj.id === b);
        if (sortingState === 'name') { return sortByObjectName(objA, objB);}
        else if(sortingState === "count"){ return objB.count - objA.count;}
        else if(sortingState === "weight"){const weightA = parseFloat(objA.weight);
          const weightB = parseFloat(objB.weight);
          return weightB - weightA;}
          else{ return 0}
          
      })
      if (sortingState === 'default') {
        setSortedArray(idsPhones);
     
      }else{
        setSortedArray(smth);
      }

    }, [sortingState, idsPhones, allPhones]);
 
      const phoneCards =  sortedIdArray.map(a =>{
        
        return <PhoneCard key={a} idPH={a} /> ;
      })
      
 
      return (
        <>
        <div className=" grid grid-cols-3 flex-1 gap-5 pl-8">{phoneCards}</div>
        </>
      )

    }