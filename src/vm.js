import ko from 'knockout';
import 'whatwg-fetch'

export default function(){

  let someText=ko.observable(10),
    click=()=>{
      fetch('/api')
        .then(res=>{return res.json()})
        .then((res)=>{
        someText(someText()+res);

      })};

  return {
    someText,
    click
  };
}